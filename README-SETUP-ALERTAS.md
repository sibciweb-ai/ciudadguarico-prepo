# 🤖 Setup Automático de Alertas - Grafana

## 🚀 Uso del Script Automático

He creado un script que hace **TODO el trabajo por ti**:

```bash
./setup-grafana-alerts.sh
```

### ¿Qué hace el script automáticamente?

1. ✅ Verifica conexión con Grafana
2. ✅ Crea una API Key automáticamente
3. ✅ Detecta tu datasource de Prometheus
4. ✅ Importa las 8 alertas configuradas
5. ✅ Configura el Contact Point de Telegram
6. ✅ Configura las Notification Policies
7. ✅ Te da un resumen completo

### 📝 Información que necesitas tener lista:

**Para Grafana:**
- URL de Grafana (ej: `http://localhost:3000`)
- Usuario admin (por defecto: `admin`)
- Contraseña de admin

**Para Telegram (opcional pero recomendado):**
- Bot Token (lo obtienes de @BotFather)
- Chat ID (tu chat ID o el de un grupo)

---

## 🎯 Guía Rápida Paso a Paso

### 1️⃣ Crear Bot de Telegram (2 minutos)

1. Abre Telegram y busca: `@BotFather`
2. Envía: `/newbot`
3. Sigue las instrucciones:
   - Te pedirá un nombre: `AlertasPostgreSQL`
   - Te pedirá un username: `ciudadguarico_alerts_bot`
4. Copia el **Token** que te da (algo como: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2️⃣ Obtener tu Chat ID (1 minuto)

Opción A - Manual:
1. Envía cualquier mensaje a tu bot
2. Visita en tu navegador:
   ```
   https://api.telegram.org/bot<TU_TOKEN>/getUpdates
   ```
3. Busca: `"chat":{"id":123456789`
4. Ese número es tu Chat ID

Opción B - Automático con comando:
```bash
# Reemplaza TU_TOKEN con el token de BotFather
TOKEN="TU_TOKEN_AQUI"
curl -s "https://api.telegram.org/bot${TOKEN}/getUpdates" | grep -oP '"chat":{"id":\K[^,]+'
```

### 3️⃣ Ejecutar el Script Automático

```bash
cd /home/gsevilla/ciudadguarico-prepo
./setup-grafana-alerts.sh
```

El script te preguntará:
```
URL de Grafana [http://localhost:3000]: (presiona Enter o escribe tu URL)
Usuario admin de Grafana [admin]: (presiona Enter o escribe otro)
Contraseña de Grafana: (escribe tu contraseña)
¿Configurar notificaciones de Telegram? (s/n) [s]: s
Bot Token de Telegram: (pega tu token)
Chat ID de Telegram: (pega tu chat ID)
```

### 4️⃣ ¡Listo! 🎉

El script hará todo automáticamente y te mostrará un resumen al final.

---

## 🧪 Probar que Funciona

Una vez configurado, prueba las alertas:

```bash
# Detener el exporter para simular un fallo
docker stop cg_postgres_exporter

# Espera 1-2 minutos...
# Deberías recibir un mensaje en Telegram: 🔴 PostgreSQL está CAÍDO

# Volver a iniciar
docker start cg_postgres_exporter

# Deberías recibir: ✅ PostgreSQL se ha recuperado
```

---

## 🔧 Si algo sale mal...

### Problema: "No se puede conectar a Grafana"
**Solución:**
```bash
# Verifica que Grafana esté corriendo
curl http://localhost:3000/api/health

# Si no responde, inicia Grafana
docker start grafana  # o el comando que uses
```

### Problema: "No se encontró datasource de Prometheus"
**Solución:**
1. Abre Grafana
2. Ve a **Configuration** → **Data Sources**
3. Agrega Prometheus:
   - URL: `http://localhost:9090` (o donde esté tu Prometheus)
   - Save & Test

### Problema: "Error al crear API Key"
**Solución:** Verifica que el usuario y contraseña sean correctos.

### Problema: "No recibo notificaciones en Telegram"
**Solución:**
1. Verifica que el bot token sea correcto
2. Asegúrate de haber enviado al menos un mensaje al bot
3. Prueba manualmente:
   ```bash
   curl -X POST "https://api.telegram.org/bot<TU_TOKEN>/sendMessage" \
     -d "chat_id=<TU_CHAT_ID>" \
     -d "text=Test desde script"
   ```

---

## 📊 Alertas Configuradas

El script configura estas 8 alertas:

| Alerta | Severidad | Descripción |
|--------|-----------|-------------|
| PostgreSQL DOWN | 🔴 CRITICAL | Base de datos caída |
| Conexiones Altas | ⚠️ WARNING | Más de 80 conexiones |
| Queries Lentas | ⚠️ WARNING | Queries > 30 segundos |
| Deadlocks | ⚠️ WARNING | Bloqueos detectados |
| Rollbacks Frecuentes | ⚠️ WARNING | Tasa alta de rollbacks |
| BD Grande | ℹ️ INFO | Base de datos > 10GB |
| Exporter DOWN | ⚠️ WARNING | Exporter caído |
| Conexiones Idle | ℹ️ INFO | Muchas conexiones idle |

---

## 🎨 Personalizar Alertas

Si quieres cambiar los umbrales **antes** de ejecutar el script:

Edita `grafana-postgres-alerts.yaml`:

```yaml
# Ejemplo: Cambiar umbral de conexiones de 80 a 100
params:
  - 100  # Cambiar este número
```

Valores recomendados:
- **Conexiones**: 50-100 (dev), 200-500 (prod)
- **Queries lentas**: 30s (interactivo), 60s (batch)
- **BD grande**: 5GB (dev), 50GB (prod)

---

## 💡 Tips

1. **Grupos de Telegram**: Puedes enviar alertas a un grupo. Solo agrega el bot al grupo y usa el Chat ID del grupo.

2. **Múltiples destinos**: En Grafana puedes configurar varios contact points (Telegram + Email + Slack).

3. **Silenciar alertas**: Si estás haciendo mantenimiento:
   - Grafana → Alerting → Silences → New Silence

4. **Ver histórico**: Grafana → Alerting → Alert History

---

## 🆘 Soporte

Si tienes problemas, revisa:
1. Logs de Grafana: `docker logs grafana` o `journalctl -u grafana-server`
2. Prometheus targets: http://localhost:9090/targets
3. Métricas del exporter: http://localhost:9187/metrics

---

¡Disfruta de tu monitoreo automatizado! 🚀📊
