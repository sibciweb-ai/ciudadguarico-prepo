import { useContextoNoticias } from '../../contexts/ContextoNoticias';

export default function BarraLateral() {
  const { contenidos } = useContextoNoticias();

  // Filtrar los contenidos destacados con ubicaciones laterales (side-1, side-2, etc.) y visibles
  const contenidosSide = Array.isArray(contenidos)
    ? contenidos.filter(c => c.ubicacion?.startsWith('side-') && c.visible)
    : [];



  return (
    <aside className="space-y-6">
      {/* Enlaces Institucionales */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-guarico-blue text-white px-4 py-3">
          <h3 className="font-bold">ENLACES</h3>
        </div>
        <div className="p-4 space-y-4">
          {/* Gobernación de Guárico */}
          <a
            href="https://guarico.gob.ve/"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-90 transition-opacity"
          >
            <img
              src="/gob.png"
              alt="Gobernación de Guárico"
              className="w-full h-auto object-contain"
            />
          </a>

          {/* Canta Guárico */}
          <div className="space-y-2">
            <a
              href="https://cantaguarico.sibciguarico.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <img
                src="/cantaguarico.jpg"
                alt="Canta Guárico"
                className="w-full h-auto object-contain"
              />
            </a>

            {/* Widget de Radio con Reproductor */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <p className="text-white text-sm font-semibold mb-3">
                  🎵 Radio en Vivo
                </p>

                {/* Reproductor de Audio HTML5 con Autoplay */}
                <audio
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                  style={{ height: '40px' }}
                >
                  <source src="/radio/cantaguarico" type="audio/mpeg" />
                  Tu navegador no soporta el reproductor de audio.
                </audio>

                <p className="text-white text-xs mt-3 opacity-80">
                  91.3 FM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Relacionado (contenidos side) */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-guarico-blue text-white px-4 py-3">
          <h3 className="font-bold">Promociones</h3>
        </div>
        <div className="p-4 space-y-4">
          {contenidosSide.length === 0 ? (
            <div className="text-gray-400 text-center py-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm">No hay banners laterales disponibles</p>
              </div>
            </div>
          ) : (
            contenidosSide.map((contenido, idx) => (
              <a
                key={contenido.id || idx}
                href={contenido.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                <div className="relative">
                  <img
                    src={contenido.media}
                    alt={contenido.titulo || 'Banner lateral'}
                    className="w-full h-auto object-contain rounded-lg shadow"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div
                    className="w-full h-24 bg-gray-100 rounded-lg shadow flex items-center justify-center hidden"
                    style={{ display: 'none' }}
                  >
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-gray-500">{contenido.titulo || 'Banner'}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      {/* Espacio adicional */}
      <section className="bg-gray-100 rounded-lg p-4 text-center min-h-[600px] flex items-center justify-center">
        <div className="text-gray-400">
          <p className="text-sm">Próximamente más contenido</p>
        </div>
      </section>
    </aside>
  );
}