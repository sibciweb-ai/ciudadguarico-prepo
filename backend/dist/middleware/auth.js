"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token de acceso' });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Acceso denegado: se requieren permisos de administrador' });
    }
};
exports.isAdmin = isAdmin;
