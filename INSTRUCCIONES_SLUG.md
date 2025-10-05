# 📝 Instrucciones para Implementar URLs Amigables con Slug

## ✅ Cambios Realizados

### 1. **Sistema de Alertas Mejorado** ✅
- ✅ Creado componente `NotificacionMejorada.tsx` con diseño profesional
- ✅ Validación de tamaño de imagen (máx. 10MB) con alerta detallada
- ✅ Validación de tipo de archivo (JPG, PNG, WebP, GIF)
- ✅ Notificaciones con íconos, colores y barra de progreso
- ✅ Mensajes descriptivos para el usuario

### 2. **Botón "Leer más" en Columnistas** ✅
- ✅ Creada página `OpinionDetalleArticulo.tsx`
- ✅ Actualizado `OpinionDetalleColumnista.tsx` con Link funcional
- ✅ Agregada ruta en `App.tsx`: `/opinion/articulo/:id`
- ✅ Sistema completo de visualización de artículos de opinión

### 3. **URLs Amigables con Slug** ⚠️ REQUIERE MIGRACIÓN

Se agregó soporte para URLs como: `/noticia/titulo-de-la-noticia` en lugar de `/noticia/123`

#### Cambios en Backend:
- ✅ Agregado campo `slug` único en `schema.prisma`
- ✅ Creadas utilidades `slug.ts` para generar slugs
- ✅ Actualizado `routes/news.ts` para generar slugs automáticamente
- ✅ Soporte para buscar noticias por slug o ID (compatibilidad retroactiva)

#### Cambios en Frontend:
- ✅ Agregado campo `slug` a interfaz `Noticia`
- ✅ Creada utilidad `noticiaUrl.ts` para generar URLs
- ✅ Actualizado `TarjetaNoticia.tsx` para usar slugs
- ✅ Actualizado `VistaNoticia.tsx` para aceptar slug o ID
- ✅ Actualizada `PaginaPrincipal.tsx` para usar URLs con slug

---

## 🚀 Pasos para Aplicar los Cambios

### Paso 1: Aplicar Migración de Base de Datos

```bash
cd backend

# Crear y aplicar la migración
npx prisma migrate dev --name add_slug_to_noticia

# Esto hará:
# 1. Agregar la columna 'slug' a la tabla 'Noticia'
# 2. Generar el Prisma Client actualizado
```

### Paso 2: Generar Slugs para Noticias Existentes

Necesitas crear un script para generar slugs para las noticias que ya existen en la base de datos:

```bash
# Crear el script de migración
cd backend/src/scripts
```

Crea el archivo `generateSlugs.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import { generarSlug, truncarSlug } from '../utils/slug';

const prisma = new PrismaClient();

async function generateSlugs() {
  console.log('🔄 Generando slugs para noticias existentes...');
  
  const noticias = await prisma.noticia.findMany({
    where: {
      OR: [
        { slug: null },
        { slug: '' }
      ]
    }
  });
  
  console.log(`📊 Encontradas ${noticias.length} noticias sin slug`);
  
  for (const noticia of noticias) {
    let slug = truncarSlug(generarSlug(noticia.titulo));
    
    // Verificar si ya existe
    const existente = await prisma.noticia.findUnique({
      where: { slug }
    });
    
    if (existente && existente.id !== noticia.id) {
      // Agregar ID al final para hacerlo único
      slug = `${slug}-${noticia.id}`;
    }
    
    await prisma.noticia.update({
      where: { id: noticia.id },
      data: { slug }
    });
    
    console.log(`✅ ${noticia.id}: ${slug}`);
  }
  
  console.log('✨ ¡Slugs generados exitosamente!');
  await prisma.$disconnect();
}

generateSlugs().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
```

Ejecutar el script:

```bash
npx ts-node src/scripts/generateSlugs.ts
```

### Paso 3: Reconstruir y Reiniciar

```bash
# Backend
cd backend
npm run build

# Si usas Docker, reconstruir
docker compose down
docker compose up -d --build

# O si está en desarrollo local
npm run dev
```

### Paso 4: Verificar Frontend

```bash
cd frontend
npm run build

# O en desarrollo
npm run dev
```

---

## 🧪 Pruebas

### 1. Crear una Nueva Noticia
- El slug se generará automáticamente desde el título
- Ejemplo: "¡Hola Mundo!" → "hola-mundo"

### 2. Verificar URLs
- Las nuevas noticias: `/noticia/hola-mundo`
- Las antiguas (con ID): `/noticia/123` seguirán funcionando

### 3. Verificar Alertas
- Intentar subir una imagen > 10MB
- Intentar subir un archivo no permitido (PDF, TXT, etc.)
- Deber aparecer una alerta descriptiva

### 4. Verificar Columnistas
- Ir a `/opinion/columnistas/2`
- Click en "Leer más" en un artículo
- Debe abrir la vista completa del artículo

---

## 📊 Ejemplos de URLs Generadas

| Título Original | Slug Generado |
|----------------|---------------|
| "¡Gran Noticia en Guárico!" | `gran-noticia-en-guarico` |
| "Alcalde inaugura nueva obra" | `alcalde-inaugura-nueva-obra` |
| "Deportes: Venezuela gana 3-0" | `deportes-venezuela-gana-3-0` |
| "Educación: 100% de matrícula" | `educacion-100-de-matricula` |

---

## ⚠️ Notas Importantes

1. **Compatibilidad Retroactiva**: El sistema acepta tanto slugs como IDs, así que las URLs antiguas seguirán funcionando.

2. **Slugs Únicos**: Si dos noticias tienen el mismo título, se agregará un contador automáticamente:
   - Primera: `titulo-noticia`
   - Segunda: `titulo-noticia-2`

3. **Límite de Caracteres**: Los slugs se truncan a 100 caracteres máximo.

4. **Caracteres Especiales**: Se eliminan automáticamente (¡, ?, %, etc.)

5. **Tildes**: Se convierten automáticamente (á → a, é → e, etc.)

---

## 🔄 Rollback (Si es necesario)

Si necesitas revertir los cambios:

```bash
cd backend

# Revertir la última migración
npx prisma migrate resolve --rolled-back add_slug_to_noticia

# Actualizar Prisma Client
npx prisma generate
```

---

## ✅ Checklist de Implementación

- [ ] Aplicar migración: `npx prisma migrate dev`
- [ ] Generar slugs para noticias existentes: `npx ts-node src/scripts/generateSlugs.ts`
- [ ] Reconstruir backend: `npm run build`
- [ ] Reiniciar servicios: `docker compose up -d --build`
- [ ] Verificar que las noticias nuevas generan slugs
- [ ] Verificar que las URLs antiguas (con ID) siguen funcionando
- [ ] Probar alertas de imágenes pesadas
- [ ] Probar botón "Leer más" en columnistas
- [ ] Actualizar producción

---

**¡Listo!** 🎉 Tu sistema ahora tiene:
- ✅ URLs amigables para SEO
- ✅ Sistema de alertas profesional
- ✅ Visualización completa de artículos de opinión
