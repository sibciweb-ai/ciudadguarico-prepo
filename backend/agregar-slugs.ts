import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generarSlug(titulo: string): string {
  return titulo
    .toString()
    .normalize('NFD') // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio y final
}

function truncarSlug(slug: string, maxLength: number = 100): string {
  if (slug.length <= maxLength) return slug;
  
  // Truncar en el último guion antes del límite
  const truncado = slug.substring(0, maxLength);
  const ultimoGuion = truncado.lastIndexOf('-');
  
  if (ultimoGuion > 0) {
    return truncado.substring(0, ultimoGuion);
  }
  
  return truncado;
}

async function agregarSlugs() {
  try {
    console.log('🔍 Obteniendo todas las noticias...');
    const noticias = await prisma.noticia.findMany({
      select: {
        id: true,
        titulo: true
      }
    });

    console.log(`📰 Se encontraron ${noticias.length} noticias`);

    const slugsUsados = new Set<string>();

    for (const noticia of noticias) {
      let slug = truncarSlug(generarSlug(noticia.titulo));
      
      // Hacer el slug único si ya existe
      let contador = 2;
      let slugOriginal = slug;
      while (slugsUsados.has(slug)) {
        slug = `${slugOriginal}-${contador}`;
        contador++;
      }
      
      slugsUsados.add(slug);

      console.log(`✅ ID ${noticia.id}: "${noticia.titulo}" → "${slug}"`);
      
      await prisma.noticia.update({
        where: { id: noticia.id },
        data: { slug }
      });
    }

    console.log('\n✨ ¡Todos los slugs fueron generados exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

agregarSlugs();
