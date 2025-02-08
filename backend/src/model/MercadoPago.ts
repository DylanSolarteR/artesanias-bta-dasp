import MercadoPagoConfig from "mercadopago"

export const clienteMercadoPago = {
    mercadopago: undefined,

    getMercadoPago: function () {
        if (!this.mercadopago) {
            this.mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
        }
        return this.mercadopago
    },
    setMercadoPago: function (accessToken: string) {
        this.mercadopago = new MercadoPagoConfig({ accessToken: accessToken })
    }
}