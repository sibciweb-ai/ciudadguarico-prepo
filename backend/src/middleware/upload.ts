import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Directorio de uploads local (sirve archivos estáticos desde app.ts con /uploads)
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Almacenamiento local en disco con conversión selectiva
const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const nameWithoutExt = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const originalExt = path.parse(file.originalname).ext.toLowerCase();
    
    // Preservar GIFs y WebPs, convertir otros formatos
    if (file.mimetype === 'image/gif' || file.mimetype === 'image/webp') {
      cb(null, `${timestamp}-${nameWithoutExt}${originalExt}`);
    } else {
      // Convertir JPG y PNG a WebP
      cb(null, `${timestamp}-${nameWithoutExt}.webp`);
    }
  }
});

// Filtro de archivos mejorado
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes JPG, PNG, GIF y WebP.'));
  }
};

// Middleware personalizado para convertir imágenes a WebP (excepto GIFs)
export const convertToWebP = async (req: any, res: any, next: any) => {
  if (!req.file) {
    return next();
  }

  const inputPath = req.file.path;
  
  // No convertir GIFs ni WebPs
  if (req.file.mimetype === 'image/gif' || req.file.mimetype === 'image/webp') {
    return next();
  }

  const timestamp = Date.now();
  const nameWithoutExt = path.parse(req.file.originalname).name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const outputFilename = `${timestamp}-${nameWithoutExt}.webp`;
  const outputPath = path.join(uploadsDir, outputFilename);

  try {
    // Importación dinámica para compatibilidad con ESM de sharp en entorno CommonJS
    const sharpLib = (await import('sharp')).default;
    await sharpLib(inputPath)
      .webp({ quality: 85, effort: 4 }) // Calidad 85% con optimización nivel 4
      .toFile(outputPath);

    // Eliminar archivo original
    fs.unlink(inputPath, (err) => {
      if (err) console.warn('Error eliminando archivo temporal:', err);
    });

    // Actualizar información del archivo en req.file
    req.file.filename = outputFilename;
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    console.error('Error convirtiendo imagen a WebP:', error);
    // Si falla la conversión, continuar con el archivo original
    next();
  }
};

// Configuración de multer para noticias con almacenamiento local
export const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Configuración de multer para contenido destacado con almacenamiento local
export const uploadContenido = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});
