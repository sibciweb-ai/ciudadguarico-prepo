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
const prisma_1 = require("../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createOrUpdateAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = (0, prisma_1.getPrismaClient)();
            const username = 'admin';
            const password = 'ciudad2025';
            const roleName = 'admin';
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Busca o crea el rol admin
            let role = yield prisma.rol.findUnique({
                where: { nombre: roleName }
            });
            if (!role) {
                role = yield prisma.rol.create({
                    data: { nombre: roleName }
                });
                console.log('Rol admin creado.');
            }
            // Verifica si ya existe el usuario
            let user = yield prisma.usuario.findUnique({
                where: { username },
                include: {
                    usuarioRoles: {
                        include: {
                            rol: true
                        }
                    }
                }
            });
            if (user) {
                // Actualiza la contraseña
                yield prisma.usuario.update({
                    where: { id: user.id },
                    data: { password: hashedPassword }
                });
                // Verifica si ya tiene el rol admin
                const hasAdminRole = user.usuarioRoles.some(ur => ur.rol.nombre === roleName);
                if (!hasAdminRole) {
                    yield prisma.usuarioRol.create({
                        data: {
                            usuarioId: user.id,
                            rolId: role.id
                        }
                    });
                }
                console.log('Usuario admin actualizado correctamente.');
            }
            else {
                // Crea el usuario
                const newUser = yield prisma.usuario.create({
                    data: {
                        username,
                        password: hashedPassword,
                        usuarioRoles: {
                            create: {
                                rolId: role.id
                            }
                        }
                    },
                    include: {
                        usuarioRoles: {
                            include: {
                                rol: true
                            }
                        }
                    }
                });
                user = newUser;
                console.log('Usuario admin creado correctamente.');
            }
            console.log('Credenciales de admin:');
            console.log('Usuario: admin');
            console.log('Contraseña: ciudad2025');
            yield prisma.$disconnect();
            process.exit(0);
        }
        catch (error) {
            console.error('Error al crear usuario admin:', error);
            process.exit(1);
        }
    });
}
createOrUpdateAdmin();
