# 📊 Guía de Importación de Alertas en Grafana

## ✅ Archivo Creado
Se ha creado el archivo: `grafana-postgres-alerts.yaml`

Este archivo contiene **8 alertas** para monitorear tu PostgreSQL:
1. 🔴 PostgreSQL DOWN - Bot Telegram (CRITICAL)
2. ⚠️ Conexiones de BD Altas (WARNING)
3. 🐌 Queries Lentas Detectadas (WARNING)
4. 🔒 Deadlocks Detectados (WARNING)
5. ⚠️ Rollbacks Frecuentes (WARNING)
6. 💾 Base de Datos Creciendo Mucho (INFO)
7. 📊 Postgres Exporter DOWN (WARNING)
8. 💤 Demasiadas Conexiones Idle (INFO)

---

## 📋 MÉTODO 1: Importar via API de Grafana (Recomendado)

### Paso 1: Obtener tu API Key de Grafana

1. Abre Grafana en tu navegador
2. Ve a: **Configuration** (⚙️) → **API Keys** → **New API Key**
3. Nombre: `AlertImport`
4. Role: **Admin**
5. Copia el token generado

### Paso 2: Importar el archivo

Ejecuta este comando en la terminal (reemplaza TU_TOKEN y TU_GRAFANA_URL):

```bash
# Si Grafana está en localhost:3000
curl -X POST \
  -H "Authorization: Bearer TU_API_KEY_AQUI" \
  -H "Content-Type: application/yaml" \
  --data-binary @grafana-postgres-alerts.yaml \
  http://localhost:3000/api/v1/provisioning/alert-rules

# Si está en otro servidor
curl -X POST \
  -H "Authorization: Bearer TU_API_KEY_AQUI" \
  -H "Content-Type: application/yaml" \
  --data-binary @grafana-postgres-alerts.yaml \
  http://TU_SERVIDOR:3000/api/v1/provisioning/alert-rules
```

---

## 📋 MÉTODO 2: Importar Manualmente (Si el API no funciona)

### Paso 1: Crear la carpeta de alertas

1. En Grafana, ve a **Alerting** → **Alert rules**
2. Click en **New folder**
3. Nombre: `PostgreSQL Alerts`
4. Guardar

### Paso 2: Crear cada alerta manualmente

Para cada una de las 8 alertas, sigue estos pasos:

1. Click en **New alert rule**

2. **Section 1 - Set a query and alert condition:**
   - Query A:
     - Data source: Selecciona tu Prometheus
     - Query: Copia el `expr` del YAML (ejemplo: `up{job="postgres_exporter"}`)
   
   - Expression B (Reduce):
     - Operation: Reduce
     - Function: Last
     - Input: A
   
   - Expression C (Threshold):
     - Operation: Threshold
     - Condition: IS ABOVE o IS BELOW (según la alerta)
     - Threshold: El valor de `params` del YAML
     - Input: B
   
   - Set as alert condition: Selecciona C

3. **Section 2 - Set evaluation behavior:**
   - Folder: `PostgreSQL Alerts`
   - Evaluation group: Crea uno llamado `postgres-monitoring` con intervalo `1m`
   - Pending period: Copia el valor de `for` del YAML (ej: `1m`, `5m`, etc.)

4. **Section 3 - Add details:**
   - Alert name: Copia el `title` del YAML
   - Summary: Copia el `summary` de annotations
   - Description: Copia el `description` de annotations

5. **Section 4 - Labels:**
   - Agrega los labels del YAML:
     - `severity`: `critical`/`warning`/`info`
     - `service`: `postgres`
     - `alert_type`: según la alerta

6. Click en **Save and exit**

---

## 🔧 MÉTODO 3: Provisioning (Para producción)

Si tienes acceso al servidor de Grafana:

### Paso 1: Copia el archivo al directorio de provisioning

```bash
# Ubicación típica de provisioning en Grafana
sudo cp grafana-postgres-alerts.yaml /etc/grafana/provisioning/alerting/
sudo chown grafana:grafana /etc/grafana/provisioning/alerting/grafana-postgres-alerts.yaml
```

### Paso 2: Reinicia Grafana

```bash
sudo systemctl restart grafana-server
```

Las alertas se cargarán automáticamente.

---

## 📱 Configurar Notificaciones a Telegram

Después de importar las alertas, configura el contact point de Telegram:

### Paso 1: Crear Bot de Telegram

1. Abre Telegram y busca: `@BotFather`
2. Envía: `/newbot`
3. Sigue las instrucciones
4. Guarda el **Bot Token** que te da

### Paso 2: Obtener Chat ID

Opción A - Envía un mensaje a tu bot y luego visita:
```
https://api.telegram.org/bot<TU_BOT_TOKEN>/getUpdates
```
Busca el campo `"chat":{"id": XXXXX}`

Opción B - Usa este comando:
```bash
curl https://api.telegram.org/bot<TU_BOT_TOKEN>/getUpdates | grep -oP '"chat":{"id":\K[^,]+'
```

### Paso 3: Configurar en Grafana

1. Ve a **Alerting** → **Contact points**
2. Click en **New contact point**
3. Name: `telegram-bot-ciudadguarico`
4. Integration: Selecciona **Telegram**
5. Settings:
   - **Bot Token**: Pega tu token de BotFather
   - **Chat ID**: Pega tu Chat ID
   - **Message**: (Opcional) Personaliza el mensaje
6. Click en **Test** para probar
7. Click en **Save contact point**

### Paso 4: Configurar Notification Policy

1. Ve a **Alerting** → **Notification policies**
2. Click en **Edit** en la política por defecto
3. En **Default contact point**, selecciona `telegram-bot-ciudadguarico`
4. Guarda

También puedes crear políticas específicas por severidad:
- **Critical** → Enviar a Telegram + Email
- **Warning** → Solo Telegram
- **Info** → Solo logs

---

## ✅ Verificar que todo funciona

1. Ve a **Alerting** → **Alert rules**
2. Deberías ver la carpeta `PostgreSQL Alerts` con 8 reglas
3. Cada alerta debería mostrar estado: **Normal** (verde) o **Pending** (amarillo)

Para probar una alerta:
```bash
# Detén el postgres_exporter para activar las alertas de "DOWN"
docker stop cg_postgres_exporter

# Espera 1-2 minutos y deberías recibir notificación en Telegram

# Vuelve a iniciar
docker start cg_postgres_exporter
```

---

## 🎯 Ajustar Umbrales de Alertas

Si necesitas ajustar los valores, edita el YAML antes de importar:

```yaml
# Ejemplo: Cambiar umbral de conexiones de 80 a 100
conditions:
  - evaluator:
      params:
        - 100  # Era 80
      type: gt
```

Valores recomendados según tu servidor:
- **Conexiones altas**: 80 (servidores pequeños), 200 (servidores grandes)
- **Queries lentas**: 30s (interactivo), 60s (batch jobs)
- **Base de datos grande**: 10GB (desarrollo), 100GB (producción)

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que Prometheus esté scrapeando el exporter: http://localhost:9090/targets
2. Verifica métricas disponibles: http://localhost:9187/metrics
3. Revisa logs de Grafana: `sudo journalctl -u grafana-server -f`

---

¡Listo! Tus alertas de PostgreSQL estarán monitoreando tu bot de Telegram 24/7 📊🚀
