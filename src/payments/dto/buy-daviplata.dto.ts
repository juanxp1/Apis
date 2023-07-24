import { IsNotEmpty, IsString } from 'class-validator';

export class BuyDaviplataDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  readonly value: number;

  @IsString()
  @IsNotEmpty()
  readonly document: string;

  @IsString()
  @IsNotEmpty()
  readonly typeDocument: string
}
