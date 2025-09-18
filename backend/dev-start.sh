#!/bin/bash

echo "🚀 Iniciando backend en modo desarrollo"
echo "======================================"

# Cargar variables de entorno de desarrollo
export $(cat dev.env | xargs)

# Verificar que la base de datos esté disponible
echo "🔍 Verificando conexión a la base de datos..."
until docker exec cg_postgres pg_isready -U cg_user -d cg_database_dev > /dev/null 2>&1; do
  echo "⏳ Esperando que la base de datos esté lista..."
  sleep 2
done

echo "✅ Base de datos lista"

# Generar cliente de Prisma
echo "🔨 Generando cliente de Prisma..."
npx prisma generate

# Aplicar migraciones si es necesario
echo "📊 Verificando migraciones..."
npx prisma migrate deploy

# Iniciar el servidor en modo desarrollo
echo "🚀 Iniciando servidor de desarrollo..."
npm run dev