#!/bin/bash

echo "📦 Instalando dependencias para desarrollo"
echo "=========================================="

# Instalar dependencias del backend
echo "🔨 Instalando dependencias del backend..."
cd backend
npm install
cd ..

# Instalar dependencias del frontend
echo "🔨 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

echo "✅ Dependencias instaladas correctamente"
echo ""
echo "🚀 Ahora puedes usar:"
echo "• ./start-dev.sh - Para iniciar en modo desarrollo"
echo "• cd backend && npm run dev - Para solo backend"
echo "• cd frontend && npm run dev - Para solo frontend"