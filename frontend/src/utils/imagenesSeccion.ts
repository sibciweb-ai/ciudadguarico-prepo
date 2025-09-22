// Mapeo de secciones con sus imágenes de fondo específicas
export const obtenerImagenSeccion = (seccion: string): string => {
  const mapeoImagenes: { [key: string]: string } = {
    'Gestión': '/gestion.jpg',
    'Municipales': '/municipales.jpg',
    'Deportes': '/deporte.jpg',
    'Salud': '/salud.jpg',
    'Nacionales': '/nacionales.JPG',
    'Cultura': '/cultura.jpg',
    'Producción': '/produccion.jpg',
    'Comunidad': '/comunidad.jpg',
    'Seguridad': '/seguridad.JPG',
    'Turismo': '/turismo.jpg',
    'Educación': '/educacion.JPG',
    'Opinión': '/opinion.jpg',
    'Editorial': '/editorial.jpg',
    'Columnistas': '/columnistas.jpg',
    'Cantaguarico': '/cantaguarico.jpg'
  };

  // Retorna la imagen específica de la sección o una imagen por defecto
  return mapeoImagenes[seccion] || '/backgroun-secciones.jpg';
};

// Lista de secciones válidas (mantenemos la consistencia con PaginaSeccion.tsx)
export const seccionesValidas = [
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
  'Educación'
];
