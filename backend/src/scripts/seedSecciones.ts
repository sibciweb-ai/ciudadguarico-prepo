import { PrismaClient } from '@prisma/client';

/**
 * Script para asegurar que TODAS las secciones existan en la BD.
 * Usa upsert para no duplicar secciones existentes.
 * 
 * Ejecutar con:
 *   npx ts-node src/scripts/seedSecciones.ts
 * 
 * En producción (Docker):
 *   docker compose exec backend npx ts-node src/scripts/seedSecciones.ts
 */

const prisma = new PrismaClient();

const SECCIONES = [
    'Gestión',
    'Municipales',
    'Deportes',
    'Salud',
    'Nacionales',
    'Cultura',
    'Producción',
    'Comunidad',
    'Seguridad',
    'Turismo',
    'Educación',
    'Política',
    'Internacionales'
];

async function seedSecciones() {
    console.log('🌱 Insertando secciones...\n');

    for (const nombre of SECCIONES) {
        const seccion = await prisma.seccion.upsert({
            where: { nombre },
            update: {},  // No actualizar si ya existe
            create: { nombre }
        });
        console.log(`  ✅ ${seccion.nombre} (id: ${seccion.id})`);
    }

    console.log(`\n🎉 ${SECCIONES.length} secciones procesadas correctamente.`);
}

seedSecciones()
    .catch((error) => {
        console.error('❌ Error al insertar secciones:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
