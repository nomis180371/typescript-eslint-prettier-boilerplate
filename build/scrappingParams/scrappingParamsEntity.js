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
exports.ScrappingParamsEntity = void 0;
const typeorm_1 = require("typeorm");
const scrappingParamsType_1 = require("./scrappingParamsType");
let ScrappingParamsEntity = class ScrappingParamsEntity extends typeorm_1.BaseEntity {
};
exports.ScrappingParamsEntity = ScrappingParamsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "paramId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: scrappingParamsType_1.ParamTypeEnum, nullable: false }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: scrappingParamsType_1.SourcesEnum, nullable: false }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], ScrappingParamsEntity.prototype, "lastModificationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ScrappingParamsEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParamsEntity.prototype, "code", void 0);
exports.ScrappingParamsEntity = ScrappingParamsEntity = __decorate([
    (0, typeorm_1.Entity)()
], ScrappingParamsEntity);
//# sourceMappingURL=scrappingParamsEntity.js.map