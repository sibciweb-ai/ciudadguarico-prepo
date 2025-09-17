# Backup de Base de Datos - Ciudad Guárico

## Información del backup
- Fecha: Tue Sep 16 00:17:55 -04 2025
- Archivo: ciudadguarico_backup_20250916_001735.sql
- Tamaño: 51K

## Cómo restaurar
Para restaurar este backup en caso necesario:

```bash
# Detener los contenedores
docker compose down

# Eliminar el volumen de datos (CUIDADO: esto borra la BD actual)
docker volume rm ciudadguarico-prepo_pgdata

# Levantar solo la base de datos
docker compose up -d postgres

# Esperar unos segundos y restaurar
cat ciudadguarico_backup_20250916_001735.sql | docker exec -i cg_postgres psql -U cg_user -d cg_database

# Levantar todos los servicios
docker compose up -d
```

## Contenido del backup
Este backup incluye:
- Todas las tablas del sistema
- Datos de noticias, editoriales, columnistas
- Configuración de secciones
- Contenidos destacados
- Usuarios y roles
