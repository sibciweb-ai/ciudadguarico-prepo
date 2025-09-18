#!/bin/bash

echo "🚀 Iniciando frontend en modo desarrollo"
echo "======================================="

# Verificar que el backend esté corriendo
echo "🔍 Verificando que el backend esté disponible..."
until curl -s http://localhost:3000/api/news > /dev/null 2>&1; do
  echo "⏳ Esperando que el backend esté listo..."
  sleep 2
done

echo "✅ Backend disponible"

# Iniciar el servidor de desarrollo
echo "🚀 Iniciando servidor de desarrollo de Vite..."
npm run dev