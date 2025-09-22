import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, BookOpen, ArrowLeft, MessageSquare, User } from 'lucide-react';
import axios from 'axios';
import { createApiUrl } from '../config/api';
import { obtenerImagenSeccion } from '../utils/imagenesSeccion';

interface Editorial {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  autor?: string;
}

const OpinionDetalleEditorial: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editorial, setEditorial] = React.useState<Editorial | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchEditorial = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Usar configuración centralizada de API
        let editorialData = null;
        let apiConnected = false;
        
        try {
          console.log(`🔍 Buscando editorial en: ${createApiUrl(`/api/editoriales/${id}`)}`);
          const response = await axios.get(createApiUrl(`/api/editoriales/${id}`));
          editorialData = response.data;
          apiConnected = true;
          console.log('✅ Editorial encontrado:', editorialData);
        } catch (apiError: any) {
          console.log(`❌ Error en API:`, apiError.message);
        }
        
        if (apiConnected && editorialData) {
          setEditorial(editorialData);
        } else {
          throw new Error('No se pudo conectar a la API o el editorial no existe');
        }
        
      } catch (err: any) {
        console.error('Error cargando editorial:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEditorial();
  }, [id]);

  if (loading) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-lg text-gray-600">Cargando editorial...</div>;
  }
  if (error || !editorial) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-lg text-gray-600">{error || 'Editorial no encontrado.'}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link to="/opinion/editoriales" className="inline-flex items-center text-guarico-blue mb-6 hover:underline">
        <ArrowLeft className="h-5 w-5 mr-2" /> Volver a Editoriales
      </Link>
      
      {/* Header del Editorial */}
      <div
        className="relative rounded-lg mb-8 h-28 sm:h-32 md:h-36 lg:h-40 flex items-end"
        style={{
          backgroundImage: `url('${obtenerImagenSeccion('Editorial')}')`,
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
                to="/opinion/editoriales"
                className="text-white/80 hover:text-white transition-colors duration-300 drop-shadow-md"
              >
                Editoriales
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido del Editorial */}
      <article className="bg-white rounded-lg shadow-lg p-8 opinion-container">
        <div className="prose prose-lg max-w-none content-text">
          <h1 className="text-4xl font-bold leading-tight text-black">{editorial.titulo}</h1>
          <div className="flex items-center space-x-6 text-black/70 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(editorial.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            {editorial.autor && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{editorial.autor}</span>
              </div>
            )}
          </div>
          
          {editorial.contenido.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed opinion-content break-words mb-6 text-justify">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Footer del Editorial */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Publicado el {new Date(editorial.fecha).toLocaleDateString('es-ES')}
              {editorial.autor && ` por ${editorial.autor}`}
            </div>
            <div className="text-sm text-guarico-blue font-medium">
              Diario Ciudad Guárico
            </div>
          </div>
        </div>
      </article>
      
      {/* Navegación relacionada */}
      <div className="mt-8 text-center">
        <Link 
          to="/opinion/editoriales" 
          className="inline-flex items-center px-6 py-3 bg-guarico-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Ver más editoriales
        </Link>
      </div>
    </div>
  );
};

export default OpinionDetalleEditorial;
