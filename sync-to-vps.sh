#!/bin/bash

# Script para sincronizar cambios con el VPS
# Uso: ./sync-to-vps.sh

echo "🔄 Sincronizando cambios con el VPS..."

# Detener contenedores en el VPS
echo "⏹️  Deteniendo contenedores en el VPS..."
ssh root@tu-vps-ip "cd /home/gsevilla/ciudadguarico-prepo && docker compose down"

# Sincronizar archivos (excluyendo node_modules y dist)
echo "📁 Sincronizando archivos..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.git' \
  --exclude 'uploads' \
  ./ root@tu-vps-ip:/home/gsevilla/ciudadguarico-prepo/

# Reconstruir y ejecutar contenedores en el VPS
echo "🔨 Reconstruyendo contenedores en el VPS..."
ssh root@tu-vps-ip "cd /home/gsevilla/ciudadguarico-prepo && docker compose build --no-cache && docker compose up -d"

echo "✅ Sincronización completada!"
echo "🌐 Tu aplicación debería estar disponible en: http://tu-vps-ip"