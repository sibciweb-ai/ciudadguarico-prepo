#!/bin/bash

# Script para configurar la base de datos directamente en el VPS
# Ejecutar en el VPS: ./vps-database-setup.sh

echo "🗄️  Configurando base de datos en el VPS..."

# Conectar a PostgreSQL y ejecutar el script SQL
echo "📊 Ejecutando script SQL..."
docker exec -i cg_postgres psql -U cg_user -d cg_database < setup-database.sql

echo "✅ Base de datos configurada exitosamente!"
echo "📋 Credenciales de acceso:"
echo "   Usuario: admin"
echo "   Contraseña: ciudad2025"
echo ""
echo "🌐 Tu aplicación está disponible en: http://ciudadguarico.com"
echo ""
echo "🔍 Verificando estado de los contenedores..."
docker compose ps