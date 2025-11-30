import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Instagram, MessageCircle, X } from 'lucide-react';
import axios from 'axios';
import { createApiUrl } from '../config/api';
import { obtenerImagenSeccion } from '../utils/imagenesSeccion';
import SEOHead from '../components/seo/SEOHead';

interface Opinion {
  id: number;
  titulo: string;
  slug?: string;
  contenido: string;
  fecha: string;
  destacado: boolean;
  columnista: {
    id: number;
    nombre: string;
    bio: string;
    fotoUrl?: string;
  };
  media?: Array<{
    url: string;
    tipo: string;
    descripcion?: string;
  }>;
}

const OpinionDetalleArticulo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [opinion, setOpinion] = useState<Opinion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpinion = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Cargando opinión: ${createApiUrl(`/opiniones/${id}`)}`);
        const response = await axios.get(createApiUrl(`/opiniones/${id}`));
        setOpinion(response.data);
        console.log('✅ Opinión cargada:', response.data);
        
      } catch (err: any) {
        console.error('❌ Error cargando opinión:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpinion();
  }, [id]);

  const compartirEnRedes = (red: string) => {
    if (!opinion) return;
    
    const url = window.location.href;
    const texto = opinion.titulo;
    
    switch (red) {
      case 'instagram':
        navigator.clipboard.writeText(`${texto} ${url}`);
        alert('Enlace copiado al portapapeles. Puedes pegarlo en Instagram.');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'x':
        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`, '_blank');
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-guarico-blue mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !opinion) {
    return <Navigate to="/opinion" replace />;
  }

  const imagenPrincipal = opinion.media?.find(m => m.tipo === 'imagen')?.url || '';
  const leyendaImagen = opinion.media?.find(m => m.tipo === 'imagen')?.descripcion || '';

  return (
    <>
      <SEOHead
        title={`${opinion.titulo} - ${opinion.columnista.nombre} - Ciudad Guárico`}
        description={opinion.contenido.replace(/<[^>]+>/g, '').substring(0, 160)}
        keywords={`opinión, ${opinion.columnista.nombre}, columnista, Ciudad Guárico, Venezuela, Guárico`}
        image={imagenPrincipal || opinion.columnista.fotoUrl || 'https://ciudadguarico.com/logo.png'}
        url={window.location.href}
        type="article"
        publishedTime={new Date(opinion.fecha).toISOString()}
        author={opinion.columnista.nombre}
        section="Opinión"
        tags={['Opinión', 'Columnista', opinion.columnista.nombre]}
      />

      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Breadcrumb con imagen de fondo */}
        <div
          className="relative rounded-lg mb-8 h-28 sm:h-32 md:h-36 lg:h-40 flex items-end"
          style={{
            backgroundImage: `url('${obtenerImagenSeccion('Columnistas')}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative px-4 pb-3 z-10 w-full">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm">
                <Link 
                  to="/opinion"
                  className="text-white/80 hover:text-white transition-colors duration-300 flex items-center drop-shadow-md"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Opinión
                </Link>
                <span className="text-white/60">/</span>
                <Link 
                  to="/opinion/columnistas"
                  className="text-white/80 hover:text-white transition-colors duration-300 drop-shadow-md"
                >
                  Columnistas
                </Link>
                <span className="text-white/60">/</span>
                <Link 
                  to={`/opinion/columnistas/${opinion.columnista.id}`}
                  className="text-white/80 hover:text-white transition-colors duration-300 drop-shadow-md"
                >
                  {opinion.columnista.nombre}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del artículo */}
        <article className="bg-white rounded-lg shadow-lg p-8">
          {/* Imagen principal si existe */}
          {imagenPrincipal && (
            <div className="mb-6">
              <img
                src={imagenPrincipal}
                alt={opinion.titulo}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              {leyendaImagen && (
                <p className="text-sm text-gray-600 mt-2 italic">{leyendaImagen}</p>
              )}
            </div>
          )}

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {opinion.titulo}
          </h1>

          {/* Información del columnista */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <Link to={`/opinion/columnistas/${opinion.columnista.id}`} className="flex-shrink-0">
              {opinion.columnista.fotoUrl ? (
                <img 
                  src={opinion.columnista.fotoUrl} 
                  alt={opinion.columnista.nombre}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 hover:border-guarico-blue transition-colors"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-guarico-blue to-blue-600 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-white font-bold text-2xl">
                    {opinion.columnista.nombre.charAt(0)}
                  </span>
                </div>
              )}
            </Link>
            
            <div className="flex-1">
              <Link 
                to={`/opinion/columnistas/${opinion.columnista.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-guarico-blue transition-colors"
              >
                {opinion.columnista.nombre}
              </Link>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(opinion.fecha).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            {/* Botones de compartir */}
            <div className="flex items-center space-x-2">
              <Share2 size={16} className="text-gray-500" />
              <button
                onClick={() => compartirEnRedes('instagram')}
                className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                title="Compartir en Instagram"
              >
                <Instagram size={14} />
              </button>
              <button
                onClick={() => compartirEnRedes('facebook')}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Compartir en Facebook"
              >
                <Facebook size={14} />
              </button>
              <button
                onClick={() => compartirEnRedes('x')}
                className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                title="Compartir en X (Twitter)"
              >
                <X size={14} />
              </button>
              <button
                onClick={() => compartirEnRedes('whatsapp')}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                title="Compartir en WhatsApp"
              >
                <MessageCircle size={14} />
              </button>
            </div>
          </div>

          {/* Contenido del artículo */}
          <div className="mt-6">
            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
              dangerouslySetInnerHTML={{ __html: opinion.contenido }}
            />
          </div>

          {/* Badge de destacado */}
          {opinion.destacado && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium text-sm">
                ⭐ Artículo Destacado
              </span>
            </div>
          )}
        </article>

        {/* Volver al perfil del columnista */}
        <div className="mt-8">
          <Link 
            to={`/opinion/columnistas/${opinion.columnista.id}`}
            className="inline-flex items-center text-guarico-blue hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Ver más artículos de {opinion.columnista.nombre}
          </Link>
        </div>
      </div>
    </>
  );
};

export default OpinionDetalleArticulo;
