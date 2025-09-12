#!/bin/bash

# Script para crear el usuario admin en el VPS
# Ejecutar en el VPS: ./create-admin-user.sh

echo "👤 Creando usuario admin..."

# Crear usuario admin (contraseña: ciudad2025)
docker exec -i cg_postgres psql -U cg_user -d cg_database -c "
INSERT INTO \"Usuario\" (username, password) VALUES 
('admin', '\$2b\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;
"

# Asignar rol de admin al usuario
docker exec -i cg_postgres psql -U cg_user -d cg_database -c "
INSERT INTO \"UsuarioRol\" (usuarioId, rolId)
SELECT u.id, r.id 
FROM \"Usuario\" u, \"Rol\" r 
WHERE u.username = 'admin' AND r.nombre = 'admin'
ON CONFLICT DO NOTHING;
"

# Verificar que se creó correctamente
echo "✅ Verificando usuario admin creado..."
docker exec -i cg_postgres psql -U cg_user -d cg_database -c "
SELECT 'Usuario admin:' as info;
SELECT username FROM \"Usuario\" WHERE username = 'admin';
SELECT 'Rol asignado:' as info;
SELECT u.username, r.nombre as rol
FROM \"Usuario\" u
JOIN \"UsuarioRol\" ur ON u.id = ur.usuarioId
JOIN \"Rol\" r ON ur.rolId = r.id
WHERE u.username = 'admin';
"

echo "🎉 Usuario admin creado exitosamente!"
echo "📋 Credenciales de acceso:"
echo "   Usuario: admin"
echo "   Contraseña: ciudad2025"