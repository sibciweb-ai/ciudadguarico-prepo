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
exports.OpinionController = void 0;
const prisma_1 = require("../config/prisma");
class OpinionController {
    // Obtener todas las opiniones
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const opiniones = yield prisma.opinion.findMany({
                    include: { media: true, columnista: true },
                    orderBy: { fecha: 'desc' }
                });
                res.json(opiniones);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener opiniones' });
            }
        });
    }
    // Obtener una opinión por ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                const opinion = yield prisma.opinion.findUnique({
                    where: { id },
                    include: { media: true, columnista: true }
                });
                if (!opinion)
                    return res.status(404).json({ message: 'Opinión no encontrada' });
                res.json(opinion);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener opinión' });
            }
        });
    }
    // Crear opinión
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const { titulo, contenido, fecha, columnistaId, destacado, mediaIds } = req.body;
                const opinion = yield prisma.opinion.create({
                    data: {
                        titulo,
                        contenido,
                        fecha: fecha ? new Date(fecha) : undefined,
                        columnistaId: parseInt(columnistaId),
                        destacado: destacado === 'true' || destacado === true,
                        media: mediaIds && Array.isArray(mediaIds)
                            ? { connect: mediaIds.map((id) => ({ id })) }
                            : undefined
                    },
                    include: { media: true, columnista: true }
                });
                res.status(201).json(opinion);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear opinión' });
            }
        });
    }
    // Actualizar opinión
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                const { titulo, contenido, fecha, columnistaId, destacado, mediaIds } = req.body;
                const opinion = yield prisma.opinion.update({
                    where: { id },
                    data: {
                        titulo,
                        contenido,
                        fecha: fecha ? new Date(fecha) : undefined,
                        columnistaId: parseInt(columnistaId),
                        destacado: destacado === 'true' || destacado === true,
                        media: mediaIds && Array.isArray(mediaIds)
                            ? { set: mediaIds.map((id) => ({ id })) }
                            : undefined
                    },
                    include: { media: true, columnista: true }
                });
                res.json(opinion);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar opinión' });
            }
        });
    }
    // Eliminar opinión
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                yield prisma.opinion.delete({ where: { id } });
                res.json({ message: 'Opinión eliminada' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar opinión' });
            }
        });
    }
}
exports.OpinionController = OpinionController;
