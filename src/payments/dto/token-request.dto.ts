// token-request.dto.ts

import { IsNotEmpty } from 'class-validator';

export class TokenRequestDto {
  @IsNotEmpty()
  grant_type: string;

  @IsNotEmpty()
  client_id: string;

  @IsNotEmpty()
  client_secret: string;

  @IsNotEmpty()
  scope: string;
}
