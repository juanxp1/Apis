"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../data_bases/database");
const oid_entity_1 = require("./entity/oid.entity");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./controller/auth.controller");
const user_service_1 = require("./services/user.service");
const auth_service_1 = require("./services/auth.service");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(database_1.database),
            typeorm_1.TypeOrmModule.forFeature([oid_entity_1.Oid]),
            jwt_1.JwtModule.register({
                secret: process.env.MOD_SCR,
                signOptions: { expiresIn: process.env.MOD_TIM },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [user_service_1.UserService, auth_service_1.AuthService, config_1.ConfigService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map