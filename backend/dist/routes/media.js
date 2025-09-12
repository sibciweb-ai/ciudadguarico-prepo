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
// Subir imagen
router.post('/', upload_1.upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se subió ningún archivo' });
        }
        const prisma = (0, prisma_1.getPrismaClient)();
        // Almacenamiento local: devolver ruta pública bajo /uploads
        const url = `/uploads/${req.file.filename}`;
        const tipo = 'imagen';
        const descripcion = req.body.descripcion || null;
        const media = yield prisma.media.create({
            data: {
                url,
                tipo: tipo,
                descripcion
            }
        });
        res.status(201).json(media);
    }
    catch (error) {
        console.error('Error al subir imagen:', error);
        res.status(500).json({ message: 'Error al subir la imagen' });
    }
}));
exports.default = router;
