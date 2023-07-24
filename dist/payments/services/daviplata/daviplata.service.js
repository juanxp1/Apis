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
        const certsDir = path.join(__dirname, '../../../utils/certified/');
        console.log('jacgsaw', __dirname);
        this.certPath = path.join(certsDir, 'cert_dummy_lab_v2.crt');
        this.keyPath = path.join(certsDir, 'cert_dummy_lab_key_v2.pem');
        console.log('jacgsaw-cert', this.certPath);
        console.log('jacgsaw-key', this.keyPath);
        console.log('jacgsaw-dir', certsDir);
        this.agent = new https.Agent({
            cert: fs.readFileSync(this.certPath),
            key: fs.readFileSync(this.keyPath),
        });
    }
    async getTokenV2() {
        const data = 'grant_type=client_credentials&client_id=UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2&client_secret=wcYPCx1DpdjA9ybAQHkRkVqv3Iq8QuOLSoLZGaMYcX0kwgH68RJfvwIdj9TqzuNu&scope=daviplata';
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://apislab.daviplata.com/oauth2Provider/type1/v1/token',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: 'incap_ses_1599_2684467=OGQ0DwgG71Wai9cqKsowFnzjvmQAAAAA2YeaI+KVIYOGAQ2c6iU88A==; nlbi_2684467=JHA3LdbGhBQXqZihJj8ifgAAAAASgSKYELLjjg+BY/ezuIRl; visid_incap_2684467=M7b9/r89QxyLFmDitFna9GpmUWQAAAAAQUIPAAAAAACNVeZqF3B4A5dMS6b3T5jl',
            },
            data: data,
            httpsAgent: this.agent,
        };
        try {
            const response = await axios_1.default.request(config);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
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