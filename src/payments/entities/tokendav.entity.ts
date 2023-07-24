import { Entity } from 'typeorm';

export class TokenEntity {
  constructor(
    public token_type: string,
    public access_token: string,
    public expires_in: number,
    public scope: string,
  ) {}
}
