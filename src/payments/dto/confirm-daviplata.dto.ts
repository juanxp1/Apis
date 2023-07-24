import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmDaviplataDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  readonly otp: number;

  @IsString()
  @IsNotEmpty()
  readonly idSessionToken: string;

  @IsNotEmpty()
  readonly formPse: any;
}
