import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Crear secciones
    const secciones = [
      'Gestión',
      'Municipales', 
      'Deportes',
      'Cultura',
      'Producción',
      'Comunidad',
      'Seguridad',
      'Turismo',
      'Educación'
    ];

    console.log('📰 Creando secciones...');
    for (const nombreSeccion of secciones) {
      await prisma.seccion.upsert({
        where: { nombre: nombreSeccion },
        update: {},
        create: { nombre: nombreSeccion }
      });
      console.log(`✅ Sección creada: ${nombreSeccion}`);
    }

    // Crear rol de admin
    console.log('👑 Creando rol de admin...');
    const rolAdmin = await prisma.rol.upsert({
      where: { nombre: 'admin' },
      update: {},
      create: { nombre: 'admin' }
    });
    console.log('✅ Rol admin creado');

    // Crear usuario admin
    console.log('👤 Creando usuario admin...');
    const hashedPassword = await bcrypt.hash('ciudad2025', 10);
    
    const usuarioAdmin = await prisma.usuario.upsert({
      where: { username: 'admin' },
      update: { password: hashedPassword },
      create: {
        username: 'admin',
        password: hashedPassword
      }
    });
    console.log('✅ Usuario admin creado');

    // Asignar rol de admin al usuario
    console.log('🔗 Asignando rol de admin...');
    await prisma.usuarioRol.upsert({
      where: {
        usuarioId_rolId: {
          usuarioId: usuarioAdmin.id,
          rolId: rolAdmin.id
        }
      },
      update: {},
      create: {
        usuarioId: usuarioAdmin.id,
        rolId: rolAdmin.id
      }
    });
    console.log('✅ Rol asignado al usuario admin');

    console.log('🎉 Seed completado exitosamente!');
    console.log('📋 Credenciales de acceso:');
    console.log('   Usuario: admin');
    console.log('   Contraseña: ciudad2025');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();