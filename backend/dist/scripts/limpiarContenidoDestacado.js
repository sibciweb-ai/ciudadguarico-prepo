"use strict";
// Script para limpiar la tabla contenido_destacado y dejar solo los registros con media en Cloudinary
// Ejecuta este script con: npx ts-node backend/src/scripts/limpiarContenidoDestacado.ts
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
function limpiarContenidoDestacado() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = (0, prisma_1.getPrismaClient)();
        const todos = yield prisma.contenidoDestacado.findMany();
        let eliminados = 0;
        for (const c of todos) {
            // Elimina si no es Cloudinary o si es un banner de prueba (contiene '-demo' en la URL)
            if (!c.media.startsWith('https://res.cloudinary.com') || c.media.includes('-demo')) {
                yield prisma.contenidoDestacado.delete({ where: { id: c.id } });
                eliminados++;
                console.log(`Eliminado registro id=${c.id} media=${c.media}`);
            }
        }
        console.log(`Listo. Registros eliminados: ${eliminados}`);
    });
}
limpiarContenidoDestacado().catch(e => {
    console.error('Error al limpiar:', e);
    process.exit(1);
});
