import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupNacionales() {
  try {
    console.log('🧹 Iniciando limpieza de noticias en la sección "Nacionales"...');

    const seccion = await prisma.seccion.findFirst({ where: { nombre: 'Nacionales' } });
    if (!seccion) {
      console.log('ℹ️ No existe la sección "Nacionales". Nada que limpiar.');
      return;
    }

    // Buscar todas las noticias de la sección
    const noticias = await prisma.noticia.findMany({ where: { seccionId: seccion.id }, select: { id: true } });

    if (noticias.length === 0) {
      console.log('✅ No hay noticias en "Nacionales". Nada que eliminar.');
      return;
    }

    const ids = noticias.map(n => n.id);

    console.log(`Encontradas ${ids.length} noticias en "Nacionales". Eliminando relaciones media...`);
    await prisma.noticiaMedia.deleteMany({ where: { noticiaId: { in: ids } } });

    console.log('Eliminando noticias...');
    await prisma.noticia.deleteMany({ where: { id: { in: ids } } });

    console.log('✅ Limpieza completada. Noticias en "Nacionales" eliminadas.');
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

cleanupNacionales();
