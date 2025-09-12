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
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const UserRole_1 = require("../models/UserRole");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createOrUpdateAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.AppDataSource.initialize();
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const roleRepository = database_1.AppDataSource.getRepository(Role_1.Role);
        const userRoleRepository = database_1.AppDataSource.getRepository(UserRole_1.UserRole);
        const username = 'admin';
        const password = 'ciudad2025';
        const roleName = 'admin';
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Busca el rol admin
        const role = yield roleRepository.findOne({ where: { nombre: roleName } });
        if (!role) {
            console.error('No existe el rol admin en la base de datos.');
            process.exit(1);
        }
        // Verifica si ya existe
        let user = yield userRepository.findOne({ where: { username } });
        if (user) {
            user.password = hashedPassword;
            yield userRepository.save(user);
            // Asigna el rol admin si no lo tiene
            let userRole = yield userRoleRepository.findOne({ where: { usuario_id: user.id, rol_id: role.id } });
            if (!userRole) {
                userRole = userRoleRepository.create({ usuario_id: user.id, rol_id: role.id });
                yield userRoleRepository.save(userRole);
            }
            console.log('Usuario admin actualizado correctamente.');
        }
        else {
            user = userRepository.create({
                username,
                password: hashedPassword,
                created_at: new Date()
            });
            yield userRepository.save(user);
            // Asigna el rol admin
            const userRole = userRoleRepository.create({ usuario_id: user.id, rol_id: role.id });
            yield userRoleRepository.save(userRole);
            console.log('Usuario admin creado correctamente.');
        }
        process.exit(0);
    });
}
createOrUpdateAdmin().catch(e => {
    console.error(e);
    process.exit(1);
});
