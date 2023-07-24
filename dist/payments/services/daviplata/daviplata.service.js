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
const node_fetch_1 = require("node-fetch");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const payment_entity_1 = require("../../entities/payment.entity");
const config_1 = require("@nestjs/config");
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
    async auth() {
        const data = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: this.configService.get('CLIENT_ID'),
            client_secret: this.configService.get('CLIENT_SECRET'),
            scope: 'daviplata',
        });
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
            agent: this.agent,
        };
        try {
            const resp = await (0, node_fetch_1.default)(this.configService.get('URL_BASE_DAVIPLATA') +
                '/oauth2Provider/type1/v1/token', options);
            const responseData = await resp.json();
            return this.response(common_1.HttpStatus.OK, 'OK', 'Flujo de Autenticación Exitoso', responseData, false);
        }
        catch (error) {
            return this.response(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error', 'Error en el servidor, intenta nuevamente', error, true);
        }
    }
    async buy(params) {
        const data = {
            valor: params.value,
            numeroIdentificacion: params.document,
            tipoDocumento: params.typeDocument,
        };
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + params.token,
                'Content-Type': 'application/json',
                'x-ibm-client-id': this.configService.get('CLIENT_ID'),
            },
            body: JSON.stringify(data),
            agent: this.agent,
        };
        try {
            const resp = await (0, node_fetch_1.default)(this.configService.get('URL_BASE_DAVIPLATA') + '/daviplata/v1/compra', options);
            const responseData = await resp.json();
            if (responseData.httpCode) {
                if (responseData.httpCode == 403) {
                    return this.response(common_1.HttpStatus.FORBIDDEN, 'Error', 'Error en la transacción', responseData, false);
                }
            }
            return this.response(common_1.HttpStatus.OK, 'OK', 'Transacción compra sin error en el flujo', responseData, false);
        }
        catch (error) {
            return this.response(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error', 'Error en el servidor, intenta nuevamente', error, true);
        }
    }
    async otp(params) {
        const data = {
            typeDocument: params.typeDocument,
            numberDocument: params.numberDocument,
            notificationType: 'API_DAVIPLATA',
        };
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-ibm-client-id': this.configService.get('CLIENT_ID'),
            },
            body: JSON.stringify(data),
            agent: this.agent,
        };
        try {
            const resp = await (0, node_fetch_1.default)(this.configService.get('URL_BASE_DAVIPLATA') + '/otpSec/v1/read', options);
            const responseData = await resp.json();
            return this.response(common_1.HttpStatus.OK, 'OK', 'Transacción otp sin error en el flujo', responseData, false);
        }
        catch (error) {
            return this.response(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error', 'Error en el servidor, intenta nuevamente', error, true);
        }
    }
    async confirm(params) {
        const data = {
            otp: params.otp,
            idSessionToken: params.idSessionToken,
            idComercio: this.configService.get('IDCOMERCIO'),
            idTerminal: this.configService.get('IDTERMINAL'),
            idTransaccion: Math.floor(Math.random() * (999999 - 1 + 1)) + 1,
        };
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + params.token,
                'Content-Type': 'application/json',
                'x-ibm-client-id': this.configService.get('CLIENT_ID'),
            },
            body: JSON.stringify(data),
            agent: this.agent,
        };
        const id_transaccion = (0, uuid_1.v4)();
        try {
            const resp = await (0, node_fetch_1.default)(this.configService.get('URL_BASE_DAVIPLATA') +
                '/daviplata/v1/confirmarCompra', options);
            const responseData = await resp.json();
            console.log(responseData);
            responseData.codePay = id_transaccion;
            if (responseData.estado) {
                if (responseData.estado == 'Aprobado') {
                    const pay = {
                        parque_id: params.formPse.parkSelected,
                        servicio_id: params.formPse.serviceParkSelected,
                        identificacion: params.formPse.document,
                        tipo_identificacion: this.getTypeDocument(params.formPse.documentTypeSelected),
                        codigo_pago: id_transaccion,
                        id_transaccion_pse: 'DAVIPLATA-' + responseData.numAprobacion,
                        tipo_persona: this.getTypePerson(params.formPse.typePersonSelected),
                        razon_social: params.formPse.socialReason
                            ? params.formPse.socialReason.toUpperCase()
                            : null,
                        codigo_verificacion: params.formPse.codeVerification
                            ? params.formPse.codeVerification
                            : null,
                        direccion: params.formPse.address.toUpperCase(),
                        email: params.formPse.email.toUpperCase(),
                        nombre: params.formPse.name.toUpperCase(),
                        apellido: params.formPse.lastName.toUpperCase(),
                        telefono: params.formPse.phone,
                        tipo_persona_pagador: params.formPse.typePersonSelectedPayer
                            ? this.getTypePerson(params.formPse.typePersonSelectedPayer)
                            : null,
                        razon_social_pagador: params.formPse.socialReasonPayer
                            ? params.formPse.socialReasonPayer.toUpperCase()
                            : null,
                        direccion_pagador: params.formPse.addressPayer
                            ? params.formPse.addressPayer.toUpperCase()
                            : null,
                        tipo_identificacion_pagador: params.formPse
                            .documentTypeSelectedPayer
                            ? this.getTypeDocument(params.formPse.documentTypeSelectedPayer)
                            : null,
                        identificacion_pagador: params.formPse.documentPayer
                            ? params.formPse.documentPayer
                            : null,
                        email_pagador: params.formPse.emailPayer
                            ? params.formPse.emailPayer
                            : null,
                        nombre_pagador: params.formPse.namePayer
                            ? params.formPse.namePayer
                            : null,
                        apellido_pagador: params.formPse.lastNamePayer
                            ? params.formPse.lastNamePayer
                            : null,
                        telefono_pagador: params.formPse.phonePayer
                            ? params.formPse.phonePayer
                            : null,
                        codigo_banco_seleccionado: '1551',
                        estado_id: 2,
                        estado_banco: 'OK',
                        concepto: params.formPse.concept.toUpperCase(),
                        moneda: 'COP',
                        total: params.formPse.totalPay,
                        iva: 0,
                        permiso: params.formPse.permitNumber,
                        tipo_permiso: params.formPse.permitTypeSelected,
                        id_reserva: params.formPse.reservationId,
                        fecha_pago: null,
                        user_id_pse: 'DAVIPLATA' + params.formPse.document,
                        medio_id: 6,
                        created_at: new Date(),
                        updated_at: new Date(),
                    };
                    const payment = this.paymentRepository.create(pay);
                    await this.paymentRepository.save(payment);
                    return this.response(common_1.HttpStatus.OK, 'OK', 'Transacción confirmar compra, sin error en el flujo', responseData, false);
                }
                else {
                    return this.response(common_1.HttpStatus.FORBIDDEN, 'Error', 'Error en la transacción', null, false);
                }
            }
            else {
                return this.response(common_1.HttpStatus.FORBIDDEN, 'Error', 'Error en la transacción', responseData, false);
            }
        }
        catch (error) {
            console.log(error);
            return this.response(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error', 'Error en el servidor, intenta nuevamente', error, true);
        }
    }
    response(statusCode = null, status = '', message = '', data = '', Error = false) {
        const resp = { statusCode, status, message, data, Error };
        return resp;
    }
    getTypePerson(type_person) {
        switch (type_person) {
            case 'N':
                return 'NATURAL';
            case 'J':
                return 'JURIDICA';
        }
    }
    getTypeDocument(type) {
        switch (type) {
            case 'CC':
                return 1;
                break;
            case 'TI':
                return 2;
                break;
            case 'NIT':
                return 7;
                break;
            case 'CE':
                return 4;
                break;
            case 'PP':
                return 6;
                break;
            case 'RC':
                return 3;
                break;
            default:
                return 14;
                break;
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