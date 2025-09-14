#!/bin/bash

echo "🧪 Verificando correcciones aplicadas..."

echo ""
echo "📄 OpinionColumnistas.tsx:"
grep -c "opinion-title\|opinion-content\|opinion-container\|break-words" ./frontend/src/pages/OpinionColumnistas.tsx

echo ""  
echo "📄 OpinionEditoriales.tsx:"
grep -c "opinion-title\|opinion-content\|opinion-container\|break-words" ./frontend/src/pages/OpinionEditoriales.tsx

echo ""
echo "📄 OpinionDetalleColumnista.tsx:"
grep -c "opinion-title\|opinion-content\|opinion-container\|break-words" ./frontend/src/pages/OpinionDetalleColumnista.tsx

echo ""
echo "📄 OpinionDetalleEditorial.tsx:"
grep -c "opinion-title\|opinion-content\|opinion-container\|break-words" ./frontend/src/pages/OpinionDetalleEditorial.tsx

echo ""
echo "🎨 CSS específico para opiniones agregado:"
grep -c "opinion-" ./frontend/src/index.css

echo ""
echo "✅ Estado del servicio:"
curl -s -I http://localhost | head -1

echo ""
echo "🌐 Tu página está disponible en: http://localhost"
echo "🔧 pgAdmin está disponible en: http://localhost:5050"
