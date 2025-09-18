import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Newspaper, Users, BookOpen, Radio, Mail } from 'lucide-react';
import { useContextoNoticias } from '../../contexts/ContextoNoticias';

export default function PiePagina() {
  const { noticias } = useContextoNoticias();
  
  // Obtener noticias recientes para el footer
  const noticiasRecientes = noticias
    .sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime())
    .slice(0, 3);

  const secciones = [
    { nombre: 'Gestión', icono: Users },
    { nombre: 'Municipales', icono: MapPin },
    { nombre: 'Deportes', icono: Users },
    { nombre: 'Cultura', icono: BookOpen },
    { nombre: 'Salud', icono: Users },
    { nombre: 'Nacionales', icono: Newspaper },
    { nombre: 'Producción', icono: Users },
    { nombre: 'Comunidad', icono: Users },
    { nombre: 'Seguridad', icono: Users },
    { nombre: 'Turismo', icono: MapPin },
    { nombre: 'Educación', icono: BookOpen }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-16">
      {/* Sección superior del footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Información principal */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/logo.png" alt="Ciudad Guárico" className="h-12 w-auto mr-4" />
              <h3 className="text-3xl font-bold font-serif">
                Ciudad <span className="text-guarico-gold">Guárico</span>
              </h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              El periódico digital líder de Venezuela. Información veraz, oportuna y de calidad 
              para mantener informada a la comunidad guariceña y nacional.
            </p>


            {/* Redes sociales */}
            <div>
              <h5 className="text-lg font-semibold mb-3 text-guarico-gold">Síguenos</h5>
              <div className="flex space-x-4">
                <a href="https://facebook.com/ciudadguarico" target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors" 
                   aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com/ciudadguarico" target="_blank" rel="noopener noreferrer" 
                   className="bg-sky-500 hover:bg-sky-600 p-3 rounded-full transition-colors"
                   aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://instagram.com/ciudadguarico" target="_blank" rel="noopener noreferrer" 
                   className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors"
                   aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com/@ciudadguarico" target="_blank" rel="noopener noreferrer" 
                   className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors"
                   aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Secciones */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-guarico-gold flex items-center">
              <Newspaper className="mr-2" size={20} />
              Secciones
            </h4>
            <ul className="space-y-3">
              {secciones.slice(0, 6).map((seccion) => (
                <li key={seccion.nombre}>
                  <Link 
                    to={`/seccion/${seccion.nombre}`} 
                    className="text-gray-300 hover:text-guarico-gold transition-colors flex items-center group"
                  >
                    <seccion.icono size={16} className="mr-2 group-hover:text-guarico-gold" />
                    {seccion.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Más secciones */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-guarico-gold flex items-center">
              <BookOpen className="mr-2" size={20} />
              Más Secciones
            </h4>
            <ul className="space-y-3">
              {secciones.slice(6).map((seccion) => (
                <li key={seccion.nombre}>
                  <Link 
                    to={`/seccion/${seccion.nombre}`} 
                    className="text-gray-300 hover:text-guarico-gold transition-colors flex items-center group"
                  >
                    <seccion.icono size={16} className="mr-2 group-hover:text-guarico-gold" />
                    {seccion.nombre}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/opinion" 
                  className="text-gray-300 hover:text-guarico-gold transition-colors flex items-center group"
                >
                  <Users size={16} className="mr-2 group-hover:text-guarico-gold" />
                  Opinión
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contacto y noticias recientes */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-guarico-gold flex items-center">
              <Mail className="mr-2" size={20} />
              Contacto
            </h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-guarico-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">San Juan de los Morros</p>
                  <p className="text-gray-400 text-xs">Estado Guárico, Venezuela</p>
                </div>
              </div>
              

              <div className="flex items-start space-x-3">
                <Radio size={18} className="text-guarico-gold mt-1 flex-shrink-0" />
                <div>
                  <a href="https://zeno.fm/radio/cantaguarico-91-3fm/" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-300 text-sm hover:text-guarico-gold transition-colors">
                    Canta Guárico 91.3 FM
                  </a>
                </div>
              </div>
            </div>

            {/* Noticias recientes */}
            <div>
              <h5 className="text-lg font-semibold mb-3 text-guarico-gold">Últimas Noticias</h5>
              <div className="space-y-3">
                {noticiasRecientes.map((noticia) => (
                  <Link 
                    key={noticia.id}
                    to={`/noticia/${noticia.id}`}
                    className="block group"
                  >
                    <h6 className="text-gray-300 text-sm group-hover:text-guarico-gold transition-colors line-clamp-2">
                      {noticia.titulo}
                    </h6>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES')}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Línea divisoria */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-gray-300 text-lg font-medium mb-2">
                &copy; 2025 Ciudad Guárico. Todos los derechos reservados.
              </p>
              <p className="text-guarico-gold text-base font-semibold">
                Desarrollado por el equipo de SIBCI Guárico
              </p>
            </div>
        </div>
      </div>
    </footer>
  );
}
