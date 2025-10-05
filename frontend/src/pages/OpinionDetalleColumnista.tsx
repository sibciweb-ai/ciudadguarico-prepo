import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { createApiUrl } from '../config/api';
import { obtenerImagenSeccion } from '../utils/imagenesSeccion';

interface Opinion {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  destacado: boolean;
}

interface Columnista {
  id: number;
  nombre: string;
  bio: string;
  fotoUrl?: string;
  redes?: any;
  opiniones: Opinion[];
}

const OpinionDetalleColumnista: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [columnista, setColumnista] = React.useState<Columnista | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchColumnista = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Usar configuración centralizada de API
        let columnistaData = null;
        let apiConnected = false;
        
        try {
          console.log(`🔍 Buscando columnista en: ${createApiUrl(`/api/columnistas/${id}`)}`);
          const response = await axios.get(createApiUrl(`/api/columnistas/${id}`));
          columnistaData = response.data;
          apiConnected = true;
          console.log('✅ Columnista encontrado:', columnistaData);
        } catch (apiError: any) {
          console.log(`❌ Error en API:`, apiError.message);
        }
        
        if (apiConnected && columnistaData) {
          setColumnista(columnistaData);
        } else {
          throw new Error('No se pudo conectar a la API o el columnista no existe');
        }
        
      } catch (err: any) {
        console.error('Error cargando columnista:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    
    fetchColumnista();
  }, [id]);

  if (loading) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-lg text-gray-600">Cargando columnista...</div>;
  }
  if (error || !columnista) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-lg text-gray-600">{error || 'Columnista no encontrado.'}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Link to="/opinion/columnistas" className="inline-flex items-center text-guarico-blue mb-6 hover:underline">
        <ArrowLeft className="h-5 w-5 mr-2" /> Volver a Columnistas
      </Link>
      
      {/* Header del Columnista */}
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
            {/* El título ya está incluido en la imagen de fondo */}
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Perfil del Columnista */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Foto del columnista */}
          <div className="flex-shrink-0">
            {columnista.fotoUrl ? (
              <img 
                src={columnista.fotoUrl} 
                alt={columnista.nombre}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-guarico-blue to-blue-600 flex items-center justify-center border-4 border-gray-200">
                <span className="text-white font-bold text-4xl">
                  {columnista.nombre.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          {/* Información del columnista */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{columnista.nombre}</h1>
            <p className="text-gray-700 leading-relaxed mb-6">{columnista.bio}</p>
            
            {/* Redes sociales si están disponibles */}
            {columnista.redes && (
              <div className="flex flex-wrap gap-4">
                {columnista.redes.twitter && (
                  <a href={columnista.redes.twitter} target="_blank" rel="noopener noreferrer"
                     className="text-black/70 hover:text-black transition-colors">
                    📱 Twitter
                  </a>
                )}
                {columnista.redes.email && (
                  <a href={`mailto:${columnista.redes.email}`}
                     className="text-black/70 hover:text-black transition-colors">
                    📧 Email
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Artículos del Columnista */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Artículos de {columnista.nombre}
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({columnista.opiniones?.length || 0} {columnista.opiniones?.length === 1 ? 'artículo' : 'artículos'})
          </span>
        </h2>
        
        {columnista.opiniones && columnista.opiniones.length > 0 ? (
          <div className="space-y-6">
            {columnista.opiniones.map((opinion) => (
              <article key={opinion.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow opinion-container">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 opinion-title break-words hover:text-guarico-blue transition-colors opinion-title break-words">
                    {opinion.titulo}
                  </h3>
                  {opinion.destacado && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                      Destacado
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(opinion.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                
                <div className="prose prose-gray max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed opinion-content line-clamp-6"
                    dangerouslySetInnerHTML={{ 
                      __html: opinion.contenido.length > 300 
                        ? opinion.contenido.replace(/<[^>]+>/g, '').substring(0, 300) + '...' 
                        : opinion.contenido.replace(/<[^>]+>/g, '').substring(0, 300) + '...'
                    }}
                  />
                </div>
                
                {opinion.contenido.length > 300 && (
                  <Link 
                    to={`/opinion/articulo/${opinion.id}`}
                    className="mt-4 inline-block text-guarico-blue hover:text-blue-700 font-medium transition-colors"
                  >
                    Leer más →
                  </Link>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No hay artículos disponibles</h3>
            <p className="text-gray-500">Este columnista aún no ha publicado ningún artículo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpinionDetalleColumnista;
