#!/bin/bash

# Script para ejecutar migraciones y seed en el VPS
# Ejecutar en el VPS: ./setup-database.sh

echo "🗄️  Configurando base de datos en el VPS..."

# Detener contenedores temporalmente
echo "⏹️  Deteniendo contenedores..."
docker compose down

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones de Prisma..."
docker compose run --rm backend npx prisma migrate deploy

# Ejecutar seed
echo "🌱 Ejecutando seed de la base de datos..."
docker compose run --rm backend npx ts-node src/scripts/seedDatabase.ts

# Reiniciar contenedores
echo "🚀 Reiniciando contenedores..."
docker compose up -d

echo "✅ Base de datos configurada exitosamente!"
echo "📋 Credenciales de acceso:"
echo "   Usuario: admin"
echo "   Contraseña: ciudad2025"
echo ""
echo "🌐 Tu aplicación está disponible en: http://ciudadguarico.com"