"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const access_entity_1 = require("./access.entity");
const access_controller_1 = require("./access.controller");
const access_service_1 = require("./access.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'sip.jacgsaw.com',
                port: 3306,
                username: 'andrewx',
                password: 'P40l1t47',
                database: 'idrdgov_simgeneral',
                entities: [access_entity_1.Access],
                synchronize: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([access_entity_1.Access]),
        ],
        controllers: [access_controller_1.AccessController],
        providers: [access_service_1.AccessService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map