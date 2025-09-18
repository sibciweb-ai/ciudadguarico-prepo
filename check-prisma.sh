#!/bin/bash

echo "🔧 Script de migración y verificación de Prisma"
echo "=============================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "backend/prisma/schema.prisma" ]; then
    echo "❌ No se encontró el esquema de Prisma. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

cd backend

echo "📋 Verificando esquema de Prisma..."

# Generar el cliente de Prisma
echo "🔨 Generando cliente de Prisma..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Error al generar el cliente de Prisma"
    exit 1
fi

echo "✅ Cliente de Prisma generado exitosamente"

# Verificar el estado de la base de datos
echo "🔍 Verificando estado de la base de datos..."
npx prisma db pull --print

echo ""
echo "📊 Para aplicar migraciones pendientes:"
echo "  npx prisma migrate deploy"
echo ""
echo "📊 Para resetear la base de datos:"
echo "  npx prisma migrate reset"
echo ""
echo "📊 Para ver el estado de las migraciones:"
echo "  npx prisma migrate status"
echo ""

cd ..