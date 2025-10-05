import { Noticia } from '../contexts/ContextoNoticias';

/**
 * Genera la URL para una noticia usando slug si está disponible, sino usa ID
 * @param noticia - La noticia
 * @returns URL de la noticia (ej: "/noticia/titulo-de-la-noticia" o "/noticia/123")
 */
export function obtenerUrlNoticia(noticia: Noticia | { id: string | number; slug?: string }): string {
  if (noticia.slug) {
    return `/noticia/${noticia.slug}`;
  }
  return `/noticia/${noticia.id}`;
}

/**
 * Genera el slug de un título (útil para preview antes de enviar al servidor)
 * @param titulo - El título de la noticia
 * @returns El slug generado
 */
export function generarSlugCliente(titulo: string): string {
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
