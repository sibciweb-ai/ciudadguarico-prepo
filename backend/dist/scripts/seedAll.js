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
const seedColumnistas_1 = __importDefault(require("./seedColumnistas"));
const seedEditoriales_1 = __importDefault(require("./seedEditoriales"));
function seedAll() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🚀 Iniciando seed completo de la base de datos...');
        console.log('='.repeat(50));
        try {
            // Seed columnistas y opiniones
            yield (0, seedColumnistas_1.default)();
            console.log('');
            // Seed editoriales
            yield (0, seedEditoriales_1.default)();
            console.log('');
            console.log('🎉 ¡SEED COMPLETO EXITOSO!');
            console.log('='.repeat(50));
            console.log('✅ Base de datos poblada con:');
            console.log('   📊 5 columnistas con biografías y fotos');
            console.log('   📝 5 opiniones/columnas de ejemplo');
            console.log('   📰 4 editoriales institucionales');
            console.log('');
            console.log('🔗 Ahora puedes:');
            console.log('   1. Ir a /opinion/columnistas para ver los columnistas');
            console.log('   2. Ir a /opinion/editoriales para ver las editoriales');
            console.log('   3. Usar el panel de admin para gestionar contenido');
            console.log('='.repeat(50));
        }
        catch (error) {
            console.error('❌ Error durante el seed completo:', error);
            throw error;
        }
    });
}
// Ejecutar si se llama directamente
if (require.main === module) {
    seedAll()
        .then(() => {
        console.log('✅ Proceso completado exitosamente');
        process.exit(0);
    })
        .catch((error) => {
        console.error('❌ Error fatal:', error);
        process.exit(1);
    });
}
exports.default = seedAll;
