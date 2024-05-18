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
exports.ScrappingParams = void 0;
const typeorm_1 = require("typeorm");
const sources_1 = require("../../types/sources");
const sources_2 = require("../../types/sources");
let ScrappingParams = class ScrappingParams extends typeorm_1.BaseEntity {
};
exports.ScrappingParams = ScrappingParams;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ScrappingParams.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "paramId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: sources_2.ParamTypeEnum, nullable: false }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: sources_1.SourcesEnum, nullable: false }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], ScrappingParams.prototype, "lastModificationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ScrappingParams.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScrappingParams.prototype, "code", void 0);
exports.ScrappingParams = ScrappingParams = __decorate([
    (0, typeorm_1.Entity)()
], ScrappingParams);
//# sourceMappingURL=ScrappingParams.js.map