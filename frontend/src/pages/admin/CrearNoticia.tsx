import React, { useState, useEffect } from 'react';
import { Save, X, Image as ImageIcon } from 'lucide-react';
import { useContextoNoticias } from '../../contexts/ContextoNoticias';
import axios from 'axios';
// TipTap imports
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import NotificacionMejorada, { TipoNotificacion } from '../../components/comunes/NotificacionMejorada';

interface Props {
  onCreada: () => void;
}

interface Seccion {
  id: number;
  nombre: string;
}

export default function CrearNoticia({ onCreada }: Props) {
  // TipTap editor para el contenido
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
    onUpdate: ({ editor }) => {
      setFormulario(prev => ({ ...prev, contenido: editor.getHTML() }));
    },
  });
  
  const { agregarNoticia } = useContextoNoticias();
  const [formulario, setFormulario] = useState({
    titulo: '',
    contenido: '',
    resumen: '',
    seccion_id: '',
    autorTexto: '',
    autorFoto: '',
    leyendaImagen: '', // AGREGADO: campo para leyenda
    destacada: false
  });
  
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // AGREGADO: URL de previsualización
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [notificacion, setNotificacion] = useState<{ mensaje: string, tipo: TipoNotificacion, detalles?: string } | null>(null);

  useEffect(() => {
    axios.get('/api/sections').then(res => {
      setSecciones(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  // Limpiar URL de previsualización cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const mostrarNotificacion = (mensaje: string, tipo: TipoNotificacion, detalles?: string) => {
    setNotificacion({ mensaje, tipo, detalles });
    setTimeout(() => setNotificacion(null), 5000);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (type === 'select-one' ? String(value) : value)
    }));
  };

  // FUNCIÓN CORRECTA para manejar la imagen con previsualización y validación
  const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar tamaño (10MB máximo)
      const maxSize = 10 * 1024 * 1024; // 10MB en bytes
      if (file.size > maxSize) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        mostrarNotificacion(
          'Imagen demasiado pesada', 
          'advertencia',
          `El archivo pesa ${sizeMB}MB. El tamaño máximo permitido es 10MB. Por favor, comprime la imagen antes de subirla.`
        );
        e.target.value = ''; // Limpiar el input
        return;
      }
      
      // Validar tipo de archivo
      const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!tiposPermitidos.includes(file.type)) {
        mostrarNotificacion(
          'Tipo de archivo no válido', 
          'error',
          'Solo se permiten imágenes en formato JPG, PNG, WebP o GIF.'
        );
        e.target.value = '';
        return;
      }
      
      // Limpiar URL anterior si existe
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      // Crear nueva URL para previsualización
      const newPreviewUrl = URL.createObjectURL(file);
      setImagen(file);
      setPreviewUrl(newPreviewUrl);
      
      // Mostrar notificación de éxito
      const sizeMB = (file.size / 1024 / 1024).toFixed(2);
      mostrarNotificacion(
        'Imagen cargada correctamente', 
        'exito',
        `Archivo: ${file.name} (${sizeMB}MB)`
      );
    }
  };

  // Función para quitar imagen
  const quitarImagen = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImagen(null);
    setPreviewUrl(null);
    
    // Limpiar el input de archivo
    const fileInput = document.getElementById('imagen') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulario.titulo || !formulario.contenido || !formulario.resumen || !formulario.seccion_id || !imagen) {
      mostrarNotificacion('Por favor completa todos los campos obligatorios y selecciona una imagen', 'error');
      return;
    }
    
    let mediaIds: number[] = [];
    try {
      // Subir imagen con descripción/leyenda
      const formDataImg = new FormData();
      formDataImg.append('file', imagen);
      if (formulario.leyendaImagen.trim()) {
        formDataImg.append('descripcion', formulario.leyendaImagen);
      }
      const res = await axios.post('/api/media', formDataImg, { headers: { 'Content-Type': 'multipart/form-data' } });
      mediaIds = [res.data.id];
    } catch (err) {
      mostrarNotificacion('Error al subir la imagen', 'error');
      return;
    }
    
    const noticiaForm = new FormData();
    noticiaForm.append('titulo', formulario.titulo);
    noticiaForm.append('contenido', formulario.contenido);
    noticiaForm.append('resumen', formulario.resumen);
    noticiaForm.append('seccion_id', formulario.seccion_id);
    noticiaForm.append('autorTexto', formulario.autorTexto);
    noticiaForm.append('autorFoto', formulario.autorFoto);
    noticiaForm.append('destacada', String(formulario.destacada));
    mediaIds.forEach(id => noticiaForm.append('media', String(id)));
    
    try {
      await agregarNoticia(noticiaForm);
      mostrarNotificacion('Noticia creada exitosamente', 'exito');
      
      // Limpiar formulario
      setFormulario({
        titulo: '',
        contenido: '',
        resumen: '',
        seccion_id: '',
        autorTexto: '',
        autorFoto: '',
        leyendaImagen: '',
        destacada: false
      });
      
      quitarImagen();
      
      // Limpiar también el editor
      if (editor) {
        editor.commands.setContent('');
      }
      
      onCreada();
    } catch (error) {
      mostrarNotificacion('Error al crear la noticia', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {notificacion && (
        <NotificacionMejorada 
          mensaje={notificacion.mensaje} 
          tipo={notificacion.tipo}
          detalles={notificacion.detalles}
          onClose={() => setNotificacion(null)} 
        />
      )}
      
      {/* Estilos CSS para el editor TipTap */}
      <style>{`
        .editor-container .ProseMirror {
          min-height: 400px !important;
          padding: 16px !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          outline: none !important;
          border: none !important;
          width: 100% !important;
          box-sizing: border-box !important;
          color: #374151 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          white-space: normal !important;
          overflow-x: hidden !important;
        }
        .editor-container .ProseMirror:focus {
          outline: none !important;
          ring: none !important;
        }
        .editor-container {
          border: 1px solid #D1D5DB !important;
          border-radius: 8px !important;
          background: #ffffff !important;
          overflow: hidden !important;
          max-width: 100% !important;
        }
        .editor-container .ProseMirror p {
          margin: 8px 0 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: auto !important;
        }
        .editor-container .ProseMirror h1, 
        .editor-container .ProseMirror h2, 
        .editor-container .ProseMirror h3 {
          font-weight: bold !important;
          margin: 16px 0 8px 0 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: auto !important;
        }
        .editor-container .ProseMirror h1 { font-size: 1.5rem !important; }
        .editor-container .ProseMirror h2 { font-size: 1.3rem !important; }
        .editor-container .ProseMirror h3 { font-size: 1.1rem !important; }
        .editor-container .ProseMirror ul, 
        .editor-container .ProseMirror ol {
          margin: 8px 0 !important;
          padding-left: 20px !important;
        }
        .editor-container .ProseMirror blockquote {
          border-left: 3px solid #D1D5DB !important;
          margin: 16px 0 !important;
          padding-left: 16px !important;
          font-style: italic !important;
        }
        .editor-container .ProseMirror img {
          max-width: 100% !important;
          height: auto !important;
          margin: 16px 0 !important;
        }
      `}</style>

      <form onSubmit={manejarSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
              Título de la Noticia *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formulario.titulo}
              onChange={manejarCambio}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Escribe el título de la noticia"
              required
            />
          </div>

          <div>
            <label htmlFor="seccion_id" className="block text-sm font-medium text-gray-700 mb-2">
              Sección *
            </label>
            <select
              id="seccion_id"
              name="seccion_id"
              value={formulario.seccion_id}
              onChange={manejarCambio}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Selecciona una sección</option>
              {secciones.map((seccion) => (
                <option key={seccion.id} value={seccion.id}>
                  {seccion.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* SECCIÓN DE IMAGEN CON PREVISUALIZACIÓN MEJORADA */}
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
              Imagen de la Noticia *
            </label>
            
            {/* Si no hay imagen, mostrar input de carga estilizado */}
            {!imagen && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                   onClick={() => document.getElementById('imagen')?.click()}>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  accept="image/*"
                  onChange={manejarImagen}
                  className="hidden"
                  required
                />
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Haz clic para seleccionar una imagen
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, JPEG, WEBP (máx. 10MB)
                </p>
              </div>
            )}
            
            {/* Si hay imagen, mostrar previsualización */}
            {imagen && previewUrl && (
              <div className="space-y-4">
                <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Previsualización" 
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={quitarImagen}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors shadow-lg"
                    title="Quitar imagen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <span className="truncate font-medium">{imagen.name}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {(imagen.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* CAMPO DE LEYENDA - SE MUESTRA SIEMPRE */}
          <div className="md:col-span-2">
            <label htmlFor="leyendaImagen" className="block text-sm font-medium text-gray-700 mb-2">
              Leyenda de la imagen (opcional)
            </label>
            <input
              type="text"
              id="leyendaImagen"
              name="leyendaImagen"
              value={formulario.leyendaImagen}
              onChange={manejarCambio}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Texto que aparecerá como leyenda debajo de la imagen principal"
            />
            <p className="text-xs text-gray-500 mt-1">
              La leyenda aparecerá debajo de la imagen principal de la noticia
            </p>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="autorTexto" className="block text-sm font-medium text-gray-700 mb-2">
              Autor de Texto *
            </label>
            <input
              type="text"
              id="autorTexto"
              name="autorTexto"
              value={formulario.autorTexto}
              onChange={manejarCambio}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Nombre del autor de texto"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="autorFoto" className="block text-sm font-medium text-gray-700 mb-2">
              Autor de Foto
            </label>
            <input
              type="text"
              id="autorFoto"
              name="autorFoto"
              value={formulario.autorFoto}
              onChange={manejarCambio}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Nombre del autor de foto (opcional)"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="resumen" className="block text-sm font-medium text-gray-700 mb-2">
              Resumen/Descripción *
            </label>
            <textarea
              id="resumen"
              name="resumen"
              value={formulario.resumen}
              onChange={manejarCambio}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Breve resumen de la noticia (aparecerá en listados y vista previa)"
              maxLength={300}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formulario.resumen.length}/300 caracteres
            </p>
          </div>
        </div>

        {/* Editor de contenido */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido de la Noticia *
          </label>
          
          <div className="editor-container bg-white border border-gray-300 rounded-lg overflow-hidden">
            {/* Barra de herramientas */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 border-b flex-wrap">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`px-3 py-1 text-sm rounded transition-colors ${ 
                  editor?.isActive('bold') ? 'bg-gray-700 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                Negrita
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 text-sm rounded transition-colors ${ 
                  editor?.isActive('italic') ? 'bg-gray-700 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                Cursiva
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1 text-sm rounded transition-colors ${ 
                  editor?.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-3 py-1 text-sm rounded transition-colors ${ 
                  editor?.isActive('heading', { level: 3 }) ? 'bg-gray-700 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 text-sm rounded transition-colors ${ 
                  editor?.isActive('bulletList') ? 'bg-gray-700 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                Lista
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('input-img-editor')?.click()}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Insertar imagen
              </button>
              
              <input
                type="file"
                id="input-img-editor"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  if (!e.target.files || !e.target.files[0] || !editor) return;
                  const file = e.target.files[0];
                  
                  // Validar tamaño
                  const maxSize = 10 * 1024 * 1024; // 10MB
                  if (file.size > maxSize) {
                    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
                    mostrarNotificacion(
                      'Imagen demasiado pesada', 
                      'advertencia',
                      `El archivo pesa ${sizeMB}MB. El tamaño máximo es 10MB. Comprime la imagen antes de subirla.`
                    );
                    e.target.value = '';
                    return;
                  }
                  
                  // Validar tipo
                  const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
                  if (!tiposPermitidos.includes(file.type)) {
                    mostrarNotificacion(
                      'Tipo de archivo no válido', 
                      'error',
                      'Solo se permiten imágenes JPG, PNG, WebP o GIF.'
                    );
                    e.target.value = '';
                    return;
                  }
                  
                  const formData = new FormData();
                  formData.append('file', file);
                  // Pedir leyenda para esta imagen insertada en el contenido
                  const leyenda = window.prompt('Leyenda para esta imagen (opcional):', '') || '';
                  if (leyenda.trim()) {
                    formData.append('descripcion', leyenda.trim());
                  }
                  try {
                    const res = await fetch('/api/media', {
                      method: 'POST',
                      body: formData
                    });
                    if (!res.ok) throw new Error('Error al subir la imagen');
                    const data = await res.json();
                    if (!data.url) throw new Error('No se obtuvo la URL de la imagen');
                    // Insertar como figure con figcaption si hay leyenda
                    if (leyenda.trim()) {
                      editor.chain().focus().insertContent(
                        `<figure>
                          <img src="${data.url}" alt="${leyenda.replace(/\"/g, '&quot;')}" />
                          <figcaption>${leyenda}</figcaption>
                        </figure>`
                      ).run();
                    } else {
                      editor.chain().focus().insertContent(
                        `<figure><img src="${data.url}" alt="" /></figure>`
                      ).run();
                    }
                    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
                    mostrarNotificacion('Imagen insertada correctamente', 'exito', `${file.name} (${sizeMB}MB)`);
                  } catch (err) {
                    mostrarNotificacion('Error al subir la imagen al contenido', 'error', 'Intenta con una imagen más pequeña o en otro formato.');
                  } finally {
                    e.target.value = '';
                  }
                }}
              />
            </div>
            
            {/* Área del editor */}
            <div className="min-h-[400px] w-full overflow-hidden">
              <EditorContent 
                editor={editor}
                className="w-full h-full overflow-hidden"
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            {formulario.contenido.replace(/<[^>]+>/g, '').length}/5000 caracteres (texto)
          </p>
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="destacada"
            name="destacada"
            checked={formulario.destacada}
            onChange={manejarCambio}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="destacada" className="ml-2 block text-sm text-gray-900">
            Marcar como noticia destacada
          </label>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => {
              setFormulario({
                titulo: '',
                contenido: '',
                resumen: '',
                seccion_id: '',
                autorTexto: '',
                autorFoto: '',
                leyendaImagen: '',
                destacada: false
              });
              quitarImagen();
              if (editor) {
                editor.commands.setContent('');
              }
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={!formulario.titulo || !formulario.contenido || !formulario.resumen || !formulario.seccion_id || !imagen}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} className="mr-2" />
            Guardar Noticia
          </button>
        </div>
      </form>
    </div>
  );
}
