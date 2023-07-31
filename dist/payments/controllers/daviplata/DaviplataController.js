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
const daviplata_service_1 = require("../../services/daviplata/daviplata.service");
const token_request_dto_1 = require("../../dto/token-request.dto");
const buy_daviplata_dto_1 = require("../../dto/buy-daviplata.dto");
const otp_daviplata_dto_1 = require("../../dto/otp-daviplata.dto");
const confirm_daviplata_dto_1 = require("../../dto/confirm-daviplata.dto");
let DaviplataController = class DaviplataController {
    constructor(daviplataService) {
        this.daviplataService = daviplataService;
    }
    async getTokenV2(token) {
        console.log('jacgsaw-dto', token.client_id);
        return this.daviplataService.getTokenV2(token);
    }
    async realizarCompraV1(compraData) {
        try {
            const respuestaCompra = await this.daviplataService.realizarCompraV1(compraData);
            console.log('COMPRA:', respuestaCompra);
            return respuestaCompra;
        }
        catch (error) {
            console.log('Error al realizar la compra:', error);
            throw new common_1.HttpException('Error al realizar la compra', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async readOtp(readOtpData) {
        try {
            const response = await this.daviplataService.readOtp(readOtpData);
            console.log('OTP :', response);
            return response;
        }
        catch (error) {
            console.log('Error al leer OTP:', error);
            throw new common_1.HttpException('Error al leer OTP', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async confirmarCompraV1(confirmarCompraData) {
        try {
            const confirmacionCompra = await this.daviplataService.confirmarCompraV1(confirmarCompraData);
            console.log('Confirmación de compra exitosa:', confirmacionCompra);
            return confirmacionCompra;
        }
        catch (error) {
            console.log('Error al confirmar la compra:', error);
            throw new common_1.HttpException('Error al confirmar la compra', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)('getTokenV2'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_request_dto_1.TokenRequestDto]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "getTokenV2", null);
__decorate([
    (0, common_1.Post)('realizarCompraV1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_daviplata_dto_1.BuyDaviplataDto]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "realizarCompraV1", null);
__decorate([
    (0, common_1.Post)('readOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_daviplata_dto_1.OtpDaviplataDto]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "readOtp", null);
__decorate([
    (0, common_1.Post)('confirmarCompraV1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_daviplata_dto_1.ConfirmDaviplataDto]),
    __metadata("design:returntype", Promise)
], DaviplataController.prototype, "confirmarCompraV1", null);
DaviplataController = __decorate([
    (0, common_1.Controller)('daviplata'),
    __metadata("design:paramtypes", [daviplata_service_1.DaviplataService])
], DaviplataController);
exports.DaviplataController = DaviplataController;
//# sourceMappingURL=DaviplataController.js.map