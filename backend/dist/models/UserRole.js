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
exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Role_1 = require("./Role");
let UserRole = class UserRole {
};
exports.UserRole = UserRole;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], UserRole.prototype, "usuario_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], UserRole.prototype, "rol_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.userRoles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", User_1.User)
], UserRole.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role, role => role, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", Role_1.Role)
], UserRole.prototype, "rol", void 0);
exports.UserRole = UserRole = __decorate([
    (0, typeorm_1.Entity)('usuario_rol')
], UserRole);
