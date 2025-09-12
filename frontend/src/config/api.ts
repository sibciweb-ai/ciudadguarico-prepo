// Configuración centralizada para las URLs del API
// En despliegues con Nginx/Compose, se recomienda hacer proxy de 
// las rutas /api hacia el backend, así el frontend puede usar rutas relativas.
// Si necesitas forzar una URL absoluta, define VITE_API_BASE_URL en .env
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '';

export { API_BASE_URL };

// Helper para crear URLs completas del API
export const createApiUrl = (endpoint: string) => {
  // Asegurar que el endpoint comience con /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  // Si API_BASE_URL está vacío, usaremos rutas relativas como /api/...
  return `${API_BASE_URL}${cleanEndpoint.startsWith('/api') ? cleanEndpoint : `/api${cleanEndpoint}`}`;
};
