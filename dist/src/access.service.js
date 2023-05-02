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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const access_entity_1 = require("./access.entity");
let AccessService = class AccessService {
    constructor(accessRepository) {
        this.accessRepository = accessRepository;
    }
    async findAll() {
        return this.accessRepository.find();
    }
    async findOneById(id) {
        const getUser = { where: { id } };
        return this.accessRepository.findOne(getUser);
    }
    async findByUsername(usuario) {
        const getUserForName = { where: { usuario } };
        return this.accessRepository.findOne(getUserForName);
    }
    async create(user) {
        return this.accessRepository.save(user);
    }
};
AccessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(access_entity_1.Access)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccessService);
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map