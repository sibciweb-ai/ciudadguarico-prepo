# Solución al Error 400 en Subida de Noticias con Múltiples Imágenes o Texto Largo

## 📋 Problema Identificado

Al subir noticias con múltiples imágenes o mucho contenido de texto, el sistema devolvía un **error 400** en el endpoint `api/news`.

## 🔍 Causas del Problema

Se identificaron **dos cuellos de botella** que limitaban el tamaño del payload:

1. **Express (Backend)**: Límite por defecto de 100KB para `express.json()` y `express.urlencoded()`
2. **Nginx (Frontend/Proxy)**: Límite por defecto de 1MB para `client_max_body_size`

Cuando una noticia contenía:
- Múltiples IDs de imágenes en el array `media`
- Contenido HTML extenso en el campo `contenido`
- Resúmenes largos

El tamaño del payload JSON superaba estos límites, causando el rechazo de la petición antes de llegar al controlador.

## ✅ Solución Implementada

### 1. Aumento de Límites en Express (backend/src/app.ts)

**Antes:**
```typescript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

**Después:**
```typescript
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
```

### 2. Configuración de Nginx (frontend/nginx.conf)

**Agregado:**
```nginx
# Aumentar límite de tamaño del cuerpo de las peticiones
client_max_body_size 50M;

# Timeouts para operaciones largas (subida de archivos grandes)
proxy_connect_timeout 300s;
proxy_send_timeout 300s;
proxy_read_timeout 300s;
```

## 📊 Configuración Final de Límites

| Componente | Límite Anterior | Límite Nuevo | Propósito |
|------------|----------------|--------------|-----------|
| Express JSON | 100KB | 50MB | Noticias con mucho texto/imágenes |
| Express URLEncoded | 100KB | 50MB | FormData con múltiples campos |
| Nginx Body Size | 1MB | 50MB | Proxy de peticiones grandes |
| Nginx Timeouts | 60s | 300s | Operaciones de subida extensas |
| Multer (por archivo) | 10MB | 10MB | Ya era suficiente (sin cambios) |

## 🚀 Despliegue

Los cambios fueron aplicados mediante:

```bash
# 1. Reconstruir imágenes Docker con los cambios
docker compose build backend frontend

# 2. Reiniciar servicios
docker compose restart backend frontend
```

## ✨ Resultado

El sistema ahora puede manejar:
- Noticias con 10+ imágenes asociadas
- Contenido HTML extenso (artículos largos)
- Múltiples campos con datos de gran tamaño
- Operaciones que toman más tiempo sin timeout

## 📝 Fecha de Implementación

**Fecha:** $(date '+%Y-%m-%d %H:%M:%S')
**Versión:** 1.0.1

## 🔗 Archivos Modificados

1. `backend/src/app.ts` - Aumento de límites de payload
2. `frontend/nginx.conf` - Configuración de cliente y timeouts

## 🧪 Para Verificar

Puedes probar subiendo una noticia con:
- Más de 5 imágenes
- Contenido HTML de más de 5000 caracteres
- Múltiples campos con datos extensos

El sistema debería procesar la petición sin errores 400.
