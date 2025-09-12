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
const express_1 = require("express");
const prisma_1 = require("../config/prisma");
const upload_1 = require("../middleware/upload");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// TODO: Implementar rutas de contenido
router.get('/', (req, res) => {
    res.json({ message: 'Rutas de contenido' });
});
// Obtener todos los contenidos destacados
router.get('/contenido-destacado', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ubicacion, activos } = req.query;
        const prisma = (0, prisma_1.getPrismaClient)();
        let where = {};
        if (ubicacion) {
            where.ubicacion = ubicacion;
        }
        if (activos === 'true') {
            const hoy = new Date();
            where.AND = [
                {
                    OR: [
                        { fechaInicio: null },
                        { fechaInicio: { lte: hoy } }
                    ]
                },
                {
                    OR: [
                        { fechaFin: null },
                        { fechaFin: { gte: hoy } }
                    ]
                }
            ];
        }
        const contenidos = yield prisma.contenidoDestacado.findMany({ where });
        res.json(contenidos);
    }
    catch (error) {
        console.error('Error al obtener contenidos destacados:', error);
        res.status(500).json({ message: 'Error al obtener los contenidos destacados' });
    }
}));
// Subir contenido destacado
router.post('/contenido-destacado', upload_1.uploadContenido.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            return res.status(400).json({ message: 'No se subió ningún archivo' });
        const { url, fecha_inicio, fecha_fin, titulo, ubicacion } = req.body;
        const prisma = (0, prisma_1.getPrismaClient)();
        if (!ubicacion)
            return res.status(400).json({ message: 'La ubicación es obligatoria' });
        // Con almacenamiento local, construimos una URL servida por Express (/uploads)
        const media = `/uploads/${req.file.filename}`;
        const contenido = yield prisma.contenidoDestacado.create({
            data: {
                media,
                url,
                fechaInicio: fecha_inicio ? new Date(fecha_inicio) : null,
                fechaFin: fecha_fin ? new Date(fecha_fin) : null,
                titulo,
                ubicacion,
                visible: true
            }
        });
        res.status(201).json(contenido);
    }
    catch (error) {
        console.error('Error al crear contenido destacado:', error);
        res.status(500).json({ message: 'Error al crear el contenido destacado', error: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
// Editar contenido destacado
router.put('/contenido-destacado/:id', upload_1.uploadContenido.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        const contenido = yield prisma.contenidoDestacado.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!contenido)
            return res.status(404).json({ message: 'Contenido destacado no encontrado' });
        const { url, fecha_inicio, fecha_fin, titulo, ubicacion } = req.body;
        const updateData = {};
        if (ubicacion)
            updateData.ubicacion = ubicacion;
        if (url !== undefined)
            updateData.url = url;
        if (fecha_inicio !== undefined)
            updateData.fechaInicio = fecha_inicio ? new Date(fecha_inicio) : null;
        if (fecha_fin !== undefined)
            updateData.fechaFin = fecha_fin ? new Date(fecha_fin) : null;
        if (titulo !== undefined)
            updateData.titulo = titulo;
        if (req.file)
            updateData.media = `/uploads/${req.file.filename}`; // URL pública local
        const updatedContenido = yield prisma.contenidoDestacado.update({
            where: { id: parseInt(req.params.id) },
            data: updateData
        });
        res.json(updatedContenido);
    }
    catch (error) {
        console.error('Error al actualizar contenido destacado:', error);
        res.status(500).json({ message: 'Error al actualizar el contenido destacado' });
    }
}));
// Eliminar contenido destacado
router.delete('/contenido-destacado/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        // Buscar el contenido destacado antes de eliminarlo
        const contenido = yield prisma.contenidoDestacado.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!contenido) {
            return res.status(404).json({ message: 'Contenido destacado no encontrado' });
        }
        // Intentar eliminar archivo local si existe
        const imageUrl = contenido.media; // e.g., /uploads/filename
        // Eliminar el contenido de la base de datos
        yield prisma.contenidoDestacado.delete({ where: { id: parseInt(req.params.id) } });
        // Eliminar imagen local de forma asíncrona
        if (imageUrl && imageUrl.startsWith('/uploads/')) {
            const absPath = path_1.default.join(__dirname, '../../', imageUrl);
            fs_1.default.unlink(absPath, (err) => {
                if (err) {
                    console.warn('No se pudo eliminar archivo local:', absPath, err.message);
                }
                else {
                    console.log('Archivo local eliminado:', absPath);
                }
            });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar contenido destacado:', error);
        res.status(500).json({ message: 'Error al eliminar el contenido destacado' });
    }
}));
exports.default = router;
