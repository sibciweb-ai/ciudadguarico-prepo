import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, User, Camera, Share2, Facebook, Twitter, Apple as WhatsApp } from 'lucide-react';
import { useContextoNoticias, Noticia } from '../contexts/ContextoNoticias';
import axios from 'axios';
import { createApiUrl } from '../config/api';
import SEOHead from '../components/seo/SEOHead';

export default function VistaNoticia() {
  const { id } = useParams<{ id: string }>();
  const { obtenerNoticiaPorId, noticias } = useContextoNoticias();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  
  if (!id) return <Navigate to="/" replace />;

  useEffect(() => {
    const cargarNoticia = async () => {
      setCargando(true);
      setError(false);
      
      // Primero intentar obtener de las noticias ya cargadas
      const noticiaLocal = obtenerNoticiaPorId(id);
      if (noticiaLocal) {
        setNoticia(noticiaLocal);
        setCargando(false);
        return;
      }
      
      // Si no está en las noticias locales, cargar desde el backend
      try {
        const response = await axios.get(createApiUrl(`/news/${id}`));
        const noticiaData = response.data;
        
        // Formatear la noticia igual que en el contexto
        const noticiaFormateada: Noticia = {
          id: noticiaData.id,
          titulo: noticiaData.titulo,
          contenido: noticiaData.contenido,
          resumen: noticiaData.resumen,
          seccion: noticiaData.seccion,
          autorTexto: noticiaData.autorTexto,
          autorFoto: noticiaData.autorFoto,
          media: (noticiaData.media || []).map((m: any) => ({
            ...m,
            url: m.url
          })),
          fecha_publicacion: noticiaData.fecha_publicacion,
          destacada: noticiaData.destacada,
          created_at: noticiaData.created_at,
          updated_at: noticiaData.updated_at
        };
        
        setNoticia(noticiaFormateada);
      } catch (error) {
        console.error('Error al cargar noticia:', error);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    cargarNoticia();
  }, [id, obtenerNoticiaPorId]);
  
  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-guarico-blue mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando noticia...</p>
        </div>
      </div>
    );
  }
  
  if (error || !noticia) return <Navigate to="/" replace />;

  // Función para convertir fecha a Date si es string
  const convertirFecha = (fecha: Date | string): Date => {
    if (fecha instanceof Date) {
      return fecha;
    }
    return new Date(fecha);
  };

  // Obtener la imagen principal desde media
  const mediaPrincipal = noticia.media?.find(m => m.tipo === 'imagen');
  const imagenPrincipal = mediaPrincipal?.url || '';
  const leyendaImagen = mediaPrincipal?.descripcion || '';
  // Obtener nombre de la sección
  const nombreSeccion = noticia.seccion?.nombre || '';

  // Obtener noticias relacionadas de la misma sección
  const noticiasRelacionadas = noticias
    .filter(n => n.seccion?.id === noticia.seccion?.id && n.id !== noticia.id)
    .slice(0, 3);

  const compartirEnRedes = (red: string) => {
    const url = window.location.href;
    const texto = noticia.titulo;
    
    switch (red) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`, '_blank');
        break;
    }
  };

  return (
    <>
      {/* SEO dinámico para cada noticia */}
      <SEOHead
        title={`${noticia.titulo} - Ciudad Guárico`}
        description={noticia.resumen || noticia.contenido.replace(/<[^>]+>/g, '').substring(0, 160)}
        keywords={`${nombreSeccion}, ${noticia.titulo}, Ciudad Guárico, noticias Venezuela, Guárico, ${noticia.autorTexto}`}
        image={imagenPrincipal || 'https://ciudadguarico.com/logo.png'}
        url={window.location.href}
        type="article"
        publishedTime={new Date(noticia.fecha_publicacion).toISOString()}
        modifiedTime={new Date(noticia.updated_at || noticia.fecha_publicacion).toISOString()}
        author={noticia.autorTexto}
        section={nombreSeccion}
        tags={[nombreSeccion, 'Venezuela', 'Guárico', 'noticias']}
      />
      
      <div className="p-6">
        {/* Imagen principal */}
      <div className="relative mb-6">
        <img
          src={imagenPrincipal}
          alt={noticia.titulo}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        <span className="absolute top-4 left-4 bg-guarico-blue text-guarico-white px-3 py-1 text-sm rounded-lg shadow-lg">
          {nombreSeccion}
        </span>
      </div>
      {leyendaImagen && (
        <p className="text-sm text-gray-600 -mt-4 mb-4 italic text-left">
          {leyendaImagen}
        </p>
      )}

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight font-serif">
        {noticia.titulo}
      </h1>
      
      {/* Metadatos y compartir */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-gray-600 border-b border-gray-200 pb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-guarico-blue" />
            <span>{convertirFecha(noticia.fecha_publicacion).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          {noticia.autorTexto && (
            <div className="flex items-center">
              <User size={16} className="mr-2 text-guarico-blue" />
              <span><span className="font-semibold">Redacción por</span> {noticia.autorTexto}</span>
            </div>
          )}
          {noticia.autorFoto && (
            <div className="flex items-center">
              <Camera size={16} className="mr-2 text-guarico-blue" />
              <span><span className="font-semibold">Fotografía por</span> {noticia.autorFoto}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Share2 size={16} className="text-gray-500" />
          <span className="text-xs text-gray-500 mr-2">Compartir:</span>
          <button
            onClick={() => compartirEnRedes('facebook')}
            className="p-2 bg-guarico-blue text-guarico-white rounded-lg hover:bg-guarico-light-blue transition-colors"
            title="Compartir en Facebook"
          >
            <Facebook size={14} />
          </button>
          <button
            onClick={() => compartirEnRedes('twitter')}
            className="p-2 bg-guarico-green text-guarico-white rounded-lg hover:bg-guarico-light-green transition-colors"
            title="Compartir en Twitter"
          >
            <Twitter size={14} />
          </button>
          <button
            onClick={() => compartirEnRedes('whatsapp')}
            className="p-2 bg-guarico-gold text-guarico-black rounded-lg hover:bg-guarico-light-gold transition-colors"
            title="Compartir en WhatsApp"
          >
            <WhatsApp size={14} />
          </button>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium border-l-4 border-guarico-blue pl-4 italic">
          <span className="summary-text">{noticia.resumen}</span>
        </p>
        
        <div className="text-gray-800 leading-relaxed space-y-4 noticia-individual">
  {/* Renderizar el contenido como HTML enriquecido (incluyendo imágenes) */}
  <div
    className="prose prose-lg max-w-none"
    dangerouslySetInnerHTML={{ __html: noticia.contenido }}
  />
</div>
      </div>

      {/* Noticias relacionadas */}
      {noticiasRelacionadas.length > 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Más noticias de {nombreSeccion}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {noticiasRelacionadas.map((noticiaRel) => {
              const imagenRel = noticiaRel.media?.find(m => m.tipo === 'imagen')?.url || '';
              return (
                <Link
                  key={noticiaRel.id}
                  to={`/noticia/${noticiaRel.id}`}
                  className="block hover:bg-white p-3 rounded-lg transition-colors"
                >
                  <img
                    src={imagenRel}
                    alt={noticiaRel.titulo}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 hover:text-guarico-blue transition-colors">
                    {noticiaRel.titulo}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {convertirFecha(noticiaRel.fecha_publicacion).toLocaleDateString('es-ES')}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </>
  );
}