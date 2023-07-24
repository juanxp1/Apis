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
exports.DaviplataController = void 0;
const common_1 = require("@nestjs/common");
const buy_daviplata_dto_1 = require("../../dto/buy-daviplata.dto");
const otp_daviplata_dto_1 = require("../../dto/otp-daviplata.dto");
const confirm_daviplata_dto_1 = require("../../dto/confirm-daviplata.dto");
const daviplata_service_1 = require("../../services/daviplata/daviplata.service");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("../../entities/payment.entity");
let DaviplataController = class DaviplataController {
    constructor(daviplataService) {
        this.daviplataService = daviplataService;
    }
    async auth(res) {
        const response = await this.daviplataService.auth();
        res.status(response.statusCode).json(response);
    }
    async buy(params, res) {
        const response = await this.daviplataService.buy(params);
        res.status(response.statusCode).json(response);
    }
    async otp(params, res) {
        const response = await this.daviplataService.otp(params);
        res.status(response.statusCode).json(response);
    }
    async confirm(params, res) {
        const response = await this.daviplataService.confirm(params);
        res.status(response.statusCode).json(response);
    }
};
__decorate([
    (0, common_1.Get)('auth-daviplata'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "auth", null);
__decorate([
    (0, common_1.Post)('buy-daviplata'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_daviplata_dto_1.BuyDaviplataDto, Object]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "buy", null);
__decorate([
    (0, common_1.Post)('otp-daviplata'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_daviplata_dto_1.OtpDaviplataDto, Object]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "otp", null);
__decorate([
    (0, common_1.Post)('confirm-daviplata'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_daviplata_dto_1.ConfirmDaviplataDto, Object]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "confirm", null);
DaviplataController = __decorate([
    (0, common_1.Controller)('daviplata'),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [daviplata_service_1.DaviplataService])
], DaviplataController);
exports.DaviplataController = DaviplataController;
//# sourceMappingURL=DaviplataController.js.map