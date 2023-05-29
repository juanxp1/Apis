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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const oid_entity_1 = require("./oid.entity");
const user_service_1 = require("./user.service");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./jwt.guard");
let AuthController = class AuthController {
    constructor(accessService, authService) {
        this.accessService = accessService;
        this.authService = authService;
    }
    async findUserId(id, data) {
        console.log('tag-user-' + data['user'].sub);
        return this.accessService.findOneById(+id);
    }
    async set(jac) {
        const mockAccess = {
            id: 1,
            user: 'jacgsaw',
            password: '12345',
            email: 'alex@jacgx.com',
        };
        await this.authService.signIn(mockAccess);
        return jac;
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findUserId", null);
__decorate([
    (0, common_1.Get)('jac/:jac'),
    __param(0, (0, common_1.Param)('jac')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "set", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, typeorm_1.InjectRepository)(oid_entity_1.Oid)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map