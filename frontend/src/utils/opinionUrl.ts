export interface Opinion {
  id: string | number;
  slug?: string;
}

/**
 * Genera la URL para una opinión usando slug si está disponible, sino usa ID
 * @param opinion - La opinión
 * @returns URL de la opinión (ej: "/opinion/articulo/titulo-de-la-opinion" o "/opinion/articulo/123")
 */
export function obtenerUrlOpinion(opinion: Opinion): string {
  if (opinion.slug) {
    return `/opinion/articulo/${opinion.slug}`;
  }
  return `/opinion/articulo/${opinion.id}`;
}
