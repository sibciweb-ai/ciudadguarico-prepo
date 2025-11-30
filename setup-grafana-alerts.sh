#!/bin/bash

# Script automático para configurar alertas de Grafana
# Autor: Assistant
# Fecha: 2025-10-07

set -e

echo "================================================"
echo "🚀 Configuración Automática de Alertas Grafana"
echo "================================================"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar errores
error() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# Función para mostrar éxito
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar info
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Función para mostrar advertencias
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar si el archivo de alertas existe
if [ ! -f "grafana-postgres-alerts.yaml" ]; then
    error "No se encontró el archivo grafana-postgres-alerts.yaml"
fi

# Pedir datos de Grafana
echo -e "${BLUE}📊 Configuración de Grafana${NC}"
echo "-----------------------------------"

read -p "URL de Grafana [http://localhost:3000]: " GRAFANA_URL
GRAFANA_URL=${GRAFANA_URL:-http://localhost:3000}

read -p "Usuario admin de Grafana [admin]: " GRAFANA_USER
GRAFANA_USER=${GRAFANA_USER:-admin}

read -sp "Contraseña de Grafana: " GRAFANA_PASSWORD
echo ""

if [ -z "$GRAFANA_PASSWORD" ]; then
    error "La contraseña no puede estar vacía"
fi

# Pedir datos de Telegram (opcional)
echo ""
echo -e "${BLUE}📱 Configuración de Telegram (opcional)${NC}"
echo "-----------------------------------"
read -p "¿Configurar notificaciones de Telegram? (s/n) [s]: " SETUP_TELEGRAM
SETUP_TELEGRAM=${SETUP_TELEGRAM:-s}

if [[ "$SETUP_TELEGRAM" == "s" || "$SETUP_TELEGRAM" == "S" ]]; then
    read -p "Bot Token de Telegram: " TELEGRAM_TOKEN
    read -p "Chat ID de Telegram: " TELEGRAM_CHAT_ID
    
    if [ -z "$TELEGRAM_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        warning "Token o Chat ID vacío. Se saltará la configuración de Telegram."
        SETUP_TELEGRAM="n"
    fi
fi

echo ""
info "Iniciando configuración..."
echo ""

# 1. Verificar que Grafana esté accesible
echo "1️⃣  Verificando conexión con Grafana..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$GRAFANA_URL/api/health")

if [ "$HTTP_CODE" != "200" ]; then
    error "No se puede conectar a Grafana en $GRAFANA_URL (HTTP $HTTP_CODE)"
fi
success "Grafana está accesible"

# 2. Obtener o crear API Key
echo ""
echo "2️⃣  Configurando API Key..."

# Intentar crear una nueva API key
API_KEY_RESPONSE=$(curl -s -X POST "$GRAFANA_URL/api/auth/keys" \
    -u "$GRAFANA_USER:$GRAFANA_PASSWORD" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "AutoSetup-'"$(date +%Y%m%d-%H%M%S)"'",
        "role": "Admin"
    }')

API_KEY=$(echo "$API_KEY_RESPONSE" | grep -oP '"key":"\K[^"]+' || echo "")

if [ -z "$API_KEY" ]; then
    error "No se pudo crear la API Key. Verifica usuario y contraseña."
fi
success "API Key creada correctamente"

# 3. Obtener UID del datasource de Prometheus
echo ""
echo "3️⃣  Buscando datasource de Prometheus..."

DATASOURCES=$(curl -s "$GRAFANA_URL/api/datasources" \
    -H "Authorization: Bearer $API_KEY")

PROMETHEUS_UID=$(echo "$DATASOURCES" | grep -oP '"uid":"[^"]+","type":"prometheus"' | head -1 | grep -oP '"uid":"\K[^"]+' || echo "")

if [ -z "$PROMETHEUS_UID" ]; then
    warning "No se encontró datasource de Prometheus. Usando UID por defecto."
    PROMETHEUS_UID="prometheus"
else
    success "Prometheus datasource encontrado: $PROMETHEUS_UID"
fi

# 4. Reemplazar UID en el archivo YAML
echo ""
echo "4️⃣  Ajustando configuración de alertas..."

# Crear backup del archivo original
cp grafana-postgres-alerts.yaml grafana-postgres-alerts.yaml.backup

# Reemplazar el UID del datasource
sed -i "s/datasourceUid: prometheus/datasourceUid: $PROMETHEUS_UID/g" grafana-postgres-alerts.yaml

success "Configuración ajustada"

# 5. Importar alertas
echo ""
echo "5️⃣  Importando alertas a Grafana..."

IMPORT_RESPONSE=$(curl -s -X POST "$GRAFANA_URL/api/v1/provisioning/alert-rules" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/yaml" \
    --data-binary @grafana-postgres-alerts.yaml)

# Verificar si hubo error
if echo "$IMPORT_RESPONSE" | grep -q "error\|Error"; then
    warning "Puede haber habido un problema al importar. Respuesta:"
    echo "$IMPORT_RESPONSE"
else
    success "Alertas importadas correctamente"
fi

# Restaurar archivo original
mv grafana-postgres-alerts.yaml.backup grafana-postgres-alerts.yaml

# 6. Configurar Telegram (si se solicitó)
if [[ "$SETUP_TELEGRAM" == "s" || "$SETUP_TELEGRAM" == "S" ]]; then
    echo ""
    echo "6️⃣  Configurando Contact Point de Telegram..."
    
    # Verificar si ya existe un contact point con ese nombre
    EXISTING_CP=$(curl -s "$GRAFANA_URL/api/v1/provisioning/contact-points" \
        -H "Authorization: Bearer $API_KEY" | grep -c "telegram-bot-ciudadguarico" || true)
    
    if [ "$EXISTING_CP" -gt 0 ]; then
        warning "Ya existe un contact point con ese nombre. Se omitirá la creación."
    else
        # Crear contact point de Telegram
        TELEGRAM_CP=$(curl -s -X POST "$GRAFANA_URL/api/v1/provisioning/contact-points" \
            -H "Authorization: Bearer $API_KEY" \
            -H "Content-Type: application/json" \
            -d '{
                "name": "telegram-bot-ciudadguarico",
                "type": "telegram",
                "settings": {
                    "bottoken": "'"$TELEGRAM_TOKEN"'",
                    "chatid": "'"$TELEGRAM_CHAT_ID"'"
                },
                "disableResolveMessage": false
            }')
        
        if echo "$TELEGRAM_CP" | grep -q "error\|Error"; then
            warning "Error al crear contact point de Telegram:"
            echo "$TELEGRAM_CP"
        else
            success "Contact Point de Telegram creado"
        fi
    fi
    
    # 7. Actualizar Notification Policy
    echo ""
    echo "7️⃣  Configurando Notification Policy..."
    
    # Obtener la política actual
    CURRENT_POLICY=$(curl -s "$GRAFANA_URL/api/v1/provisioning/policies" \
        -H "Authorization: Bearer $API_KEY")
    
    # Actualizar la política para usar Telegram como contact point por defecto
    UPDATED_POLICY=$(echo "$CURRENT_POLICY" | sed 's/"receiver":"[^"]*"/"receiver":"telegram-bot-ciudadguarico"/g')
    
    UPDATE_RESPONSE=$(curl -s -X PUT "$GRAFANA_URL/api/v1/provisioning/policies" \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json" \
        -d "$UPDATED_POLICY")
    
    if echo "$UPDATE_RESPONSE" | grep -q "error\|Error"; then
        warning "No se pudo actualizar la política automáticamente. Hazlo manualmente en Grafana."
    else
        success "Notification Policy configurada"
    fi
fi

# Resumen final
echo ""
echo "================================================"
echo -e "${GREEN}🎉 ¡Configuración completada!${NC}"
echo "================================================"
echo ""
echo "📊 Resumen:"
echo "  - Alertas importadas: 8"
echo "  - Carpeta: PostgreSQL Alerts"
echo "  - Grupo: postgres-monitoring"
if [[ "$SETUP_TELEGRAM" == "s" || "$SETUP_TELEGRAM" == "S" ]]; then
    echo "  - Telegram: Configurado ✅"
fi
echo ""
echo "🔗 Accede a Grafana:"
echo "  $GRAFANA_URL/alerting/list"
echo ""
echo "🧪 Para probar las alertas:"
echo "  docker stop cg_postgres_exporter"
echo "  (espera 1-2 minutos para recibir notificación)"
echo "  docker start cg_postgres_exporter"
echo ""
echo -e "${BLUE}Nota: La API Key generada ha sido guardada temporalmente.${NC}"
echo -e "${BLUE}Puedes eliminarla en: Configuration → API Keys${NC}"
echo ""
