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
exports.EditorialController = void 0;
const prisma_1 = require("../config/prisma");
class EditorialController {
    // Obtener todos los editoriales
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const editoriales = yield prisma.editorial.findMany({
                    include: { media: true },
                    orderBy: { fecha: 'desc' }
                });
                res.json(editoriales);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener editoriales' });
            }
        });
    }
    // Obtener un editorial por ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                const editorial = yield prisma.editorial.findUnique({
                    where: { id },
                    include: { media: true }
                });
                if (!editorial)
                    return res.status(404).json({ message: 'Editorial no encontrado' });
                res.json(editorial);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener editorial' });
            }
        });
    }
    // Crear editorial
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const { titulo, contenido, fecha, autor, mediaIds } = req.body;
                const editorial = yield prisma.editorial.create({
                    data: {
                        titulo,
                        contenido,
                        fecha: fecha ? new Date(fecha) : undefined,
                        autor,
                        media: mediaIds && Array.isArray(mediaIds)
                            ? { connect: mediaIds.map((id) => ({ id })) }
                            : undefined
                    },
                    include: { media: true }
                });
                res.status(201).json(editorial);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear editorial' });
            }
        });
    }
    // Actualizar editorial
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                const { titulo, contenido, fecha, autor, mediaIds } = req.body;
                const editorial = yield prisma.editorial.update({
                    where: { id },
                    data: {
                        titulo,
                        contenido,
                        fecha: fecha ? new Date(fecha) : undefined,
                        autor,
                        media: mediaIds && Array.isArray(mediaIds)
                            ? { set: mediaIds.map((id) => ({ id })) }
                            : undefined
                    },
                    include: { media: true }
                });
                res.json(editorial);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar editorial' });
            }
        });
    }
    // Eliminar editorial
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                yield prisma.editorial.delete({ where: { id } });
                res.json({ message: 'Editorial eliminado' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar editorial' });
            }
        });
    }
}
exports.EditorialController = EditorialController;
