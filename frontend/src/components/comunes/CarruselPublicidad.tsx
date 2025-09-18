import { useContextoNoticias } from '../../contexts/ContextoNoticias';

export default function CarruselContenidoDestacado() {
  const { contenidosDestacados } = useContextoNoticias();
  
  // Debug: mostrar todos los contenidos disponibles
  console.log('Contenidos destacados para carrusel:', contenidosDestacados);
  console.log('Ubicaciones disponibles:', contenidosDestacados.map(c => c.ubicacion));
  
  // Filtrar contenidos para el carrusel (solo contenidos específicos para carrusel)
  const contenidosCarrusel = contenidosDestacados.filter(cont => {
    const esTipoCarrusel = (cont as any).tipo === 'carrusel';
    const esUbicacionCarrusel = cont.ubicacion === 'carrusel';
    return esTipoCarrusel || esUbicacionCarrusel;
  }).slice(0, 7); // Límite de 7 contenidos
  
  console.log('Contenidos filtrados para carrusel:', contenidosCarrusel);
  
  if (contenidosCarrusel.length === 0) {
    const placeholders = Array(12).fill(null);
    
    return (
      <div className="h-16 md:h-20 bg-gradient-to-r from-guarico-blue to-guarico-dark-blue overflow-hidden border-b-2 border-guarico-light-blue relative">
        <div className="flex h-full animate-scroll-left-fallback">
          {placeholders.map((_, index) => (
            <div key={index} className="flex items-center justify-center flex-shrink-0" style={{ width: '200px' }}>
              <div className="h-12 w-full md:h-16 md:w-full bg-guarico-gold/20 rounded flex items-center justify-center mx-4">
                <span className="text-guarico-gold text-xs font-bold">LOGO</span>
              </div>
            </div>
          ))}
        </div>
        
        <style>{`
          @keyframes scroll-left-fallback {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-25%);
            }
          }
          
          .animate-scroll-left-fallback {
            animation: scroll-left-fallback 20s linear infinite;
            width: 400%;
          }
        `}</style>
      </div>
    );
  }

  // Crear un array muy largo para scroll verdaderamente perpetuo
  const contenidosDuplicados = Array(8).fill(contenidosCarrusel).flat();

  return (
    <div className="h-16 md:h-20 bg-gradient-to-r from-guarico-blue to-guarico-dark-blue overflow-hidden border-b-2 border-guarico-light-blue relative">
      <div className="flex h-full animate-scroll-left-perpetual">
        {contenidosDuplicados.map((contenido, index) => (
          <div key={`${contenido.id}-${index}`} className="flex items-center justify-center flex-shrink-0" style={{ width: '200px' }}>
            <img 
              src={contenido.media} 
              alt="Logo"
              className="h-12 w-full md:h-16 md:w-full object-contain px-4"
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll-left-perpetual {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll-left-perpetual {
          animation: scroll-left-perpetual 20s linear infinite;
          animation-play-state: running;
          width: 400%;
        }
      `}</style>
    </div>
  );
}