import { IsNotEmpty, IsString, IsNumber, isString } from 'class-validator';

export class BuyDaviplataDto {
  @IsString()
  @IsNotEmpty()
  readonly valor: string;

  @IsString()
  @IsNotEmpty()
  readonly numeroIdentificacion: string;

  @IsString()
  @IsNotEmpty()
  readonly tipoDocumento: string;
}


