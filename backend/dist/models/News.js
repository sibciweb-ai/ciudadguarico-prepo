"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const typeorm_1 = require("typeorm");
const Section_1 = require("./Section");
const NewsMedia_1 = require("./NewsMedia");
let News = class News {
};
exports.News = News;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], News.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], News.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], News.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], News.prototype, "resumen", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], News.prototype, "autorTexto", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], News.prototype, "autorFoto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Section_1.Section, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'seccion_id' }),
    __metadata("design:type", Section_1.Section)
], News.prototype, "seccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], News.prototype, "destacada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_publicacion' }),
    __metadata("design:type", Date)
], News.prototype, "fecha_publicacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], News.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], News.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => NewsMedia_1.NewsMedia, newsMedia => newsMedia.noticia),
    __metadata("design:type", Array)
], News.prototype, "newsMedia", void 0);
exports.News = News = __decorate([
    (0, typeorm_1.Entity)('noticias')
], News);
