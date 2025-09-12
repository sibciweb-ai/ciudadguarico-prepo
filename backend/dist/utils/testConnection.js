"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dns_1 = __importDefault(require("dns"));
const prisma = new client_1.PrismaClient();
dns_1.default.lookup('db.hwdurinddscmbicshdko.supabase.co', (err, address, family) => {
    if (err) {
        console.error('❌ DNS resolution failed:', err.message);
    }
    else {
        console.log(`✅ DNS resolved: ${address} (IPv${family})`);
    }
});
prisma.$connect()
    .then(() => {
    console.log('✅ Prisma conectado correctamente');
})
    .catch((err) => {
    console.error('❌ Prisma no logró conectar:', err.message);
});
