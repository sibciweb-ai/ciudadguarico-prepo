import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { initializePrisma } from './config/prisma';
import authRoutes from './routes/auth';
import newsRoutes from './routes/news';
import contentRoutes from './routes/content';
import sectionsRoutes from './routes/sections';
import mediaRoutes from './routes/media';
import columnistaRoutes from './routes/columnista';
import editorialRoutes from './routes/editorial';
import opinionRoutes from './routes/opinion';

// Configuración de variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Ruta de bienvenida para la raíz
app.get('/', (req, res) => {
  res.send('API ciudadguaricor backend funcionando 🚀');
});

// Configuración de CORS
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(',').map(s => s.trim()).filter(Boolean)
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como curl o same-origin a través de proxy Nginx)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  credentials: true
}));



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    // Conectar a Supabase con Prisma
    await initializePrisma();

    // Rutas
    app.use('/api/auth', authRoutes);
    app.use('/api/news', newsRoutes);
    app.use('/api/noticias', newsRoutes); // Alias para compatibilidad con frontend
    app.use('/api/content', contentRoutes);
    app.use('/api/sections', sectionsRoutes);
    app.use('/api/media', mediaRoutes);
    app.use('/api/columnistas', columnistaRoutes);
    app.use('/api/editoriales', editorialRoutes);
    app.use('/api/opiniones', opinionRoutes);

    // Manejo básico de errores
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Error en el servidor:', err);
      res.status(500).json({ 
        message: 'Algo salió mal!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    });

    // Puerto configurable (default 3000)
    const PORT = parseInt(process.env.PORT || '3000', 10);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📊 Conectado a Supabase con Prisma`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer().catch(error => {
  console.error('Error fatal al iniciar la aplicación:', error);
  process.exit(1);
}); 