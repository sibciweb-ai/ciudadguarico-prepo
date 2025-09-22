#!/bin/bash

echo "🖼️ Optimizando imágenes del proyecto ciudad-guarico-prepo..."

# Crear directorios para backups si no existen
mkdir -p backend/uploads/publicidad-backup
mkdir -p frontend/dist-backup

# Función para convertir y optimizar imágenes
optimize_image() {
    local file="$1"
    local dir=$(dirname "$file")
    local basename=$(basename "$file")
    local extension="${basename##*.}"
    local filename="${basename%.*}"
    
    echo "Procesando: $file"
    
    # Backup del original
    cp "$file" "${dir}-backup/" 2>/dev/null || true
    
    case "${extension,,}" in
        jpg|jpeg)
            # Optimizar JPEG
            jpegoptim --max=85 --strip-all "$file"
            ;;
        png)
            # Optimizar PNG y convertir a WebP si es muy grande
            local size=$(stat --printf="%s" "$file")
            if [ $size -gt 500000 ]; then  # Si es > 500KB
                echo "PNG muy grande ($size bytes), convirtiendo a WebP..."
                cwebp -q 85 "$file" -o "${file%.*}.webp"
                optipng -o2 "$file"  # También optimizar el PNG original
            else
                optipng -o2 "$file"
            fi
            ;;
        gif)
            # Optimizar GIF
            local size=$(stat --printf="%s" "$file")
            if [ $size -gt 1000000 ]; then  # Si es > 1MB
                echo "GIF muy grande ($size bytes), reduciendo colores..."
                gifsicle --optimize=3 --colors=128 --resize-fit 800x600 "$file" -o "$file.tmp"
                mv "$file.tmp" "$file"
            else
                gifsicle --optimize=3 "$file" -o "$file.tmp"
                mv "$file.tmp" "$file"
            fi
            ;;
    esac
}

# Optimizar imágenes en backend/uploads/publicidad
echo "📁 Procesando backend/uploads/publicidad..."
for file in backend/uploads/publicidad/*.{jpg,jpeg,png,gif}; do
    if [[ -f "$file" ]]; then
        optimize_image "$file"
    fi
done

# Optimizar imágenes en frontend/dist
echo "📁 Procesando frontend/dist..."
for file in frontend/dist/*.{jpg,jpeg,png,gif}; do
    if [[ -f "$file" ]]; then
        optimize_image "$file"
    fi
done

# Crear versiones WebP de las imágenes principales del frontend
echo "🔄 Creando versiones WebP para imágenes del frontend..."
for file in frontend/dist/*.{jpg,png}; do
    if [[ -f "$file" ]]; then
        cwebp -q 85 "$file" -o "${file%.*}.webp"
        echo "Creado: ${file%.*}.webp"
    fi
done

echo "✅ Optimización completada!"
echo "📊 Comparando tamaños..."

# Mostrar comparación de tamaños
echo "--- Tamaños ANTES (backup) vs DESPUÉS ---"
du -sh backend/uploads/publicidad-backup/* 2>/dev/null | sed 's/backend\/uploads\/publicidad-backup\//ANTES: /'
du -sh backend/uploads/publicidad/* 2>/dev/null | sed 's/backend\/uploads\/publicidad\//DESPUÉS: /'

