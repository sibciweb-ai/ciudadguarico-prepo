# 🚀 Ciudad Guárico - Modo Desarrollo

## Configuración Rápida

### 1. Instalar dependencias
```bash
./install-dev.sh
```

### 2. Iniciar en modo desarrollo
```bash
./start-dev.sh
```

## Servicios Disponibles

- **Base de datos**: `localhost:5432/cg_database_dev`
- **PgAdmin**: http://localhost:5050
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## Credenciales

- **Base de datos**: `cg_user` / `cg_password`
- **PgAdmin**: `admin@ciudadguarico.com` / `ciudad2025`

## Comandos Útiles

### Backend
```bash
cd backend
npm run dev          # Iniciar servidor
npm run build        # Compilar
npx prisma studio    # Abrir Prisma Studio
npx prisma migrate   # Aplicar migraciones
```

### Frontend
```bash
cd frontend
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción
```

## Estructura de Base de Datos

- **Producción**: `cg_database`
- **Desarrollo**: `cg_database_dev`

## Ventajas del Modo Desarrollo

✅ **Hot Reload**: Los cambios se reflejan automáticamente
✅ **Debugging**: Mejor debugging y logs
✅ **Rapidez**: No necesitas rebuilds constantes
✅ **Flexibilidad**: Puedes modificar código en tiempo real

## Solución de Problemas

### Si la base de datos no responde:
```bash
docker compose up -d db pgadmin
```

### Si hay problemas de puertos:
- Backend: Cambia el puerto en `backend/dev.env`
- Frontend: Vite usará el siguiente puerto disponible

### Si hay problemas de CORS:
- Verifica `ALLOWED_ORIGINS` en `backend/dev.env`

## Notas Importantes

- La base de datos de desarrollo es independiente de la de producción
- Los cambios en desarrollo no afectan la base de datos de producción
- Puedes hacer pruebas sin miedo a romper datos importantes