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
exports.ColumnistaController = void 0;
const prisma_1 = require("../config/prisma");
class ColumnistaController {
    // Obtener todos los columnistas
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const columnistas = yield prisma.columnista.findMany({
                    include: { opiniones: true },
                    orderBy: { nombre: 'asc' }
                });
                res.json(columnistas);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener columnistas' });
            }
        });
    }
    // Obtener un columnista por ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                const columnista = yield prisma.columnista.findUnique({
                    where: { id },
                    include: { opiniones: true }
                });
                if (!columnista)
                    return res.status(404).json({ message: 'Columnista no encontrado' });
                res.json(columnista);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener columnista' });
            }
        });
    }
    // Crear columnista
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const { nombre, bio, fotoUrl, redes } = req.body;
                const columnista = yield prisma.columnista.create({
                    data: {
                        nombre,
                        bio,
                        fotoUrl,
                        redes: redes ? JSON.parse(redes) : undefined
                    }
                });
                res.status(201).json(columnista);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear columnista' });
            }
        });
    }
    // Actualizar columnista
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                const { nombre, bio, fotoUrl, redes } = req.body;
                const columnista = yield prisma.columnista.update({
                    where: { id },
                    data: {
                        nombre,
                        bio,
                        fotoUrl,
                        redes: redes ? JSON.parse(redes) : undefined
                    }
                });
                res.json(columnista);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar columnista' });
            }
        });
    }
    // Eliminar columnista
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prisma = (0, prisma_1.getPrismaClient)();
                const id = parseInt(req.params.id);
                yield prisma.columnista.delete({ where: { id } });
                res.json({ message: 'Columnista eliminado' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar columnista' });
            }
        });
    }
}
exports.ColumnistaController = ColumnistaController;
