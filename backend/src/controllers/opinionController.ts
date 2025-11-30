import { Request, Response } from 'express';
import { getPrismaClient } from '../config/prisma';
import { generarSlug, truncarSlug } from '../utils/slug';

export class OpinionController {
  // Obtener todas las opiniones
  static async getAll(req: Request, res: Response) {
    try {
      const prisma = getPrismaClient();
      const opiniones = await prisma.opinion.findMany({
        include: { media: true, columnista: true },
        orderBy: { fecha: 'desc' }
      });
      res.json(opiniones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener opiniones' });
    }
  }

  // Obtener una opinión por ID o SLUG
  static async getById(req: Request, res: Response) {
    try {
      const prisma = getPrismaClient();
      const { id: idOrSlug } = req.params;
      
      let opinion = null;
      const isNumeric = /^\d+$/.test(idOrSlug);
      
      if (isNumeric) {
        // Buscar por ID
        opinion = await prisma.opinion.findUnique({
          where: { id: parseInt(idOrSlug) },
          include: { media: true, columnista: true }
        });
      }
      
      // Si no se encontró por ID o el parámetro no es numérico, buscar por slug
      if (!opinion) {
        opinion = await prisma.opinion.findUnique({
          where: { slug: idOrSlug },
          include: { media: true, columnista: true }
        });
      }
      
      if (!opinion) return res.status(404).json({ message: 'Opinión no encontrada' });
      res.json(opinion);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener opinión' });
    }
  }

  // Crear opinión
  static async create(req: Request, res: Response) {
    try {
      const prisma = getPrismaClient();
      const { titulo, contenido, fecha, columnistaId, destacado, mediaIds } = req.body;
      
      // Generar slug único
      let slug = truncarSlug(generarSlug(titulo));
      
      // Verificar si el slug ya existe y hacerlo único
      const existentes = await prisma.opinion.findMany({
        where: { slug: { startsWith: slug } },
        select: { slug: true }
      });
      
      if (existentes.length > 0) {
        const slugsExistentes = existentes.map(o => o.slug);
        if (slugsExistentes.includes(slug)) {
          let contador = 2;
          let slugUnico = `${slug}-${contador}`;
          while (slugsExistentes.includes(slugUnico)) {
            contador++;
            slugUnico = `${slug}-${contador}`;
          }
          slug = slugUnico;
        }
      }
      
      const opinion = await prisma.opinion.create({
        data: {
          titulo,
          slug,
          contenido,
          fecha: fecha ? new Date(fecha) : undefined,
          columnistaId: parseInt(columnistaId),
          destacado: destacado === 'true' || destacado === true,
          media: mediaIds && Array.isArray(mediaIds)
            ? { connect: mediaIds.map((id: number) => ({ id })) }
            : undefined
        },
        include: { media: true, columnista: true }
      });
      res.status(201).json(opinion);
    } catch (error) {
      console.error('Error al crear opinión:', error);
      res.status(500).json({ message: 'Error al crear opinión' });
    }
  }

  // Actualizar opinión
  static async update(req: Request, res: Response) {
    try {
      const prisma = getPrismaClient();
      const id = parseInt(req.params.id);
      const { titulo, contenido, fecha, columnistaId, destacado, mediaIds } = req.body;
      
      const updateData: any = {
        contenido,
        fecha: fecha ? new Date(fecha) : undefined,
        columnistaId: parseInt(columnistaId),
        destacado: destacado === 'true' || destacado === true,
        media: mediaIds && Array.isArray(mediaIds)
          ? { set: mediaIds.map((id: number) => ({ id })) }
          : undefined
      };
      
      // Si el título cambió, regenerar el slug
      if (titulo) {
        const opinionActual = await prisma.opinion.findUnique({ where: { id } });
        if (opinionActual && opinionActual.titulo !== titulo) {
          let slug = truncarSlug(generarSlug(titulo));
          
          const existentes = await prisma.opinion.findMany({
            where: { 
              slug: { startsWith: slug },
              id: { not: id }
            },
            select: { slug: true }
          });
          
          if (existentes.length > 0) {
            const slugsExistentes = existentes.map(o => o.slug);
            if (slugsExistentes.includes(slug)) {
              let contador = 2;
              let slugUnico = `${slug}-${contador}`;
              while (slugsExistentes.includes(slugUnico)) {
                contador++;
                slugUnico = `${slug}-${contador}`;
              }
              slug = slugUnico;
            }
          }
          
          updateData.titulo = titulo;
          updateData.slug = slug;
        }
      }
      
      const opinion = await prisma.opinion.update({
        where: { id },
        data: updateData,
        include: { media: true, columnista: true }
      });
      res.json(opinion);
    } catch (error) {
      console.error('Error al actualizar opinión:', error);
      res.status(500).json({ message: 'Error al actualizar opinión' });
    }
  }

  // Eliminar opinión
  static async delete(req: Request, res: Response) {
    try {
      const prisma = getPrismaClient();
      const id = parseInt(req.params.id);
      await prisma.opinion.delete({ where: { id } });
      res.json({ message: 'Opinión eliminada' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar opinión' });
    }
  }
}
