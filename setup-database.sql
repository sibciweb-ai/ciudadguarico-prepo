-- Script SQL para configurar la base de datos
-- Ejecutar en PostgreSQL: psql -U cg_user -d cg_database -f setup-database.sql

-- Crear secciones
INSERT INTO "Seccion" (nombre) VALUES 
('Gestión'),
('Municipales'),
('Deportes'),
('Cultura'),
('Producción'),
('Comunidad'),
('Seguridad'),
('Turismo'),
('Educación')
ON CONFLICT (nombre) DO NOTHING;

-- Crear rol de admin
INSERT INTO "Rol" (nombre) VALUES ('admin')
ON CONFLICT (nombre) DO NOTHING;

-- Crear usuario admin (contraseña: ciudad2025)
-- Hash bcrypt para 'ciudad2025': $2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO "Usuario" (username, password) VALUES 
('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;

-- Asignar rol de admin al usuario admin
INSERT INTO "UsuarioRol" (usuarioId, rolId)
SELECT u.id, r.id 
FROM "Usuario" u, "Rol" r 
WHERE u.username = 'admin' AND r.nombre = 'admin'
ON CONFLICT DO NOTHING;

-- Verificar datos insertados
SELECT 'Secciones creadas:' as info;
SELECT * FROM "Seccion";

SELECT 'Usuario admin creado:' as info;
SELECT username FROM "Usuario" WHERE username = 'admin';

SELECT 'Rol asignado:' as info;
SELECT u.username, r.nombre as rol
FROM "Usuario" u
JOIN "UsuarioRol" ur ON u.id = ur.usuarioId
JOIN "Rol" r ON ur.rolId = r.id
WHERE u.username = 'admin';