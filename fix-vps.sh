#!/bin/bash

# Script para aplicar las correcciones directamente en el VPS
# Ejecutar en el VPS: ./fix-vps.sh

echo "🔧 Aplicando correcciones en el VPS..."

# Detener contenedores
echo "⏹️  Deteniendo contenedores..."
docker compose down

# Eliminar archivos obsoletos
echo "🗑️  Eliminando archivos obsoletos..."
rm -f backend/src/config/cloudinary.ts
rm -f backend/src/config/database.ts
rm -f backend/src/controllers/newsController.ts
rm -f backend/src/models/Media.ts
rm -f backend/src/models/News.ts
rm -f backend/src/models/NewsMedia.ts
rm -f backend/src/models/PDF.ts
rm -f backend/src/models/Publicidad.ts
rm -f backend/src/models/Role.ts
rm -f backend/src/models/Section.ts
rm -f backend/src/models/User.ts
rm -f backend/src/models/UserRole.ts
rm -f backend/src/models/View.ts
rm -f backend/src/scripts/createAdminUser.ts

# Actualizar tsconfig.json
echo "⚙️  Actualizando configuración de TypeScript..."
cat > backend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "declaration": false,
    "sourceMap": false
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Actualizar docker-compose.yml
echo "🐳 Actualizando Docker Compose..."
sed -i '1d' docker-compose.yml

# Reconstruir contenedores
echo "🔨 Reconstruyendo contenedores..."
docker compose build --no-cache

# Ejecutar contenedores
echo "🚀 Iniciando contenedores..."
docker compose up -d

echo "✅ Correcciones aplicadas exitosamente!"
echo "📊 Verificando estado..."
docker compose ps