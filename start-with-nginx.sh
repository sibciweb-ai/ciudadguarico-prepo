#!/bin/bash

echo "🚀 Iniciando Ciudad Guárico con Nginx Reverse Proxy..."

# Detener configuración actual
echo "⏹️  Deteniendo servicios actuales..."
docker compose down

# Iniciar con la nueva configuración que incluye Nginx
echo "🔄 Iniciando con Nginx..."
docker compose -f docker-compose-with-nginx.yml up -d

echo "✅ ¡Servicios iniciados con éxito!"
echo ""
echo "📋 Estado de los servicios:"
docker compose -f docker-compose-with-nginx.yml ps
echo ""
echo "🌐 URLs disponibles:"
echo "  - Puerto original (80): http://localhost"
echo "  - Nginx Reverse Proxy (8080): http://localhost:8080"
echo "  - pgAdmin via Nginx (8081): http://localhost:8081"
echo "  - pgAdmin directo (5050): http://localhost:5050"
echo ""
echo "💡 Una vez que confirmes que todo funciona en puerto 8080,"
echo "   puedes usar 'migrate-ports.sh' para cambiar al puerto 80"
