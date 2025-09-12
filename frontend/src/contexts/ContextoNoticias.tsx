import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { createApiUrl } from '../config/api';
import { useContextoAuth } from './ContextoAuth';

export interface Noticia {
  id: string | number;
  titulo: string;
  contenido: string;
  resumen: string;
  seccion: {
    id: number;
    nombre: string;
  } | null;
  autorTexto: string;
  autorFoto: string;
  media: { url: string; tipo: string; descripcion?: string }[];
  fecha_publicacion: Date | string;
  destacada?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Publicidad {
  id: string | number;
  imagen: string;
  url?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  descripcion?: string;
  posicion: string;
  visible?: boolean;
  tipo: 'carrusel' | 'sidebar' | 'header' | string; // Tipo de publicidad
}

export interface ContenidoDestacado {
  id: string | number;
  media: string; // antes: imagen
  url?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  titulo?: string; // antes: descripcion
  ubicacion: string; // antes: posicion
  visible?: boolean;
}

interface ContextoNoticiasType {
  noticias: Noticia[];
  publicidades: Publicidad[];
  contenidosDestacados: ContenidoDestacado[];
  contenidos: ContenidoDestacado[]; // Alias para compatibilidad con ContextoContenido
  agregarNoticia: (formData: FormData) => Promise<void>;
  editarNoticia: (id: string, noticia: Partial<Noticia>) => Promise<void>;
  eliminarNoticia: (id: string) => Promise<void>;
  agregarPublicidad: (publicidad: Omit<Publicidad, 'id'>) => void;
  eliminarPublicidad: (id: string) => void;
  agregarContenidoDestacado: (contenido: Omit<ContenidoDestacado, 'id'>) => void;
  eliminarContenidoDestacado: (id: string) => void;
  obtenerNoticiasPorSeccion: (seccion: string) => Promise<Noticia[]>;
  obtenerNoticiaPorId: (id: string) => Noticia | undefined;
  setTerminoBusqueda: (termino: string) => void;
  cargandoBusqueda: boolean;
  cargarNoticias: () => Promise<void>;
  cargarContenidos: () => Promise<void>; // Alias para compatibilidad
}

const ContextoNoticias = createContext<ContextoNoticiasType | undefined>(undefined);

// Publicidades iniciales para que el carrusel funcione mientras se cargan los banners
const publicidadesIniciales: Publicidad[] = [
  {
    id: '1',
    imagen: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=400',
    posicion: 'header-bg',
    descripcion: 'Banco Regional Guárico',
    visible: true,
    tipo: 'header'
  },
  {
    id: '2',
    imagen: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
    posicion: 'main-1',
    descripcion: 'Supermercados El Llano',
    visible: true,
    tipo: 'sidebar'
  }
];


// Usar createApiUrl para componer endpoints; no se requiere constante local

export function ProveedorContextoNoticias({ children }: { children: ReactNode }) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [publicidades, setPublicidades] = useState<Publicidad[]>(publicidadesIniciales);
  const [contenidosDestacados, setContenidosDestacados] = useState<ContenidoDestacado[]>([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const { token } = useContextoAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Cargar contenidos destacados activos y visibles desde el backend
  const cargarContenidosDestacados = async () => {
    try {
      console.log('Cargando contenidos destacados desde:', createApiUrl('/content/contenido-destacado'));
      const response = await axios.get(createApiUrl('/content/contenido-destacado'));
      console.log('Respuesta de contenidos destacados:', response.data);
      
      // Cargar todos los contenidos destacados del backend
      const contenidosDelBackend = response.data.map((c: any) => ({
        ...c,
        media: c.media, // URL directa de Cloudinary
        // Agregar campos necesarios para el carrusel
        titulo: c.titulo,
        ubicacion: c.ubicacion,
        tipo: c.ubicacion === 'carrusel' ? 'carrusel' : 'banner'
      }));
      
      console.log('Contenidos destacados procesados:', contenidosDelBackend);
      setContenidosDestacados(contenidosDelBackend);
    } catch (error) {
      console.error('Error al cargar contenidos destacados:', error);
      // Mantener los contenidos iniciales si hay error
    }
  };


  // Función para cargar todas las noticias
  const cargarNoticias = async () => {
    try {
      const response = await axios.get(createApiUrl('/news'));
      const noticiasMapeadas = response.data.map((noticia: any) => ({
        id: noticia.id,
        titulo: noticia.titulo,
        contenido: noticia.contenido,
        resumen: noticia.resumen,
        seccion: noticia.seccion,
        autorTexto: noticia.autorTexto,
        autorFoto: noticia.autorFoto,
        media: (noticia.media || []).map((m: any) => ({
          ...m,
          url: m.url // URL directa de Cloudinary
        })),
        fecha_publicacion: noticia.fecha_publicacion,
        destacada: noticia.destacada,
        created_at: noticia.created_at,
        updated_at: noticia.updated_at
      }));
      setNoticias(noticiasMapeadas || []);
    } catch (error) {
      setNoticias([]);
    }
  };

  // Cargar contenidos destacados al inicializar
  useEffect(() => {
    cargarNoticias();
    cargarContenidosDestacados();
  }, []);

  // Búsqueda global en el backend en tiempo real (autosuggest)
  React.useEffect(() => {
    let cancelado = false;
    const buscarNoticias = async () => {
      if (terminoBusqueda.trim().length === 0) {
        setCargandoBusqueda(true);
        await cargarNoticias();
        setCargandoBusqueda(false);
        return;
      }
      setCargandoBusqueda(true);
      try {
        const response = await axios.get(createApiUrl(`/news?search=${encodeURIComponent(terminoBusqueda)}`));
        if (!cancelado) {
          const noticiasMapeadas = response.data.map((noticia: any) => ({
            id: noticia.id,
            titulo: noticia.titulo,
            contenido: noticia.contenido,
            resumen: noticia.resumen,
            seccion: noticia.seccion,
            autorTexto: noticia.autorTexto,
            autorFoto: noticia.autorFoto,
            media: (noticia.media || []).map((m: any) => ({
              ...m,
              url: m.url // URL directa de Cloudinary
            })),
            fecha_publicacion: noticia.fecha_publicacion,
            destacada: noticia.destacada,
            created_at: noticia.created_at,
            updated_at: noticia.updated_at
          }));
          setNoticias(noticiasMapeadas || []);
        }
      } catch (error) {
        if (!cancelado) setNoticias([]);
      } finally {
        if (!cancelado) setCargandoBusqueda(false);
      }
    };
    const timeout = setTimeout(buscarNoticias, 250);
    return () => clearTimeout(timeout);
  }, [terminoBusqueda]);

  // Todas las funciones y variables exportadas deben estar declaradas antes del return

  // ... (todas las funciones ya están declaradas aquí) ...

  // El return del provider debe ir al final, después de todas las funciones


  // Cambiado para aceptar FormData
  const agregarNoticia = async (formData: FormData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      const response = await axios.post(createApiUrl('/news'), formData, config);
      // Procesar la imagen de la noticia recién creada
      const noticiaConImagen = {
        ...response.data,
        imagen: response.data.imagen // URL directa de Cloudinary
      };
      setNoticias(prev => [noticiaConImagen, ...prev]);
    } catch (error) {
      console.error('Error al agregar noticia:', error);
      throw error;
    }
  };

  const editarNoticia = async (id: string, cambios: Partial<Noticia>) => {
    try {
      await axios.put(createApiUrl(`/news/${id}`), cambios, config);
      await cargarNoticias(); // Refresca el estado con los datos reales del backend
    } catch (error) {
      console.error('Error al editar noticia:', error);
      throw error;
    }
  };

  const eliminarNoticia = async (id: string) => {
    try {
      await axios.delete(createApiUrl(`/news/${id}`), config);
    setNoticias(prev => prev.filter(noticia => noticia.id !== id));
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
      throw error;
    }
  };

  const agregarPublicidad = (nuevaPublicidad: Omit<Publicidad, 'id'>) => {
    const publicidad: Publicidad = {
      ...nuevaPublicidad,
      id: Date.now().toString(),
    };
    setPublicidades(prev => [publicidad, ...prev]);
  };

  const eliminarPublicidad = (id: string) => {
    setPublicidades(prev => prev.filter(pub => pub.id !== id));
  };

  const agregarContenidoDestacado = (nuevoContenido: Omit<ContenidoDestacado, 'id'>) => {
    const contenido: ContenidoDestacado = {
      ...nuevoContenido,
      id: Date.now().toString(),
    };
    setContenidosDestacados(prev => [contenido, ...prev]);
  };

  const eliminarContenidoDestacado = (id: string) => {
    setContenidosDestacados(prev => prev.filter(cont => cont.id !== id));
  };

  const obtenerNoticiasPorSeccion = async (seccion: string): Promise<Noticia[]> => {
    try {
      const response = await axios.get(createApiUrl(`/news/section/${seccion}`));
      return response.data.map((noticia: any) => ({
        id: noticia.id,
        titulo: noticia.titulo,
        contenido: noticia.contenido,
        resumen: noticia.resumen,
        seccion: noticia.seccion,
        autorTexto: noticia.autorTexto,
        autorFoto: noticia.autorFoto,
        media: (noticia.media || []).map((m: any) => ({
          ...m,
          url: m.url
        })),
        fecha_publicacion: noticia.fecha_publicacion,
        destacada: noticia.destacada,
        created_at: noticia.created_at,
        updated_at: noticia.updated_at
      }));
    } catch (error) {
      return [];
    }
  };

  const obtenerNoticiaPorId = (id: string) => {
    return noticias.find(n => n.id === id || n.id === Number(id));
  };

  // Nota: el filtrado se realiza desde el backend mediante query param ?search=

  return (
    <ContextoNoticias.Provider value={{
      noticias,
      publicidades,
      contenidosDestacados,
      contenidos: contenidosDestacados, // Alias para compatibilidad
      agregarNoticia,
      editarNoticia,
      eliminarNoticia,
      agregarPublicidad,
      eliminarPublicidad,
      agregarContenidoDestacado,
      eliminarContenidoDestacado,
      obtenerNoticiasPorSeccion,
      obtenerNoticiaPorId,
      setTerminoBusqueda,
      cargandoBusqueda,
      cargarNoticias,
      cargarContenidos: cargarContenidosDestacados // Alias para compatibilidad
    }}>
      {children}
    </ContextoNoticias.Provider>
  );
}

export function useContextoNoticias() {
  const contexto = useContext(ContextoNoticias);
  if (contexto === undefined) {
    throw new Error('useContextoNoticias debe usarse dentro de ProveedorContextoNoticias');
  }
  return contexto;
}