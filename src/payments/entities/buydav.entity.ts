import { Entity } from 'typeorm';

export class BuyEntity {
    constructor(
        public idSessionToken: string,
        public fechaExpiracionToken: string,
    ) { }
}



