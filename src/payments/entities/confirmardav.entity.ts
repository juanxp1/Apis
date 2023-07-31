


export class ConfirmBuyEntity {
    constructor(
        public fechaTransaccion: string,
        public estado: string,
        public numAprobacion: string,
        public idTransaccionAutorizador: string,
    ) { }
}