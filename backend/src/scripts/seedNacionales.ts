import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedNacionales() {
  try {
    console.warn('⛔ Seed de "Nacionales" deshabilitado. Cargue las noticias desde el panel de administración.');
    return; // Evitar crear registros de ejemplo

    // No-op intencional

  } catch (error) {
    console.error('❌ Error al insertar noticias de Nacionales:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedNacionales();