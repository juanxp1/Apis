import { HttpStatus, Injectable } from '@nestjs/common';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuyDaviplataDto } from '../../dto/buy-daviplata.dto';
import { OtpDaviplataDto } from '../../dto/otp-daviplata.dto';
import { ConfirmDaviplataDto } from '../../dto/confirm-daviplata.dto';
import { v4 as uuidv4 } from 'uuid';
import { Payment } from '../../entities/payment.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DaviplataService {
  private readonly certPath: string;
  private readonly keyPath: string;
  private readonly agent: https.Agent;
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private configService: ConfigService,
  ) {
    const certsDir = path.join(__dirname, '../../utils/certified/');
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
      const resp = await fetch(
        this.configService.get('URL_BASE_DAVIPLATA') +
          '/oauth2Provider/type1/v1/token',
        options,
      );
      const responseData = await resp.json();
      return this.response(
        HttpStatus.OK,
        'OK',
        'Flujo de Autenticación Exitoso',
        responseData,
        false,
      );
    } catch (error) {
      return this.response(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error',
        'Error en el servidor, intenta nuevamente',
        error,
        true,
      );
    }
  }

  async buy(params: BuyDaviplataDto) {
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
      const resp = await fetch(
        this.configService.get('URL_BASE_DAVIPLATA') + '/daviplata/v1/compra',
        options,
      );
      const responseData = await resp.json();
      if (responseData.httpCode) {
        if (responseData.httpCode == 403) {
          return this.response(
            HttpStatus.FORBIDDEN,
            'Error',
            'Error en la transacción',
            responseData,
            false,
          );
        }
      }
      return this.response(
        HttpStatus.OK,
        'OK',
        'Transacción compra sin error en el flujo',
        responseData,
        false,
      );
    } catch (error) {
      return this.response(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error',
        'Error en el servidor, intenta nuevamente',
        error,
        true,
      );
    }
  }

  // solo para ambiente pruebas
  async otp(params: OtpDaviplataDto) {
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
      const resp = await fetch(
        this.configService.get('URL_BASE_DAVIPLATA') + '/otpSec/v1/read',
        options,
      );
      const responseData = await resp.json();
      return this.response(
        HttpStatus.OK,
        'OK',
        'Transacción otp sin error en el flujo',
        responseData,
        false,
      );
    } catch (error) {
      return this.response(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error',
        'Error en el servidor, intenta nuevamente',
        error,
        true,
      );
    }
  }

  async confirm(params: ConfirmDaviplataDto) {
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
    const id_transaccion = uuidv4();
    try {
      const resp = await fetch(
        this.configService.get('URL_BASE_DAVIPLATA') +
          '/daviplata/v1/confirmarCompra',
        options,
      );
      const responseData = await resp.json();
      console.log(responseData);
      responseData.codePay = id_transaccion;
      if (responseData.estado) {
        if (responseData.estado == 'Aprobado') {
          const pay: Payment = {
            parque_id: params.formPse.parkSelected,
            servicio_id: params.formPse.serviceParkSelected,
            identificacion: params.formPse.document,
            tipo_identificacion: this.getTypeDocument(
              params.formPse.documentTypeSelected,
            ),
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
            // info payer
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
          return this.response(
            HttpStatus.OK,
            'OK',
            'Transacción confirmar compra, sin error en el flujo',
            responseData,
            false,
          );
        } else {
          return this.response(
            HttpStatus.FORBIDDEN,
            'Error',
            'Error en la transacción',
            null,
            false,
          );
        }
      } else {
        return this.response(
          HttpStatus.FORBIDDEN,
          'Error',
          'Error en la transacción',
          responseData,
          false,
        );
      }
    } catch (error) {
      console.log(error);

      return this.response(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error',
        'Error en el servidor, intenta nuevamente',
        error,
        true,
      );
    }
  }

  response(
    statusCode = null,
    status = '',
    message = '',
    data = '',
    Error = false,
  ) {
    const resp = { statusCode, status, message, data, Error };
    return resp;
  }

  getTypePerson(type_person: string) {
    switch (type_person) {
      case 'N':
        return 'NATURAL';
      case 'J':
        return 'JURIDICA';
    }
  }

  getTypeDocument(type: string) {
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
}
