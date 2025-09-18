import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapImage from '@tiptap/extension-image';

interface Columnista {
  id: number;
  nombre: string;
}

interface Opinion {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  destacado: boolean;
  columnista: Columnista;
  media?: any[];
}

const GestionarOpiniones: React.FC = () => {
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [columnistas, setColumnistas] = useState<Columnista[]>([]);
  const [nuevo, setNuevo] = useState<Partial<Opinion & { columnistaId?: number }>>({});
  const [editando, setEditando] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Editor TipTap para contenido
  const editor = useEditor({
    extensions: [StarterKit, TipTapImage],
    content: '',
    onUpdate: ({ editor }) => {
      setNuevo(prev => ({ ...prev, contenido: editor.getHTML() }));
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const [opRes, colRes] = await Promise.all([
      axios.get('/api/opiniones'),
      axios.get('/api/columnistas')
    ]);
    setOpiniones(opRes.data);
    setColumnistas(colRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!nuevo.titulo || !nuevo.contenido || !nuevo.columnistaId) return;
    if (editando) {
      await axios.put(`/api/opiniones/${editando}`, nuevo);
    } else {
      await axios.post('/api/opiniones', nuevo);
    }
    setNuevo({});
    setEditando(null);
    fetchData();
  };

  const handleEdit = (op: Opinion) => {
    setNuevo({ ...op, columnistaId: op.columnista.id });
    setEditando(op.id);
    
    // Cargar contenido en el editor
    if (editor) {
      editor.commands.setContent(op.contenido || '');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar opinión?')) return;
    await axios.delete(`/api/opiniones/${id}`);
    fetchData();
  };

  return (
    <div className="panel-admin opinion-admin max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-base font-semibold">Opiniones</span>
        <span className="text-base font-normal text-gray-400">Gestión</span>
      </h2>
      <div className="form-admin grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="titulo" placeholder="Título de la opinión" value={nuevo.titulo || ''} onChange={handleChange}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400 transition" />
        <select name="columnistaId" value={nuevo.columnistaId || ''} onChange={handleChange}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400 transition">
          <option value="">Selecciona columnista</option>
          {columnistas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <input name="fecha" type="date" value={nuevo.fecha ? nuevo.fecha.slice(0,10) : ''} onChange={handleChange}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400 transition" />
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" name="destacado" checked={!!nuevo.destacado} onChange={e => setNuevo({ ...nuevo, destacado: e.target.checked })}
            className="accent-red-600 w-4 h-4" />
          Destacado
        </label>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido de la Opinión *
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
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 text-sm rounded transition-colors ${ 
                  editor?.isActive('bulletList') ? 'bg-gray-700 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                Lista
              </button>
            </div>
            
            {/* Área del editor */}
            <div className="min-h-[200px] w-full">
              <EditorContent 
                editor={editor}
                className="w-full h-full"
              />
            </div>
          </div>
          
          <style>{`
            .editor-container .ProseMirror {
              min-height: 200px !important;
              padding: 16px !important;
              font-size: 14px !important;
              line-height: 1.6 !important;
              outline: none !important;
              border: none !important;
              width: 100% !important;
              box-sizing: border-box !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
            }
            .editor-container .ProseMirror:focus {
              outline: none !important;
            }
            .editor-container .ProseMirror p {
              margin: 8px 0 !important;
            }
            .editor-container .ProseMirror h2 {
              font-size: 1.3rem !important;
              font-weight: bold !important;
              margin: 16px 0 8px 0 !important;
            }
          `}</style>
        </div>
        <div className="flex gap-3 col-span-1 md:col-span-2 mt-2">
          <button onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !nuevo.titulo || !nuevo.contenido || !nuevo.columnistaId}
          >{editando ? 'Actualizar' : 'Crear'}</button>
          {editando && (
            <button onClick={() => { setNuevo({}); setEditando(null); }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-lg border border-gray-300 transition"
            >Cancelar</button>
          )}
        </div>
      </div>
      <hr className="my-6" />
      {loading ? <p className="text-center text-gray-500">Cargando opiniones...</p> : (
        <div className="overflow-x-auto">
          <table className="tabla-admin w-full text-left border-t border-gray-200">
            <thead>
              <tr className="bg-red-50 text-red-800">
                <th className="py-3 px-4 font-semibold">Título</th>
                <th className="py-3 px-4 font-semibold">Columnista</th>
                <th className="py-3 px-4 font-semibold">Fecha</th>
                <th className="py-3 px-4 font-semibold">Destacado</th>
                <th className="py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {opiniones.map((op, idx) => (
                <tr key={op.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4 whitespace-pre-line">{op.titulo}</td>
                  <td className="py-2 px-4">{op.columnista.nombre}</td>
                  <td className="py-2 px-4">{op.fecha ? op.fecha.slice(0,10) : '-'}</td>
                  <td className="py-2 px-4">{op.destacado ? <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Sí</span> : <span className="inline-block bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">No</span>}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => handleEdit(op)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded transition"
                    >Editar</button>
                    <button onClick={() => handleDelete(op.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-1 rounded transition"
                    >Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GestionarOpiniones;
