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
exports.DaviplataService = void 0;
const common_1 = require("@nestjs/common");
const https = require("https");
const fs = require("fs");
const path = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../../entities/payment.entity");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let DaviplataService = class DaviplataService {
    constructor(paymentRepository, configService) {
        this.paymentRepository = paymentRepository;
        this.configService = configService;
        this.accessToken = '';
        const certsDir = path.join(__dirname, '../../../utils/certified/');
        this.certPath = path.join(certsDir, 'cert_dummy_lab_v2.crt');
        this.keyPath = path.join(certsDir, 'cert_dummy_lab_key_v2.pem');
        this.agent = new https.Agent({
            cert: fs.readFileSync(this.certPath),
            key: fs.readFileSync(this.keyPath),
        });
        this.apiUrl = 'https://apislab.daviplata.com/oauth2Provider/type1/v1/token';
        this.apiUrlCompra = 'https://apislab.daviplata.com/daviplata/v1/compra';
        this.apiUrlOpt = 'https://apislab.daviplata.com/otpSec/v1/read',
            this.apiUrlConfirm = 'https://apislab.daviplata.com/daviplata/v1/confirmarCompra';
        this.requestHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
    }
    async getTokenV2(tokenRequestDto) {
        const data = `grant_type=${tokenRequestDto.grant_type}&client_id=${tokenRequestDto.client_id}&client_secret=${tokenRequestDto.client_secret}&scope=${tokenRequestDto.scope}`;
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.apiUrl,
            headers: this.requestHeaders,
            data: data,
            httpsAgent: this.agent,
        };
        try {
            const response = await axios_1.default.request(config);
            this.accessToken = response.data.access_token;
            console.log('token', this.accessToken);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async realizarCompraV1(compraData) {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.apiUrlCompra,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
                'x-ibm-client-id': 'UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2',
                'Content-Type': 'application/json',
            },
            data: {
                valor: compraData.valor,
                numeroIdentificacion: compraData.numeroIdentificacion,
                tipoDocumento: compraData.tipoDocumento,
            },
            httpsAgent: this.agent,
        };
        try {
            const response = await axios_1.default.request(config);
            this.idSessionToken = response.data.idSessionToken;
            return response.data;
        }
        catch (error) {
            console.log('Error al realizar la compra:', error.message);
            throw new common_1.HttpException('Error al realizar la compra', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async readOtp(readOtpData) {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.apiUrlOpt,
            headers: {
                Accept: 'application/json',
                'x-ibm-client-id': 'UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2',
                'Content-Type': 'application/json',
            },
            data: readOtpData,
            httpsAgent: this.agent,
        };
        try {
            const response = await axios_1.default.request(config);
            this.otp = response.data.otp;
            return response.data;
        }
        catch (error) {
            console.log('Error al leer OTP:', error);
            throw new Error('Error al leer OTP');
        }
    }
    async confirmarCompraV1(confirmarCompraData) {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.apiUrlConfirm,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
                'x-ibm-client-id': 'UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2',
                'Content-Type': 'application/json',
                'otp': this.otp,
                'idSessionToken': this.idSessionToken,
            },
            data: confirmarCompraData,
            httpsAgent: this.agent,
            timeout: 60000,
        };
        try {
            const response = await axios_1.default.request(config);
            console.log(response, 'HOLAAA');
            return response.data;
        }
        catch (error) {
            console.log('Error al confirmar la compra:', error);
            throw new Error('Error al confirmar la compra');
        }
    }
};
DaviplataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], DaviplataService);
exports.DaviplataService = DaviplataService;
//# sourceMappingURL=daviplata.service.js.map