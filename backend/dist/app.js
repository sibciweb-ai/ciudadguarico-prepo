"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("./config/prisma");
const auth_1 = __importDefault(require("./routes/auth"));
const news_1 = __importDefault(require("./routes/news"));
const content_1 = __importDefault(require("./routes/content"));
const sections_1 = __importDefault(require("./routes/sections"));
const media_1 = __importDefault(require("./routes/media"));
const columnista_1 = __importDefault(require("./routes/columnista"));
const editorial_1 = __importDefault(require("./routes/editorial"));
const opinion_1 = __importDefault(require("./routes/opinion"));
// Configuración de variables de entorno
dotenv_1.default.config();
// Crear aplicación Express
const app = (0, express_1.default)();
// Ruta de bienvenida para la raíz
app.get('/', (req, res) => {
    res.send('API ciudadguaricor backend funcionando 🚀');
});
// Configuración de CORS
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsEnv
    ? allowedOriginsEnv.split(',').map(s => s.trim()).filter(Boolean)
    : ['http://localhost:5173'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Permitir peticiones sin origen (como curl o same-origin a través de proxy Nginx)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    credentials: true
}));
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Servir archivos estáticos de uploads
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Inicializar base de datos y servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectar a Supabase con Prisma
        yield (0, prisma_1.initializePrisma)();
        // Rutas
        app.use('/api/auth', auth_1.default);
        app.use('/api/news', news_1.default);
        app.use('/api/noticias', news_1.default); // Alias para compatibilidad con frontend
        app.use('/api/content', content_1.default);
        app.use('/api/sections', sections_1.default);
        app.use('/api/media', media_1.default);
        app.use('/api/columnistas', columnista_1.default);
        app.use('/api/editoriales', editorial_1.default);
        app.use('/api/opiniones', opinion_1.default);
        // Manejo básico de errores
        app.use((err, req, res, next) => {
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
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
});
// Iniciar la aplicación
startServer().catch(error => {
    console.error('Error fatal al iniciar la aplicación:', error);
    process.exit(1);
});
