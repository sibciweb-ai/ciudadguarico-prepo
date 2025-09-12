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
exports.getConnection = exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("../models/News");
const User_1 = require("../models/User");
const Section_1 = require("../models/Section");
const Role_1 = require("../models/Role");
const UserRole_1 = require("../models/UserRole");
const NewsMedia_1 = require("../models/NewsMedia");
const Media_1 = require("../models/Media");
const Publicidad_1 = require("../models/Publicidad");
const PDF_1 = require("../models/PDF");
const View_1 = require("../models/View");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    driver: require('mysql2'),
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ciudadguaricor',
    entities: [News_1.News, User_1.User, Section_1.Section, Role_1.Role, UserRole_1.UserRole, NewsMedia_1.NewsMedia, Media_1.Media, Publicidad_1.Publicidad, PDF_1.PDF, View_1.View],
    synchronize: true,
    logging: true,
    extra: {
        connectionLimit: 10
    }
});
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!exports.AppDataSource.isInitialized) {
            console.log('Intentando conectar a la base de datos...');
            console.log('Host:', process.env.DB_HOST);
            console.log('Puerto:', process.env.DB_PORT);
            console.log('Usuario:', process.env.DB_USER);
            console.log('Base de datos:', process.env.DB_NAME);
            yield exports.AppDataSource.initialize();
            console.log('Conexión a la base de datos establecida');
        }
        return exports.AppDataSource;
    }
    catch (error) {
        console.error('Error detallado al conectar con la base de datos:', error);
        if (error instanceof Error) {
            console.error('Mensaje de error:', error.message);
            console.error('Stack trace:', error.stack);
        }
        throw error;
    }
});
exports.initializeDatabase = initializeDatabase;
const getConnection = () => {
    if (!exports.AppDataSource.isInitialized) {
        throw new Error('La conexión a la base de datos no está inicializada');
    }
    return exports.AppDataSource;
};
exports.getConnection = getConnection;
