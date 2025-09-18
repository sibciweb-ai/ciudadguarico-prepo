#!/bin/bash

echo "🚀 Iniciando proceso de reparación y despliegue de Ciudad Guárico"
echo "================================================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes con color
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    log_error "Docker no está corriendo. Por favor inicia Docker primero."
    exit 1
fi

log_info "Docker está funcionando correctamente"

# Paso 1: Limpiar contenedores y volúmenes existentes
log_info "Limpiando contenedores y volúmenes existentes..."
docker compose down -v --remove-orphans 2>/dev/null || true

# Paso 2: Eliminar volúmenes específicos si existen
log_info "Eliminando volúmenes antiguos..."
docker volume rm ciudadguarico-prepo_pgdata 2>/dev/null || true
docker volume rm ciudadguarico-prepo_pgladmin_data 2>/dev/null || true
docker volume rm ciudadguarico-prepo_backend_uploads 2>/dev/null || true

# Paso 3: Crear la red si no existe
log_info "Verificando red Docker..."
if ! docker network ls | grep -q "ciudadguarico-net"; then
    log_info "Creando red ciudadguarico-net..."
    docker network create ciudadguarico-net
    log_success "Red creada exitosamente"
else
    log_success "Red ciudadguarico-net ya existe"
fi

# Paso 4: Construir las imágenes
log_info "Construyendo imágenes Docker..."
docker compose build --no-cache

if [ $? -ne 0 ]; then
    log_error "Error al construir las imágenes"
    exit 1
fi

log_success "Imágenes construidas exitosamente"

# Paso 5: Levantar solo la base de datos primero
log_info "Iniciando base de datos..."
docker compose up -d db

# Esperar a que la base de datos esté lista
log_info "Esperando a que la base de datos esté lista..."
sleep 10

# Verificar que la base de datos esté funcionando
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker exec cg_postgres pg_isready -U cg_user -d cg_database > /dev/null 2>&1; then
        log_success "Base de datos está lista"
        break
    fi
    attempt=$((attempt + 1))
    log_info "Esperando base de datos... (intento $attempt/$max_attempts)"
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    log_error "La base de datos no se pudo inicializar correctamente"
    exit 1
fi

# Paso 6: Restaurar el backup de la base de datos
log_info "Restaurando backup de la base de datos..."
if [ -f "backup-db-ciudad/ciudadguarico_backup_20250916_001735.sql" ]; then
    cat backup-db-ciudad/ciudadguarico_backup_20250916_001735.sql | docker exec -i cg_postgres psql -U cg_user -d cg_database
    
    if [ $? -eq 0 ]; then
        log_success "Backup restaurado exitosamente"
    else
        log_warning "Hubo problemas al restaurar el backup, pero continuando..."
    fi
else
    log_warning "No se encontró el archivo de backup, continuando sin restaurar..."
fi

# Paso 7: Levantar todos los servicios
log_info "Iniciando todos los servicios..."
docker compose up -d

# Esperar un momento para que todos los servicios se inicialicen
sleep 15

# Paso 8: Verificar el estado de los servicios
log_info "Verificando estado de los servicios..."
docker compose ps

# Paso 9: Verificar conectividad
log_info "Verificando conectividad..."

# Verificar backend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    log_success "Backend está funcionando en http://localhost:3000"
else
    log_warning "Backend no responde en el puerto 3000"
fi

# Verificar frontend
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    log_success "Frontend está funcionando en http://localhost:3001"
else
    log_warning "Frontend no responde en el puerto 3001"
fi

# Verificar pgadmin
if curl -s http://localhost:5050 > /dev/null 2>&1; then
    log_success "PgAdmin está funcionando en http://localhost:5050"
else
    log_warning "PgAdmin no responde en el puerto 5050"
fi

echo ""
echo "🎉 ¡Despliegue completado!"
echo "=========================="
echo ""
echo "📋 Servicios disponibles:"
echo "  • Frontend: http://localhost:3001"
echo "  • Backend API: http://localhost:3000"
echo "  • PgAdmin: http://localhost:5050"
echo "  • Base de datos: localhost:5432"
echo ""
echo "🔑 Credenciales PgAdmin:"
echo "  • Email: admin@ciudadguarico.com"
echo "  • Password: ciudad2025"
echo ""
echo "🔑 Credenciales Base de Datos:"
echo "  • Usuario: cg_user"
echo "  • Password: cg_password"
echo "  • Base de datos: cg_database"
echo ""
echo "📊 Para ver logs en tiempo real:"
echo "  docker compose logs -f"
echo ""
echo "🛑 Para detener todos los servicios:"
echo "  docker compose down"
echo ""

log_success "¡Sistema Ciudad Guárico desplegado exitosamente!"