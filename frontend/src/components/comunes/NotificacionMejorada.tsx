import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type TipoNotificacion = 'exito' | 'error' | 'advertencia' | 'info';

interface Props {
  mensaje: string;
  tipo: TipoNotificacion;
  onClose: () => void;
  duracion?: number; // en milisegundos
  detalles?: string; // Detalles adicionales opcionales
}

export default function NotificacionMejorada({ 
  mensaje, 
  tipo, 
  onClose, 
  duracion = 5000,
  detalles 
}: Props) {
  useEffect(() => {
    if (duracion > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duracion);
      
      return () => clearTimeout(timer);
    }
  }, [duracion, onClose]);

  const estilos = {
    exito: {
      bg: 'bg-green-50 border-green-500',
      text: 'text-green-800',
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      progressBar: 'bg-green-500'
    },
    error: {
      bg: 'bg-red-50 border-red-500',
      text: 'text-red-800',
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      progressBar: 'bg-red-500'
    },
    advertencia: {
      bg: 'bg-yellow-50 border-yellow-500',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      progressBar: 'bg-yellow-500'
    },
    info: {
      bg: 'bg-blue-50 border-blue-500',
      text: 'text-blue-800',
      icon: <Info className="w-6 h-6 text-blue-600" />,
      progressBar: 'bg-blue-500'
    }
  };

  const estilo = estilos[tipo];

  return (
    <div 
      className={`fixed top-6 right-6 z-50 max-w-md w-full shadow-2xl rounded-lg border-l-4 ${estilo.bg} animate-slide-in-right`}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {estilo.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={`font-semibold ${estilo.text} mb-1`}>
              {mensaje}
            </p>
            {detalles && (
              <p className={`text-sm ${estilo.text} opacity-80`}>
                {detalles}
              </p>
            )}
          </div>
          
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${estilo.text} hover:opacity-70 transition-opacity`}
            aria-label="Cerrar notificación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Barra de progreso */}
      {duracion > 0 && (
        <div className="h-1 bg-gray-200 rounded-b-lg overflow-hidden">
          <div 
            className={`h-full ${estilo.progressBar} animate-progress`}
            style={{ 
              animation: `progress ${duracion}ms linear forwards` 
            }}
          />
        </div>
      )}
      
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </div>
  );
}
