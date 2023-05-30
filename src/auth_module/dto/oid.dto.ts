import { IsString, IsEmail, IsOptional } from 'class-validator';

export class OidDto {
  @IsOptional()
  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
