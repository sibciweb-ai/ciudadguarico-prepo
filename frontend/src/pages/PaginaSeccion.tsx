import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useContextoNoticias, Noticia } from '../contexts/ContextoNoticias';
import { Calendar, Clock } from 'lucide-react';
import { obtenerImagenSeccion } from '../utils/imagenesSeccion';
import SEOHead from '../components/seo/SEOHead';

const seccionesValidas = ['Gestión', 'Municipales', 'Deportes', 'Salud', 'Nacionales', 'Cultura', 'Producción', 'Comunidad', 'Seguridad', 'Turismo', 'Educación']; // CORREGIDO: "Produccion" -> "Producción"

// Gradientes por sección (no usado actualmente porque el encabezado usa imagen de fondo)

export default function PaginaSeccion() {
  const { seccion } = useParams<{ seccion: string }>();
  const { obtenerNoticiasPorSeccion } = useContextoNoticias();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  
  // Función para convertir fecha a Date si es string
  const convertirFecha = (fecha: Date | string): Date => {
    if (fecha instanceof Date) {
      return fecha;
    }
    return new Date(fecha);
  };
  
  if (!seccion || !seccionesValidas.includes(seccion)) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        setCargando(true);
        const noticiasSeccion = await obtenerNoticiasPorSeccion(seccion);
        setNoticias(noticiasSeccion);
      } catch (error) {
        console.error('Error al cargar noticias de la sección:', error);
        setNoticias([]);
      } finally {
        setCargando(false);
      }
    };

    cargarNoticias();
  }, [seccion, obtenerNoticiasPorSeccion]);
  
  // Nota: el gradiente por sección se ha desactivado temporalmente al usar imagen de fondo

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title={`${seccion} - Ciudad Guárico`}
        description={`Las últimas noticias de ${seccion} en Ciudad Guárico. Mantente informado con las noticias más relevantes de ${seccion.toLowerCase()}.`}
        keywords={`${seccion}, noticias ${seccion.toLowerCase()}, Ciudad Guárico, Venezuela, Guárico`}
        section={seccion}
      />
      {/* Encabezado de la sección */}
      <div
        className={`relative w-full h-32 sm:h-40 md:h-48 lg:h-56`}
        style={{
          backgroundImage: `url('${obtenerImagenSeccion(seccion)}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* El título y subtítulo ya están incluidos en la imagen de fondo */}
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Grid de noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cargando ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando noticias...</p>
            </div>
          ) : noticias.length > 0 ? (
            noticias.map((noticia) => {
              // Obtener la imagen principal desde media
              const imagenPrincipal = noticia.media?.find(m => m.tipo === 'imagen')?.url || '';
              return (
                <Link 
                  key={noticia.id}
                  to={`/noticia/${noticia.id}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  {/* Imagen */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={imagenPrincipal}
                      alt={noticia.titulo}
                    />
                  </div>
                  {/* Contenido */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar size={16} className="text-gray-400" />
                      <time>{convertirFecha(noticia.fecha_publicacion).toLocaleDateString()}</time>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {noticia.titulo}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      <span className="summary-text line-clamp-3">{noticia.resumen}</span>
                    </p>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <time className="text-gray-500">
                          {convertirFecha(noticia.fecha_publicacion).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </time>
                      </div>
                      <span className="text-gray-600">
                        {noticia.autorTexto}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-600 text-lg">
                No hay noticias disponibles en la sección {seccion}
              </p>
            </div>
          )}
        </div>

        {/* Barra Lateral */}
        <aside className="hidden lg:block fixed right-4 top-[calc(var(--header-height)+2rem)] w-80">
          <div className="space-y-6">
            {/* Aquí se renderizará automáticamente la BarraLateral desde el LayoutPublico */}
          </div>
        </aside>
      </div>
    </div>
  );
}
