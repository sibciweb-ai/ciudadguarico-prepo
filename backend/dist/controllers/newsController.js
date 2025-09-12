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
exports.NewsController = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("../models/News");
const Section_1 = require("../models/Section");
const express_validator_1 = require("express-validator");
class NewsController {
    constructor() {
        this.newsRepository = (0, typeorm_1.getRepository)(News_1.News);
        // Obtener todas las noticias (con autores, sección y media)
        this.getAllNews = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository.find({
                    relations: [
                        'seccion',
                        'newsMedia',
                        'newsMedia.media'
                    ],
                    order: {
                        fecha_publicacion: 'DESC'
                    }
                });
                // Formatear la respuesta para que sea fácil de consumir en el frontend
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
                        media: ((_a = n.newsMedia) === null || _a === void 0 ? void 0 : _a.map(nm => { var _a, _b, _c; return ({ url: (_a = nm.media) === null || _a === void 0 ? void 0 : _a.url, tipo: (_b = nm.media) === null || _b === void 0 ? void 0 : _b.tipo, descripcion: (_c = nm.media) === null || _c === void 0 ? void 0 : _c.descripcion }); })) || [],
                        destacada: n.destacada,
                        fecha_publicacion: n.fecha_publicacion,
                        created_at: n.created_at,
                        updated_at: n.updated_at
                    });
                });
                res.json(formatted);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener las noticias' });
            }
        });
        // Obtener una noticia por ID (con autores, sección y media)
        this.getNewsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const news = yield this.newsRepository.findOne({
                    where: { id: parseInt(req.params.id) },
                    relations: [
                        'seccion',
                        'newsMedia',
                        'newsMedia.media'
                    ]
                });
                if (!news) {
                    res.status(404).json({ message: 'Noticia no encontrada' });
                    return;
                }
                const formatted = {
                    id: news.id,
                    titulo: news.titulo,
                    contenido: news.contenido,
                    resumen: news.resumen,
                    seccion: news.seccion ? { id: news.seccion.id, nombre: news.seccion.nombre } : null,
                    autorTexto: news.autorTexto,
                    autorFoto: news.autorFoto,
                    media: ((_a = news.newsMedia) === null || _a === void 0 ? void 0 : _a.map(nm => { var _a, _b, _c; return ({ url: (_a = nm.media) === null || _a === void 0 ? void 0 : _a.url, tipo: (_b = nm.media) === null || _b === void 0 ? void 0 : _b.tipo, descripcion: (_c = nm.media) === null || _c === void 0 ? void 0 : _c.descripcion }); })) || [],
                    destacada: news.destacada,
                    fecha_publicacion: news.fecha_publicacion,
                    created_at: news.created_at,
                    updated_at: news.updated_at
                };
                res.json(formatted);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener la noticia' });
            }
        });
        // Crear una nueva noticia (con autores, sección y media)
        this.createNews = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ errors: errors.array() });
                    return;
                }
                const { titulo, contenido, resumen, seccion_id, autorTexto, autorFoto, destacada, fecha_publicacion, media } = req.body;
                const sectionRepo = (0, typeorm_1.getRepository)(Section_1.Section);
                const mediaRepo = (0, typeorm_1.getRepository)('media');
                // Validar sección
                const seccion = yield sectionRepo.findOne({ where: { id: seccion_id } });
                if (!seccion) {
                    res.status(400).json({ message: 'Sección no válida' });
                    return;
                }
                // Crear noticia
                const noticia = this.newsRepository.create({
                    titulo,
                    contenido,
                    resumen,
                    seccion,
                    autorTexto,
                    autorFoto,
                    destacada: !!destacada,
                    fecha_publicacion: fecha_publicacion ? new Date(fecha_publicacion) : undefined
                });
                yield this.newsRepository.save(noticia);
                // Asociar media
                if (Array.isArray(media)) {
                    for (const media_id of media) {
                        const mediaItem = yield mediaRepo.findOne({ where: { id: media_id } });
                        if (mediaItem) {
                            yield (0, typeorm_1.getRepository)('noticia_media').save({ noticia_id: noticia.id, media_id: mediaItem.id });
                        }
                    }
                }
                // Devolver noticia con relaciones
                const noticiaCompleta = yield this.newsRepository.findOne({
                    where: { id: noticia.id },
                    relations: [
                        'seccion',
                        'newsMedia',
                        'newsMedia.media'
                    ]
                });
                res.status(201).json(noticiaCompleta);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear la noticia' });
            }
        });
        // Actualizar una noticia (con autores, sección y media)
        this.updateNews = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const noticia = yield this.newsRepository.findOne({ where: { id: parseInt(req.params.id) } });
                if (!noticia) {
                    res.status(404).json({ message: 'Noticia no encontrada' });
                    return;
                }
                const { titulo, contenido, resumen, seccion_id, autorTexto, autorFoto, destacada, fecha_publicacion, media } = req.body;
                const sectionRepo = (0, typeorm_1.getRepository)(Section_1.Section);
                const mediaRepo = (0, typeorm_1.getRepository)('media');
                // Validar sección
                if (seccion_id) {
                    const seccion = yield sectionRepo.findOne({ where: { id: seccion_id } });
                    if (!seccion) {
                        res.status(400).json({ message: 'Sección no válida' });
                        return;
                    }
                    noticia.seccion = seccion;
                }
                if (autorTexto !== undefined)
                    noticia.autorTexto = autorTexto;
                if (autorFoto !== undefined)
                    noticia.autorFoto = autorFoto;
                if (titulo !== undefined)
                    noticia.titulo = titulo;
                if (contenido !== undefined)
                    noticia.contenido = contenido;
                if (resumen !== undefined)
                    noticia.resumen = resumen;
                if (destacada !== undefined)
                    noticia.destacada = !!destacada;
                if (fecha_publicacion !== undefined)
                    noticia.fecha_publicacion = new Date(fecha_publicacion);
                yield this.newsRepository.save(noticia);
                // Actualizar media
                if (Array.isArray(media)) {
                    yield (0, typeorm_1.getRepository)('noticia_media').delete({ noticia_id: noticia.id });
                    for (const media_id of media) {
                        const mediaItem = yield mediaRepo.findOne({ where: { id: media_id } });
                        if (mediaItem) {
                            yield (0, typeorm_1.getRepository)('noticia_media').save({ noticia_id: noticia.id, media_id: mediaItem.id });
                        }
                    }
                }
                // Devolver noticia con relaciones
                const noticiaCompleta = yield this.newsRepository.findOne({
                    where: { id: noticia.id },
                    relations: [
                        'seccion',
                        'newsMedia',
                        'newsMedia.media'
                    ]
                });
                res.json(noticiaCompleta);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar la noticia' });
            }
        });
        // Eliminar una noticia
        this.deleteNews = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar la noticia con sus imágenes asociadas
                const news = yield this.newsRepository.findOne({
                    where: { id: parseInt(req.params.id) },
                    relations: ['newsMedia', 'newsMedia.media']
                });
                if (!news) {
                    res.status(404).json({ message: 'Noticia no encontrada' });
                    return;
                }
                // Extraer URLs de imágenes para eliminar de Cloudinary
                const imageUrls = [];
                if (news.newsMedia && news.newsMedia.length > 0) {
                    news.newsMedia.forEach((newsMediaItem) => {
                        if (newsMediaItem.media && newsMediaItem.media.url && newsMediaItem.media.tipo === 'imagen') {
                            imageUrls.push(newsMediaItem.media.url);
                        }
                    });
                }
                // Eliminar la noticia de la base de datos
                yield this.newsRepository.remove(news);
                // Eliminar imágenes de Cloudinary de forma asíncrona
                if (imageUrls.length > 0) {
                    // Importar las funciones de Cloudinary
                    const { deleteMultipleImages } = require('../config/cloudinary');
                    // Eliminar imágenes en segundo plano (no bloquear la respuesta)
                    deleteMultipleImages(imageUrls).catch((error) => {
                        console.error('Error al limpiar imágenes de Cloudinary:', error);
                    });
                    console.log(`Noticia eliminada. Limpiando ${imageUrls.length} imágenes de Cloudinary...`);
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Error al eliminar la noticia:', error);
                res.status(500).json({ message: 'Error al eliminar la noticia' });
            }
        });
        // Obtener noticias por sección
        this.getNewsBySection = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar la sección por nombre para obtener su id
                const sectionRepo = (0, typeorm_1.getRepository)(Section_1.Section);
                const section = yield sectionRepo.findOne({ where: { nombre: req.params.section } });
                if (!section) {
                    res.status(404).json({ message: 'Sección no encontrada' });
                    return;
                }
                const news = yield this.newsRepository.find({
                    where: { seccion: section },
                    relations: [
                        'seccion',
                        'newsMedia',
                        'newsMedia.media'
                    ],
                    order: {
                        fecha_publicacion: 'DESC'
                    }
                });
                const formatted = news.map(n => {
                    var _a;
                    return ({
                        id: n.id,
                        titulo: n.titulo,
                        contenido: n.contenido,
                        resumen: n.resumen,
                        seccion: n.seccion ? { id: n.seccion.id, nombre: n.seccion.nombre } : null,
                        media: ((_a = n.newsMedia) === null || _a === void 0 ? void 0 : _a.map(nm => { var _a, _b, _c; return ({ url: (_a = nm.media) === null || _a === void 0 ? void 0 : _a.url, tipo: (_b = nm.media) === null || _b === void 0 ? void 0 : _b.tipo, descripcion: (_c = nm.media) === null || _c === void 0 ? void 0 : _c.descripcion }); })) || [],
                        destacada: n.destacada,
                        fecha_publicacion: n.fecha_publicacion,
                        created_at: n.created_at,
                        updated_at: n.updated_at
                    });
                });
                res.json(formatted);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener las noticias de la sección' });
            }
        });
        // Obtener noticias destacadas
        this.getFeaturedNews = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository.find({
                    where: { destacada: true },
                    order: {
                        fecha_publicacion: 'DESC'
                    }
                });
                res.json(news);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener las noticias destacadas' });
            }
        });
    }
}
exports.NewsController = NewsController;
