import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, User, Camera, Share2, Facebook, Twitter, Apple as WhatsApp } from 'lucide-react';
import { useContextoNoticias } from '../contexts/ContextoNoticias';

export default function VistaNoticia() {
  const { id } = useParams<{ id: string }>();
  const { obtenerNoticiaPorId, noticias } = useContextoNoticias();
  
  if (!id) return <Navigate to="/" replace />;
  
  const noticia = obtenerNoticiaPorId(id);
  
  if (!noticia) return <Navigate to="/" replace />;

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
  // Obtener autores como string
  const autores = [noticia.autorTexto, noticia.autorFoto].filter(Boolean).join(' / ');
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
        {leyendaImagen && (
          <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-sm p-2 rounded">
            {leyendaImagen}
          </div>
        )}
          {nombreSeccion}
        </span>
      </div>

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
  );
}