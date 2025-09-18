#!/bin/bash

echo "🚀 Iniciando Ciudad Guárico en modo desarrollo"
echo "=============================================="

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar mensajes con color
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    log_warning "Docker no está corriendo. Iniciando solo la base de datos..."
    exit 1
fi

# Verificar que la base de datos esté disponible
log_info "Verificando base de datos..."
if ! docker exec cg_postgres pg_isready -U cg_user -d cg_database_dev > /dev/null 2>&1; then
    log_warning "Base de datos de desarrollo no disponible. Iniciando contenedores..."
    docker compose up -d db pgadmin
    sleep 10
fi

log_success "Base de datos de desarrollo lista"

# Mostrar información de conexión
echo ""
echo "📋 Información de desarrollo:"
echo "============================="
echo "• Base de datos: localhost:5432/cg_database_dev"
echo "• PgAdmin: http://localhost:5050"
echo "• Backend: http://localhost:3000"
echo "• Frontend: http://localhost:5173"
echo ""
echo "🔑 Credenciales:"
echo "• Usuario BD: cg_user"
echo "• Password BD: cg_password"
echo "• PgAdmin Email: admin@ciudadguarico.com"
echo "• PgAdmin Password: ciudad2025"
echo ""

# Preguntar qué iniciar
echo "¿Qué quieres iniciar?"
echo "1) Solo Backend (puerto 3000)"
echo "2) Solo Frontend (puerto 5173)"
echo "3) Ambos (en terminales separadas)"
echo "4) Solo mostrar información"
echo ""
read -p "Selecciona una opción (1-4): " choice

case $choice in
    1)
        log_info "Iniciando solo Backend..."
        cd backend && ./dev-start.sh
        ;;
    2)
        log_info "Iniciando solo Frontend..."
        cd frontend && ./dev-start.sh
        ;;
    3)
        log_info "Iniciando Backend y Frontend en terminales separadas..."
        gnome-terminal -- bash -c "cd backend && ./dev-start.sh; exec bash" 2>/dev/null || xterm -e "cd backend && ./dev-start.sh" 2>/dev/null || echo "No se pudo abrir terminal separada. Ejecuta manualmente: cd backend && ./dev-start.sh"
        sleep 3
        gnome-terminal -- bash -c "cd frontend && ./dev-start.sh; exec bash" 2>/dev/null || xterm -e "cd frontend && ./dev-start.sh" 2>/dev/null || echo "No se pudo abrir terminal separada. Ejecuta manualmente: cd frontend && ./dev-start.sh"
        ;;
    4)
        log_success "Información mostrada. Usa los scripts individuales para iniciar los servicios."
        ;;
    *)
        log_warning "Opción inválida. Saliendo..."
        exit 1
        ;;
esac