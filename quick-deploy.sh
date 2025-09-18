#!/bin/bash

echo "🚀 Despliegue rápido de Ciudad Guárico"
echo "======================================"

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Por favor inicia Docker primero."
    exit 1
fi

echo "✅ Docker está funcionando"

# Crear la red si no existe
if ! docker network ls | grep -q "ciudadguarico-net"; then
    echo "📡 Creando red ciudadguarico-net..."
    docker network create ciudadguarico-net
fi

# Levantar todos los servicios
echo "🚀 Iniciando servicios..."
docker compose up -d

echo ""
echo "🎉 ¡Servicios iniciados!"
echo "======================="
echo ""
echo "📋 Servicios disponibles:"
echo "  • Frontend: http://localhost:3001"
echo "  • Backend API: http://localhost:3000"
echo "  • PgAdmin: http://localhost:5050"
echo ""
echo "📊 Para ver logs: docker compose logs -f"
echo "🛑 Para detener: docker compose down"
echo ""