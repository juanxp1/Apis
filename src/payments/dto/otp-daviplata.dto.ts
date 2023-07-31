import { IsNotEmpty, IsString } from 'class-validator';

export class OtpDaviplataDto {
  @IsString()
  @IsNotEmpty()
  readonly typeDocument: string;

  @IsString()
  @IsNotEmpty()
  readonly numberDocument: string;

  @IsString()
  @IsNotEmpty()
  readonly notificationType: string

}
