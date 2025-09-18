import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, BookOpen, MessageSquare } from 'lucide-react';
import axios from 'axios';

interface Editorial {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  autor?: string;
}

interface Columnista {
  id: number;
  nombre: string;
  bio: string;
  fotoUrl?: string;
  articulos?: Opinion[];
}

interface Opinion {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  columnista: Columnista;
  destacado: boolean;
}

interface Noticia {
  id: number;
  titulo: string;
  fecha_publicacion: string;
  seccion: { nombre: string };
}

const OpinionPage: React.FC = () => {
  const [editoriales, setEditoriales] = useState<Editorial[]>([]);
  const [columnistas, setColumnistas] = useState<Columnista[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [editorialesRes, columnistasRes, noticiasRes] = await Promise.all([
          axios.get('/api/editoriales'),
          axios.get('/api/columnistas'),
          axios.get('/api/noticias?limit=5')
        ]);
        setEditoriales(editorialesRes.data);
        setColumnistas(columnistasRes.data);
        setNoticias(noticiasRes.data);
      } catch (error) {
        console.error('Error fetching opinion data:', error);
        // Datos de ejemplo si falla la API
        setEditoriales([
          {
            id: 1,
            titulo: "Reflexiones sobre el futuro de nuestra región",
            contenido: "En estos tiempos de cambio, es fundamental que como sociedad reflexionemos sobre el rumbo que queremos tomar. La participación ciudadana y el compromiso con el desarrollo sostenible son claves para construir un mejor mañana.",
            fecha: "2024-01-15",
            autor: "Redacción Editorial"
          },
          {
            id: 2,
            titulo: "La importancia de la educación en el desarrollo local",
            contenido: "La educación sigue siendo la herramienta más poderosa para transformar nuestra realidad. Invertir en educación de calidad es invertir en el futuro de nuestras comunidades.",
            fecha: "2024-01-12",
            autor: "Redacción Editorial"
          },
          {
            id: 3,
            titulo: "Desarrollo económico y sostenibilidad",
            contenido: "El crecimiento económico debe ir de la mano con la protección del medio ambiente y la justicia social.",
            fecha: "2024-01-10",
            autor: "Redacción Editorial"
          }
        ]);
        setColumnistas([
          {
            id: 1,
            nombre: "María González",
            bio: "Periodista especializada en política y análisis social con más de 15 años de experiencia.",
            fotoUrl: "https://via.placeholder.com/150x150?text=MG"
          },
          {
            id: 2,
            nombre: "Carlos Rodríguez",
            bio: "Analista económico y columnista de opinión enfocado en temas de desarrollo regional.",
            fotoUrl: "https://via.placeholder.com/150x150?text=CR"
          },
          {
            id: 3,
            nombre: "Ana Martínez",
            bio: "Escritora y columnista cultural, especialista en literatura latinoamericana.",
            fotoUrl: "https://via.placeholder.com/150x150?text=AM"
          },
          {
            id: 4,
            nombre: "Luis Pérez",
            bio: "Columnista deportivo y analista de la actualidad deportiva regional.",
            fotoUrl: "https://via.placeholder.com/150x150?text=LP"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columnistasVisibles = mostrarTodos ? columnistas : columnistas.slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-guarico-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando contenido de opinión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/backgroun-secciones.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Accent bar */}
        <div className="h-1.5 w-full bg-guarico-blue/90"></div>
        {/* Light overlay in front of image */}
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2 text-black">Opinión</h1>
            <p className="text-xl text-black/80 max-w-3xl mx-auto">
              Análisis, reflexiones y perspectivas sobre los temas que nos importan
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sección Editorial */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <BookOpen className="mr-3 h-8 w-8 text-guarico-blue" />
                Editorial
              </h2>
              <Link 
                to="/opinion/editoriales" 
                className="bg-guarico-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver todos
              </Link>
            </div>
            
            {editoriales.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border p-8 mb-6 hover:shadow-xl transition-shadow opinion-container">
                <h3 className="text-2xl font-bold text-gray-900 opinion-title break-words mb-4 opinion-title break-words">
                  {editoriales[0].titulo}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg opinion-content break-words">
                  {editoriales[0].contenido.substring(0, 250)}...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(editoriales[0].fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <Link 
                    to={`/opinion/editoriales/${editoriales[0].id}`}
                    className="text-guarico-blue hover:text-blue-700 font-medium"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {editoriales.slice(1, 4).map((editorial) => (
                <div key={editorial.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow opinion-container">
                  <h4 className="font-semibold text-gray-900 mb-2 opinion-title break-words text-lg opinion-title break-words">
                    {editorial.titulo}
                  </h4>
                  <p className="text-gray-600 mb-3 text-sm opinion-content break-words">
                    {editorial.contenido.substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(editorial.fecha).toLocaleDateString('es-ES')}
                    </div>
                    <Link 
                      to={`/opinion/editoriales/${editorial.id}`}
                      className="text-guarico-blue hover:text-blue-700 text-sm font-medium"
                    >
                      Leer →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección Columnistas */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <User className="mr-3 h-8 w-8 text-guarico-blue" />
                Columnistas
              </h2>
              <Link 
                to="/opinion/columnistas" 
                className="bg-guarico-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver todos
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {columnistasVisibles.map((columnista) => (
                <Link 
                  key={columnista.id} 
                  to={`/opinion/columnistas/${columnista.id}`}
                  className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1 group"
                >
                  <div className="mb-4">
                    {columnista.fotoUrl ? (
                      <img
                        src={columnista.fotoUrl}
                        alt={columnista.nombre}
                        className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-gray-200 group-hover:border-guarico-blue transition-colors"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-guarico-blue flex items-center justify-center mx-auto group-hover:bg-blue-700 transition-colors">
                        <span className="text-white font-bold text-lg">
                          {columnista.nombre.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 opinion-title break-words group-hover:text-guarico-blue transition-colors">
                    {columnista.nombre}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {columnista.bio.substring(0, 80)}...
                  </p>
                </Link>
              ))}
            </div>
            
            {columnistas.length > 6 && (
              <button
                onClick={() => setMostrarTodos(!mostrarTodos)}
                className="w-full bg-white border-2 border-guarico-blue text-guarico-blue rounded-lg px-6 py-3 hover:bg-guarico-blue hover:text-white transition-colors flex items-center justify-center font-medium"
              >
                {mostrarTodos ? 'Ver menos columnistas' : 'Ver más columnistas'}
              </button>
            )}
          </div>
        </div>
        
        {/* Sidebar Minuto a Minuto */}
        <div className="mt-16">
          <div className="bg-white rounded-xl shadow-lg border p-8 opinion-container">
            <h3 className="text-2xl font-bold text-gray-900 opinion-title break-words mb-6 flex items-center opinion-title">
              <MessageSquare className="mr-3 h-6 w-6 text-guarico-blue" />
              Minuto a Minuto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {noticias.slice(0, 4).map((noticia, index) => {
                const colors = ['border-guarico-blue', 'border-green-500', 'border-purple-500', 'border-orange-500'];
                const hoverColors = ['group-hover:text-guarico-blue', 'group-hover:text-green-600', 'group-hover:text-purple-600', 'group-hover:text-orange-600'];
                return (
                  <Link 
                    key={noticia.id} 
                    to={`/noticia/${noticia.id}`}
                    className={`border-l-4 ${colors[index]} pl-4 hover:bg-gray-50 p-3 rounded-r-lg transition-all duration-300 cursor-pointer group`}
                  >
                    <h4 className={`font-semibold text-gray-900 mb-2 opinion-title break-words ${hoverColors[index]} transition-colors`}>
                      {noticia.titulo}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES')} • {noticia.seccion.nombre}
                    </p>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link 
                to="/"
                className="inline-flex items-center text-guarico-blue hover:text-blue-700 font-medium transition-colors group"
              >
                <span className="mr-2">Ver todas las actualizaciones</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpinionPage;
