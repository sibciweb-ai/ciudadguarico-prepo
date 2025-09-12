"use strict";
// Script para insertar banners de prueba en la tabla contenido_destacado
// Ejecuta este script con: npx ts-node backend/src/scripts/insertarContenidoDestacadoPrueba.ts
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
function insertarContenidoDestacadoPrueba() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = (0, prisma_1.getPrismaClient)();
        // URLs de imágenes de Cloudinary de prueba (puedes cambiarlas por las tuyas)
        const urls = [
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/principal-izq-demo.jpg',
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/principal-der-demo.jpg',
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/principal-fondo-demo.jpg'
        ];
        const ubicaciones = ['principal-izq', 'principal-der', 'principal-fondo'];
        for (let i = 0; i < urls.length; i++) {
            yield prisma.contenidoDestacado.create({
                data: {
                    media: urls[i],
                    url: 'https://ejemplo.com',
                    titulo: `Banner de prueba ${i + 1}`,
                    ubicacion: ubicaciones[i],
                    visible: true
                }
            });
            console.log(`Insertado banner de prueba para ${ubicaciones[i]}`);
        }
        console.log('Listo. Banners de prueba insertados.');
    });
}
insertarContenidoDestacadoPrueba().catch(e => {
    console.error('Error al insertar:', e);
    process.exit(1);
});
