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
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../config/prisma");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.body)('username').notEmpty(),
    (0, express_validator_1.body)('password').notEmpty()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const prisma = (0, prisma_1.getPrismaClient)();
        // Busca el usuario en Supabase usando Prisma
        const user = yield prisma.usuario.findUnique({
            where: { username },
            include: {
                usuarioRoles: {
                    include: {
                        rol: true
                    }
                }
            }
        });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        // Verifica la contraseña
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        // Obtiene los roles del usuario
        const roles = user.usuarioRoles.map(ur => ur.rol.nombre);
        // Genera el token
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            roles: roles
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                roles: roles
            }
        });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
exports.default = router;
