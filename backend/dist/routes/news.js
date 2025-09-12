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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../config/prisma");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Obtener todas las noticias (con búsqueda global)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        const search = req.query.search ? String(req.query.search).toLowerCase() : '';
        let news;
        if (search) {
            news = yield prisma.noticia.findMany({
                include: {
                    seccion: true,
                    noticiaMedia: {
                        include: {
                            media: true
                        }
                    }
                },
                orderBy: { fechaPublicacion: 'desc' }
            });
            news = news.filter(n => n.titulo.toLowerCase().includes(search) ||
                n.resumen.toLowerCase().includes(search) ||
                n.contenido.toLowerCase().includes(search) ||
                n.autorTexto.toLowerCase().includes(search) ||
                n.autorFoto.toLowerCase().includes(search));
        }
        else {
            news = yield prisma.noticia.findMany({
                include: {
                    seccion: true,
                    noticiaMedia: {
                        include: {
                            media: true
                        }
                    }
                },
                orderBy: { fechaPublicacion: 'desc' }
            });
        }
        const formatted = news.map(n => {
            var _a;
            return ({
                id: n.id,
                titulo: n.titulo,
                contenido: n.contenido,
                resumen: n.resumen,
                seccion: n.seccion ? { id: n.seccion.id, nombre: n.seccion.nombre } : null,
                autorTexto: n.autorTexto,
                autorFoto: n.autorFoto,
                media: ((_a = n.noticiaMedia) === null || _a === void 0 ? void 0 : _a.map(nm => {
                    var _a, _b, _c;
                    return ({
                        url: (_a = nm.media) === null || _a === void 0 ? void 0 : _a.url,
                        tipo: (_b = nm.media) === null || _b === void 0 ? void 0 : _b.tipo,
                        descripcion: (_c = nm.media) === null || _c === void 0 ? void 0 : _c.descripcion
                    });
                })) || [],
                destacada: n.destacada,
                fecha_publicacion: n.fechaPublicacion,
                created_at: n.createdAt,
                updated_at: n.updatedAt
            });
        });
        res.json(formatted);
    }
    catch (error) {
        console.error('Error al obtener noticias:', error);
        res.status(500).json({ message: 'Error al obtener las noticias' });
    }
}));
// Obtener noticias por sección (por nombre)
router.get('/section/:seccion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        const section = yield prisma.seccion.findFirst({ where: { nombre: req.params.seccion } });
        if (!section)
            return res.status(404).json({ message: 'Sección no encontrada' });
        const news = yield prisma.noticia.findMany({
            where: { seccionId: section.id },
            include: {
                seccion: true,
                noticiaMedia: {
                    include: {
                        media: true
                    }
                }
            },
            orderBy: { fechaPublicacion: 'desc' }
        });
        const formatted = news.map(n => {
            var _a;
            return ({
                id: n.id,
                titulo: n.titulo,
                contenido: n.contenido,
                resumen: n.resumen,
                seccion: n.seccion ? { id: n.seccion.id, nombre: n.seccion.nombre } : null,
                autorTexto: n.autorTexto,
                autorFoto: n.autorFoto,
                media: ((_a = n.noticiaMedia) === null || _a === void 0 ? void 0 : _a.map(nm => { var _a, _b, _c; return ({ url: (_a = nm.media) === null || _a === void 0 ? void 0 : _a.url, tipo: (_b = nm.media) === null || _b === void 0 ? void 0 : _b.tipo, descripcion: (_c = nm.media) === null || _c === void 0 ? void 0 : _c.descripcion }); })) || [],
                destacada: n.destacada,
                fecha_publicacion: n.fechaPublicacion,
                created_at: n.createdAt,
                updated_at: n.updatedAt
            });
        });
        res.json(formatted);
    }
    catch (error) {
        console.error('Error al obtener noticias por sección:', error);
        res.status(500).json({ message: 'Error al obtener las noticias de la sección' });
    }
}));
// Obtener noticia por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        const noticia = yield prisma.noticia.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                seccion: true,
                noticiaMedia: {
                    include: {
                        media: true
                    }
                }
            }
        });
        if (!noticia)
            return res.status(404).json({ message: 'Noticia no encontrada' });
        const formatted = {
            id: noticia.id,
            titulo: noticia.titulo,
            contenido: noticia.contenido,
            resumen: noticia.resumen,
            seccion: noticia.seccion ? { id: noticia.seccion.id, nombre: noticia.seccion.nombre } : null,
            autorTexto: noticia.autorTexto,
            autorFoto: noticia.autorFoto,
            media: ((_a = noticia.noticiaMedia) === null || _a === void 0 ? void 0 : _a.map(nm => { var _a, _b, _c; return ({ url: (_a = nm.media) === null || _a === void 0 ? void 0 : _a.url, tipo: (_b = nm.media) === null || _b === void 0 ? void 0 : _b.tipo, descripcion: (_c = nm.media) === null || _c === void 0 ? void 0 : _c.descripcion }); })) || [],
            destacada: noticia.destacada,
            fecha_publicacion: noticia.fechaPublicacion,
            created_at: noticia.createdAt,
            updated_at: noticia.updatedAt
        };
        res.json(formatted);
    }
    catch (error) {
        console.error('Error al obtener noticia por ID:', error);
        res.status(500).json({ message: 'Error al obtener la noticia' });
    }
}));
// Crear noticia
router.post('/', upload_1.upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        // Normalizar datos para aceptar FormData
        let { titulo, contenido, resumen, seccion_id, autorTexto, autorFoto, media, destacada, fecha_publicacion } = req.body;
        console.log('REQ.BODY:', req.body);
        // Convertir seccion_id a número
        if (typeof seccion_id === 'string')
            seccion_id = parseInt(seccion_id);
        // Convertir destacada a booleano
        if (typeof destacada === 'string')
            destacada = destacada === 'true' || destacada === '1';
        // Convertir media a array de números
        if (typeof media === 'string')
            media = [media];
        if (Array.isArray(media))
            media = media.map(id => parseInt(id));
        // Validar campos obligatorios
        if (!titulo || !contenido || !resumen || !seccion_id || !autorTexto || !autorFoto) {
            console.error('Faltan campos:', { titulo, contenido, resumen, seccion_id, autorTexto, autorFoto });
            return res.status(400).json({ message: 'Faltan campos obligatorios', detalle: { titulo, contenido, resumen, seccion_id, autorTexto, autorFoto } });
        }
        const seccion = yield prisma.seccion.findUnique({ where: { id: seccion_id } });
        if (!seccion) {
            console.error('Sección no válida:', seccion_id);
            return res.status(400).json({ message: 'Sección no válida' });
        }
        // Si se marca como destacada, verificar el límite de 3
        if (!!destacada) {
            const noticiasDestacadas = yield prisma.noticia.findMany({
                where: { destacada: true },
                orderBy: { fechaPublicacion: 'asc' }, // Más antigua primero
                select: { id: true }
            });
            // Si ya hay 3 destacadas, quitar la más antigua
            if (noticiasDestacadas.length >= 3) {
                yield prisma.noticia.update({
                    where: { id: noticiasDestacadas[0].id },
                    data: { destacada: false }
                });
            }
        }
        const noticia = yield prisma.noticia.create({
            data: {
                titulo,
                contenido,
                resumen,
                seccion: { connect: { id: seccion_id } },
                autorTexto,
                autorFoto,
                destacada: !!destacada,
                fechaPublicacion: fecha_publicacion ? new Date(fecha_publicacion) : undefined
            },
            include: {
                seccion: true,
                noticiaMedia: {
                    include: {
                        media: true
                    }
                }
            }
        });
        // Asociar media
        if (Array.isArray(media)) {
            for (const media_id of media) {
                const mediaItem = yield prisma.media.findUnique({ where: { id: media_id } });
                if (mediaItem) {
                    yield prisma.noticiaMedia.create({
                        data: {
                            noticiaId: noticia.id,
                            mediaId: mediaItem.id
                        }
                    });
                }
            }
        }
        // Devolver noticia con relaciones
        res.status(201).json(noticia);
    }
    catch (error) {
        console.error('Error al crear noticia:', error);
        let errorMsg = '';
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        else if (typeof error === 'object' && error && 'message' in error) {
            errorMsg = error.message;
        }
        else {
            errorMsg = String(error);
        }
        res.status(500).json({ message: 'Error al crear la noticia', error: errorMsg });
    }
}));
// Editar noticia
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        const noticia = yield prisma.noticia.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!noticia)
            return res.status(404).json({ message: 'Noticia no encontrada' });
        const { titulo, contenido, resumen, seccion_id, autorTexto, autorFoto, media, destacada, fecha_publicacion } = req.body;
        const updateData = {};
        if (seccion_id) {
            const seccion = yield prisma.seccion.findUnique({ where: { id: seccion_id } });
            if (!seccion)
                return res.status(400).json({ message: 'Sección no válida' });
            updateData.seccionId = seccion_id;
        }
        if (autorTexto !== undefined)
            updateData.autorTexto = autorTexto;
        if (autorFoto !== undefined)
            updateData.autorFoto = autorFoto;
        if (titulo !== undefined)
            updateData.titulo = titulo;
        if (contenido !== undefined)
            updateData.contenido = contenido;
        if (resumen !== undefined)
            updateData.resumen = resumen;
        if (destacada !== undefined) {
            updateData.destacada = !!destacada;
            // Si se marca como destacada, verificar el límite de 3
            if (!!destacada && !noticia.destacada) { // Solo si no era destacada antes
                const noticiasDestacadas = yield prisma.noticia.findMany({
                    where: { destacada: true },
                    orderBy: { fechaPublicacion: 'asc' }, // Más antigua primero
                    select: { id: true }
                });
                // Si ya hay 3 destacadas, quitar la más antigua
                if (noticiasDestacadas.length >= 3) {
                    yield prisma.noticia.update({
                        where: { id: noticiasDestacadas[0].id },
                        data: { destacada: false }
                    });
                }
            }
        }
        if (fecha_publicacion !== undefined)
            updateData.fechaPublicacion = new Date(fecha_publicacion);
        const updatedNoticia = yield prisma.noticia.update({
            where: { id: noticia.id },
            data: updateData,
            include: {
                seccion: true,
                noticiaMedia: {
                    include: {
                        media: true
                    }
                }
            }
        });
        res.json(updatedNoticia);
    }
    catch (error) {
        console.error('Error al actualizar noticia:', error);
        res.status(500).json({ message: 'Error al actualizar la noticia' });
    }
}));
// Eliminar noticia
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = (0, prisma_1.getPrismaClient)();
        const noticia = yield prisma.noticia.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!noticia)
            return res.status(404).json({ message: 'Noticia no encontrada' });
        // Eliminar relaciones
        yield prisma.noticiaMedia.deleteMany({ where: { noticiaId: noticia.id } });
        yield prisma.noticia.delete({ where: { id: noticia.id } });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar noticia:', error);
        res.status(500).json({ message: 'Error al eliminar la noticia' });
    }
}));
exports.default = router;
