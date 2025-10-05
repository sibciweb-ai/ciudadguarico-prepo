import { PrismaClient } from '@prisma/client';
import { generarSlug, truncarSlug } from '../utils/slug';

const prisma = new PrismaClient();

async function generateSlugs() {
  try {
    console.log('🔄 Generando slugs para noticias existentes...\n');
    
    // Obtener todas las noticias
    const noticias = await prisma.noticia.findMany({
      select: {
        id: true,
        titulo: true,
        slug: true
      }
    });
    
    console.log(`📊 Total de noticias en la base de datos: ${noticias.length}\n`);
    
    // Filtrar noticias sin slug o con slug vacío
    const noticiasSinSlug = noticias.filter(n => !n.slug || n.slug.trim() === '');
    
    if (noticiasSinSlug.length === 0) {
      console.log('✅ Todas las noticias ya tienen slug asignado.');
      await prisma.$disconnect();
      return;
    }
    
    console.log(`🔧 Noticias que necesitan slug: ${noticiasSinSlug.length}\n`);
    
    let actualizadas = 0;
    let errores = 0;
    
    for (const noticia of noticiasSinSlug) {
      try {
        // Generar slug base
        let slug = truncarSlug(generarSlug(noticia.titulo));
        
        // Verificar si el slug ya existe
        const slugsExistentes = await prisma.noticia.findMany({
          where: {
            slug: {
              startsWith: slug
            }
          },
          select: { id: true, slug: true }
        });
        
        // Si el slug ya existe y no es de esta noticia, hacerlo único
        const slugsEnUso = slugsExistentes
          .filter(n => n.id !== noticia.id)
          .map(n => n.slug);
        
        if (slugsEnUso.includes(slug)) {
          // Agregar contador
          let contador = 2;
          let slugUnico = `${slug}-${contador}`;
          
          while (slugsEnUso.includes(slugUnico)) {
            contador++;
            slugUnico = `${slug}-${contador}`;
          }
          
          slug = slugUnico;
          console.log(`⚠️  Slug duplicado detectado, usando: ${slug}`);
        }
        
        // Actualizar la noticia con el slug
        await prisma.noticia.update({
          where: { id: noticia.id },
          data: { slug }
        });
        
        actualizadas++;
        console.log(`✅ ID ${noticia.id}: "${noticia.titulo.substring(0, 50)}${noticia.titulo.length > 50 ? '...' : ''}" → ${slug}`);
        
      } catch (error) {
        errores++;
        console.error(`❌ Error procesando noticia ID ${noticia.id}:`, error);
      }
    }
    
    console.log(`\n📈 Resumen:`);
    console.log(`   ✅ Noticias actualizadas: ${actualizadas}`);
    console.log(`   ❌ Errores: ${errores}`);
    console.log(`\n✨ ¡Proceso completado!`);
    
  } catch (error) {
    console.error('❌ Error general:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el script
generateSlugs()
  .then(() => {
    console.log('\n👋 Script finalizado correctamente.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
