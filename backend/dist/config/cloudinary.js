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
exports.deleteMultipleImages = exports.extractPublicIdFromUrl = exports.deleteImage = exports.getOptimizedImageUrl = exports.storageContenido = exports.storageNoticias = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
// Configurar Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configurar almacenamiento para noticias
exports.storageNoticias = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'ciudadguaricor/noticias',
    },
});
// Configurar almacenamiento para contenido destacado
exports.storageContenido = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'ciudadguaricor/contenido',
    },
});
// Función para obtener URL optimizada
const getOptimizedImageUrl = (publicId, options = {}) => {
    const defaultOptions = Object.assign({ quality: 'auto:good', fetch_format: 'auto' }, options);
    return cloudinary_1.v2.url(publicId, defaultOptions);
};
exports.getOptimizedImageUrl = getOptimizedImageUrl;
// Función para eliminar imagen
const deleteImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.destroy(publicId);
        console.log(`Imagen eliminada de Cloudinary: ${publicId}`, result);
        return result;
    }
    catch (error) {
        console.error('Error al eliminar imagen:', error);
        throw error;
    }
});
exports.deleteImage = deleteImage;
// Función para extraer public_id de URL de Cloudinary
const extractPublicIdFromUrl = (url) => {
    try {
        // Ejemplo de URL: https://res.cloudinary.com/your-cloud/image/upload/v1234567890/ciudadguaricor/noticias/abc123.jpg
        const regex = /\/v\d+\/(.+)\.[a-zA-Z]{3,4}$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    catch (error) {
        console.error('Error al extraer public_id:', error);
        return null;
    }
};
exports.extractPublicIdFromUrl = extractPublicIdFromUrl;
// Función para limpiar múltiples imágenes
const deleteMultipleImages = (urls) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletePromises = urls.map((url) => __awaiter(void 0, void 0, void 0, function* () {
            const publicId = (0, exports.extractPublicIdFromUrl)(url);
            if (publicId) {
                return yield (0, exports.deleteImage)(publicId);
            }
            return null;
        }));
        yield Promise.all(deletePromises);
        console.log(`Eliminadas ${urls.length} imágenes de Cloudinary`);
    }
    catch (error) {
        console.error('Error al eliminar múltiples imágenes:', error);
        throw error;
    }
});
exports.deleteMultipleImages = deleteMultipleImages;
exports.default = cloudinary_1.v2;
