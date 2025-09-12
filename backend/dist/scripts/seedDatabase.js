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
const prisma_1 = require("../config/prisma");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prisma = (0, prisma_1.getPrismaClient)();
            console.log('🌱 Poblando la base de datos...');
            // Crear secciones
            const secciones = [
                { nombre: 'Política' },
                { nombre: 'Economía' },
                { nombre: 'Deportes' },
                { nombre: 'Cultura' },
                { nombre: 'Tecnología' },
                { nombre: 'Salud' },
                { nombre: 'Educación' },
                { nombre: 'Medio Ambiente' }
            ];
            for (const seccion of secciones) {
                try {
                    yield prisma.seccion.create({
                        data: seccion
                    });
                }
                catch (error) {
                    // Si ya existe, continuamos
                    console.log(`Sección "${seccion.nombre}" ya existe`);
                }
            }
            console.log('✅ Secciones creadas exitosamente');
            // Crear roles si no existen
            const roles = [
                { nombre: 'admin' },
                { nombre: 'editor' },
                { nombre: 'reportero' }
            ];
            for (const rol of roles) {
                try {
                    yield prisma.rol.create({
                        data: rol
                    });
                }
                catch (error) {
                    // Si ya existe, continuamos
                    console.log(`Rol "${rol.nombre}" ya existe`);
                }
            }
            console.log('✅ Roles creados exitosamente');
            yield prisma.$disconnect();
            console.log('🎉 Base de datos poblada exitosamente');
            process.exit(0);
        }
        catch (error) {
            console.error('❌ Error al poblar la base de datos:', error);
            process.exit(1);
        }
    });
}
seedDatabase();
