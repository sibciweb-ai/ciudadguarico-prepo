/**
 * Genera un slug URL-friendly a partir de un texto
 * Ejemplo: "¡Hola Mundo!" -> "hola-mundo"
 */
export function generarSlug(texto: string): string {
  return texto
    .toString()
    .normalize('NFD') // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos (tildes, acentos)
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios al inicio y final
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio y final
}

/**
 * Genera un slug único agregando un sufijo numérico si es necesario
 * Ejemplo: si "hola-mundo" ya existe, retorna "hola-mundo-2"
 */
export function generarSlugUnico(baseSlug: string, existentes: string[]): string {
  let slug = baseSlug;
  let contador = 1;
  
  while (existentes.includes(slug)) {
    contador++;
    slug = `${baseSlug}-${contador}`;
  }
  
  return slug;
}

/**
 * Trunca un slug si es demasiado largo (máximo 100 caracteres)
 */
export function truncarSlug(slug: string, maxLength: number = 100): string {
  if (slug.length <= maxLength) {
    return slug;
  }
  
  // Truncar y eliminar palabras incompletas
  const truncado = slug.substring(0, maxLength);
  const ultimoGuion = truncado.lastIndexOf('-');
  
  if (ultimoGuion > 0) {
    return truncado.substring(0, ultimoGuion);
  }
  
  return truncado;
}
