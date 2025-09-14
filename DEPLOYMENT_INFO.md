# CiudadGuarico - Información de Deployment 🚀

## 📋 Resumen del Sistema

✅ **Sistema completamente desplegado y funcional**

### 🌐 URLs del Sistema

- **Frontend**: http://ciudadguarico.com (Puerto 80)
- **Backend API**: http://ciudadguarico.com/api/ (Proxiado desde frontend)
- **pgAdmin**: http://ciudadguarico.com:5050 o http://149.50.138.208:5050
- **Base de datos**: Disponible en puerto 5432

### 🔐 Credenciales de Acceso

#### Base de datos PostgreSQL
- **Host**: localhost (desde VPS) / 149.50.138.208 (externo)
- **Puerto**: 5432
- **Base de datos**: `cg_database`
- **Usuario principal**: `cg_user`
- **Contraseña**: `cg_password`
- **Usuario admin**: `admin`
- **Contraseña admin**: `ciudad2025`

#### pgAdmin
- **URL**: http://149.50.138.208:5050
- **Email**: admin@ciudadguarico.com
- **Contraseña**: ciudad2025

#### Sistema CiudadGuarico (Frontend)
- **Usuario admin existente**: admin
- **Contraseña**: [usar interfaz web para reset/login]

## 🐳 Contenedores Activos

```bash
docker ps
```

| Servicio | Contenedor | Puerto | Estado |
|----------|------------|---------|---------|
| Frontend | cg_frontend | 80 | ✅ Running |
| Backend | cg_backend | 3000 | ✅ Running |
| PostgreSQL | cg_postgres | 5432 | ✅ Healthy |
| pgAdmin | cg_pgadmin | 5050 | ✅ Running |

## 📊 Base de Datos

### Tablas Existentes
- Usuario, Rol, UsuarioRol
- Noticia, Seccion, Media, NoticiaMedia
- Columnista, Opinion, Editorial
- ContenidoDestacado, PDF, View

### Usuario Admin Existente
- **ID**: 1
- **Username**: admin
- **Rol**: admin (ID: 1)

## 🛠️ Comandos Útiles

### Gestión de contenedores
```bash
# Ver estado de contenedores
docker ps

# Ver logs
docker logs cg_frontend
docker logs cg_backend
docker logs cg_postgres
docker logs cg_pgadmin

# Reiniciar servicios
docker compose restart
docker compose restart backend
```

### Base de datos
```bash
# Conectar a PostgreSQL
docker exec -it cg_postgres psql -U cg_user -d cg_database

# Backup de base de datos
docker exec cg_postgres pg_dump -U cg_user cg_database > backup.sql

# Restaurar backup
docker exec -i cg_postgres psql -U cg_user -d cg_database < backup.sql
```

## 🌍 Configuración DNS

- **ciudadguarico.com** → 149.50.138.208 ✅
- **www.ciudadguarico.com** → No configurado (opcional)

## 🔧 Próximos Pasos Recomendados

1. **Configurar HTTPS**: Instalar SSL/TLS con Let's Encrypt
2. **Backup automático**: Implementar backups automáticos de la base de datos
3. **Monitoreo**: Configurar alertas y monitoreo del sistema
4. **CDN**: Configurar CDN para imágenes si es necesario (reemplazando Cloudinary)
5. **Dominio www**: Agregar record CNAME para www.ciudadguarico.com

## 🆘 Troubleshooting

### Problemas comunes
```bash
# Si el backend no conecta a la base de datos
docker compose restart backend

# Si pgAdmin no carga
docker compose restart pgadmin

# Ver logs de errores
docker logs cg_backend --tail 50
```

### Recrear contenedores si hay problemas
```bash
# Parar todo
docker compose down

# Reconstruir y levantar
docker compose up -d --build
```

## 📝 Notas de Migración

- ✅ Migración de Supabase a PostgreSQL local completada
- ✅ Migración de Render a VPS completada  
- ✅ Migración de Vercel a Nginx local completada
- ⚠️  Cloudinary aún en uso (cambiar por almacenamiento local si se desea)

---
**Fecha de deployment**: 2025-09-13  
**Versión**: 1.0  
**Status**: ✅ Producción  
