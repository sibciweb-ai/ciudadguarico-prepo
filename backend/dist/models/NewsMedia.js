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
exports.NewsMedia = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("./News");
const Media_1 = require("./Media");
let NewsMedia = class NewsMedia {
};
exports.NewsMedia = NewsMedia;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], NewsMedia.prototype, "noticia_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], NewsMedia.prototype, "media_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => News_1.News, news => news.newsMedia, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'noticia_id' }),
    __metadata("design:type", News_1.News)
], NewsMedia.prototype, "noticia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Media_1.Media, media => media, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'media_id' }),
    __metadata("design:type", Media_1.Media)
], NewsMedia.prototype, "media", void 0);
exports.NewsMedia = NewsMedia = __decorate([
    (0, typeorm_1.Entity)('noticia_media')
], NewsMedia);
