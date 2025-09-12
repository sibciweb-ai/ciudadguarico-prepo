"use strict";
// Script para insertar banners de prueba en los sides de la barra lateral
// Ejecuta este script con: npx ts-node backend/src/scripts/insertarSidesPrueba.ts
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
function insertarSidesPrueba() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = (0, prisma_1.getPrismaClient)();
        // URLs de imágenes de Cloudinary de prueba (cambia por las tuyas si quieres)
        const urls = [
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/side-1-demo.jpg',
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/side-2-demo.jpg',
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/side-3-demo.jpg',
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/side-4-demo.jpg',
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/side-5-demo.jpg',
            'https://res.cloudinary.com/dilkjqca2/image/upload/v1620000000/ciudadguaricor/contenido/side-6-demo.jpg'
        ];
        const ubicaciones = ['side-1', 'side-2', 'side-3', 'side-4', 'side-5', 'side-6'];
        for (let i = 0; i < urls.length; i++) {
            yield prisma.contenidoDestacado.create({
                data: {
                    media: urls[i],
                    url: 'https://ejemplo.com',
                    titulo: `Side de prueba ${i + 1}`,
                    ubicacion: ubicaciones[i],
                    visible: true
                }
            });
            console.log(`Insertado side de prueba para ${ubicaciones[i]}`);
        }
        console.log('Listo. Sides de prueba insertados.');
    });
}
insertarSidesPrueba().catch(e => {
    console.error('Error al insertar:', e);
    process.exit(1);
});
