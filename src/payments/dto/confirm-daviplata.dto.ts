import { IsNotEmpty, IsString, IsNumber, isString } from 'class-validator';

export class ConfirmDaviplataDto {
  @IsString()
  
  readonly otp: string;

  @IsString()
  
  readonly idSessionToken: string;

  @IsString()

  readonly idComercio: string;

  @IsString()

  readonly idTerminal: string;

  @IsNumber()
  
  readonly idTransaccion: number;
}
