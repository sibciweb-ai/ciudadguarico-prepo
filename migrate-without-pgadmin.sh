#!/bin/bash

echo "🔄 Migrando a configuración sin pgAdmin..."

# Detener servicios actuales
echo "⏹️  Deteniendo servicios actuales..."
docker compose down

# Mover datos de pgAdmin
echo "💾 Exportando volumen de pgAdmin..."
docker volume inspect cg_pgadmin_data > /dev/null 2>&1 && echo "Volumen de pgAdmin encontrado"

# Cambiar a la nueva configuración
echo "🔄 Cambiando a configuración limpia..."
cp docker-compose.yml docker-compose-with-pgadmin.yml.backup
cp docker-compose-clean.yml docker-compose.yml

# Iniciar servicios sin pgAdmin
echo "🚀 Iniciando servicios sin pgAdmin..."
docker compose up -d

echo "✅ ¡Migración completada exitosamente!"
echo ""
echo "📋 Estado de los servicios:"
docker compose ps
echo ""
echo "🌐 Ciudad Guárico disponible en: http://localhost"
echo "🗄️  Base de datos PostgreSQL en: localhost:5432"
echo ""
echo "🔧 Para usar pgAdmin independiente:"
echo "   cd /home/gsevilla/pg-admin && ./start-pgadmin.sh"
