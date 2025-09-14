#!/bin/bash

echo "🔄 Regresando a la configuración normal..."

# Detener todo
docker compose -f docker-compose-with-nginx.yml down 2>/dev/null
docker compose down 2>/dev/null

# Iniciar configuración normal
echo "🚀 Iniciando configuración normal..."
docker compose up -d

echo "✅ ¡Configuración normal restaurada!"
echo ""
docker compose ps
echo ""
echo "🌐 Sitio disponible en: http://localhost"
echo "🔧 pgAdmin disponible en: http://localhost:5050"
