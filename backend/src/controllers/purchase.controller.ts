import { Request, Response } from "express";
import { EcommercePurchase, PhysicalPurchase, ProductInPurchase, ProductRequest, Purchase } from "../model/purchase";
import { Criteria, Filter, matchType, Sort } from "../dao/Criteria";
import { InventoryDAOPostgres } from "../dao/implementation/postgresDAO/inventoryDAOPostgres";
import { docTypes } from "../model/businessTypes";
import { ProductDAOPostgres } from "../dao/implementation/postgresDAO/productDAOPostgres";
import { PurchaseDAOPostgres } from "../dao/implementation/postgresDAO/purchaseDAOPostrgres";
import z from "zod";
import { EmployeeDAOPostgres } from "../dao/implementation/postgresDAO/employeeDAOPostrgres";
import { Preference, Payment } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { clienteMercadoPago } from "../model/MercadoPago";
import { MailSender } from '../utils/EmailSender';
import fs from 'fs';
import Handlebars from "handlebars";
import inlineCss from "inline-css";

const docTypeValues = Object.values(docTypes) as [string, ...string[]]

const billTemplate = Handlebars.compile(fs.readFileSync("src/templates/mail/bill.html", "utf8"))
async function sendBill(purchase: Purchase) {
    let content = ''

    const products = []
    const productDao = new ProductDAOPostgres()
    for (let product of purchase.products) {
        const productRes = await productDao.query(new Criteria({
            filters: [new Filter('product.pk_id', product.productId, matchType.strictEqual)]
        }))
        const productDetails = productRes.value[0]
        products.push({
            name: productDetails.name,
            quantity: product.quantity,
            price: product.unitPrice,
            subtotal: product.quantity * product.unitPrice
        })
    }

    const total = products.reduce((acc, product) => acc + product.subtotal, 0)
    const rendered = billTemplate({
        name: purchase.name,
        id: purchase.id,
        products,
        total
    })

    const renderedWithStyles = await inlineCss(rendered, { url: '/', })

    const mailSender = new MailSender()
    await mailSender.sendMail({
        to: purchase.email,
        subject: 'Factura de compra en artesaniasbogota.shop #' + purchase.id,
        html: renderedWithStyles
    })
}


const basicUserDataSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    name: z.string({ message: 'Nombre inválido' }).trim()
        .nonempty({ message: 'Nombre vacio' })
        .min(3, 'Nombre inválido'),
    docType: z.enum(docTypeValues, {
        message: 'Tipo de documento inválido'
    }),
    identification: z.preprocess(value => String(value).replace(/^0+/g, ''),
        z.string()
            .regex(/^\d+$/, { message: 'La identificación inválida' })
            .refine(value => parseInt(value) > 0, { message: 'La identificación debe ser mayor a 0' })
            .and(z.string().min(1, { message: 'Identificación inválida' })
                .max(15, { message: 'Identificación inválida' }))
    ),
    telephone: z.preprocess(value => String(value).replace(/^0+/g, ''),
        z.string()
            .regex(/^\d+$/, { message: 'Teléfono inválido' })
            .refine(value => parseInt(value) > 0, { message: 'El teléfono debe ser mayor a 0' })
    )
});

const addressDataSchema = z.object({
    departmentId: z.number({ message: 'El id del departamento es requerido' }).min(1),
    deliveryAddress:
        z.string({ message: 'Dirección inválida' }).trim()
            .min(5, { message: 'La dirección tiene un largo minimo de 5 carácteres' })
            .max(55, { message: 'La dirección tiene un largo maximo de 55 carácteres' }),
    zipCode: z.preprocess(value => String(value).replace(/^0+/g, ''),
        z.string()
            .regex(/^\d+$/, { message: 'Código postal inválido' })
            .refine(value => parseInt(value) > 0, { message: 'El código postal debe ser mayor a 0' }))
});

const productSchema = z.object({
    id: z.number({ message: 'La id del producto es requerida' }).min(1),
    quantity: z.number({ message: 'La cantidad del producto es requerida' }).min(1)
});

interface PRODUCT_ONLINE {
    id: number;
    quantity: number;
    unit_price: number;
    title: string;
}

const ecommercePurchaseSchema = z.object({
    basicUserData: basicUserDataSchema,
    addressData: addressDataSchema,
    productList: z.array(productSchema)
});

const posPurchaseSchema = z.object({
    basicUserData: basicUserDataSchema,
    productList: z.array(productSchema),
    locationId: z.number({ message: 'La id del punto físico es requerida' }).min(1)
});

export async function initializePurchase(req: Request, res: Response) {
    try {
        const validateResult = ecommercePurchaseSchema.safeParse(req.body)

        if (!validateResult.success) {
            console.log(validateResult.error.errors[0].path)
            const errors = validateResult.error.errors.map((error) => `${error.message}`)
            res.status(400).send('Los datos enviados no son correctos.\n' + errors.join('\n'))
            return
        }

        let { basicUserData, addressData, productList } = validateResult.data


        let purchase = new EcommercePurchase(
            new Date(),
            basicUserData.email,
            basicUserData.name,
            basicUserData.docType as docTypes,
            basicUserData.identification,
            basicUserData.telephone,
            null,
            addressData.departmentId,
            null,
            addressData.deliveryAddress,
            addressData.zipCode
        )

        let inventoryDao = new InventoryDAOPostgres()
        let productDao = new ProductDAOPostgres()
        const items: PRODUCT_ONLINE[] = []
        for (let product of productList) {
            let productDetailsRes = (await productDao.query(new Criteria(
                {
                    filters: [new Filter('product.pk_id', product.id, matchType.strictEqual)]

                })))
            if (!productDetailsRes.hasResponse()) {
                res.status(500).send('No se encontró el producto que desea comprar')
                return;
            }
            let productDetails = productDetailsRes.value[0]
            let productPurchase = new ProductInPurchase(
                product.id,
                product.quantity,
                productDetails.price,
            )
            items.push({
                id: product.id,
                quantity: product.quantity,
                unit_price: productDetails.price,
                title: productDetails.name
            })
            purchase.addProduct(productPurchase)
        }

        let purchaseDao = new PurchaseDAOPostgres()
        const purchaseRes = await purchaseDao.initializePurchase(purchase)
        if (!purchaseRes.hasResponse()) {
            res.status(500).send(purchaseRes.error)
            return;
        }
        //Integracion con mercado pago

        const preference = await new Preference(clienteMercadoPago.getMercadoPago()).create({
            body: {
                items: items.map((item) => {
                    return {
                        id: String(item.id),
                        title: item.title,
                        quantity: item.quantity,
                        currency_id: 'COP',
                        unit_price: Math.round(item.unit_price)
                    }
                }) as Items[]
                ,
                metadata: {
                    purchase_id: purchaseRes.value.id,
                },
                back_urls: {
                    success: process.env.FRONT_URL,
                    failure: process.env.FRONT_URL + '/carrito'
                }
            },
        });


        res.status(200).send({ purchaseId: purchaseRes.value.id, url: preference.init_point })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error interno')
    }
}

export async function completePurchase(req: Request, res: Response) {
    if (!req.body.data.id) {
        res.status(400).send('No se envió el id de la compra')
        return
    }
    const purchaseIdMercadoPago = req.body.data.id
    try {
        const payment = await new Payment(clienteMercadoPago.getMercadoPago()).get({ id: purchaseIdMercadoPago });
        if (payment.status === "approved") {

            const purchaseId = payment.metadata.purchase_id
            let purchaseDao = new PurchaseDAOPostgres()
            let purchaseRes = await purchaseDao.query(new Criteria({
                filters: [new Filter('purchase.pk_id', purchaseId, matchType.strictEqual)]
            }))
            if (!purchaseRes.hasResponse()) {
                res.status(500).send('No se encontró la compra')
                return
            }
            if (purchaseRes.value.length === 0) {
                res.status(500).send('No se encontró la compra')
                return
            }
            let purchase = purchaseRes.value[0]
            if (!(purchase instanceof EcommercePurchase)) {
                res.status(500).send('La compra no es de tipo ecommerce')
                return
            }
            if (purchase.isComplete) {
                res.status(500).send('La compra ya ha sido completada')
                return
            }
            purchaseDao.completePurchase(purchase)

            res.status(200).send('Compra completada')
            sendBill(purchase)
        }
        res.status(200)
    } catch (e) {
        console.log(e)
    }

}

export async function rejectPurchase(req: Request, res: Response) {
    if (!req.body.purchaseId) {
        res.status(400).send('No se envió el id de la compra')
        return
    }
    let purchaseId = req.body.purchaseId
    let purchaseDao = new PurchaseDAOPostgres()
    let purchaseRes = await purchaseDao.query(new Criteria({
        filters: [new Filter('purchase.pk_id', purchaseId, matchType.strictEqual)]
    }))
    if (!purchaseRes.hasResponse()) {
        res.status(500).send('No se encontró la compra')
        return
    }
    if (purchaseRes.value.length === 0) {
        res.status(500).send('No se encontró la compra')
        return
    }
    let purchase = purchaseRes.value[0]
    if (!(purchase instanceof EcommercePurchase)) {
        res.status(500).send('La compra no es de tipo ecommerce')
        return
    }
    let rejectRes = await purchaseDao.rejectPurchase(purchase)
    if (!rejectRes.hasResponse()) {
        res.status(500).send(rejectRes.error)
        return
    }

    res.status(200).send('Compra cancelada')

}

export async function completePosPurchase(req: Request, res: Response) {
    const userId = req['user_id'] //Require verifyAuth middleware
    let validationResult = posPurchaseSchema.safeParse(req.body)
    if (!validationResult.success) {
        const errors = validationResult.error.errors.map((error) => `${error.message}`)
        res.status(400).send('Los datos enviados no son correctos.\n' + errors.join('\n'))
        return
    }

    const { basicUserData, productList, locationId } = validationResult.data

    const employeeDao = new EmployeeDAOPostgres()
    const employeeRes = await employeeDao.query(new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    }))

    if (!employeeRes.hasResponse()) {
        res.status(500).send('Error interno al identificar al empleado')
        return
    }

    if (employeeRes.value.length !== 1) {
        res.status(401).send('El empleado no existe')
        return
    }

    const employee = employeeRes.value[0]

    const purchase = new PhysicalPurchase(
        new Date(),
        basicUserData.email,
        basicUserData.name,
        basicUserData.docType as docTypes,
        basicUserData.identification,
        basicUserData.telephone,
        null,
        employee.id,
    )

    let productDao = new ProductDAOPostgres()
    for (let product of productList) {
        let productDetailsRes = (await productDao.query(new Criteria(
            {
                filters: [new Filter('product.pk_id', product.id, matchType.strictEqual)]

            })))
        if (!productDetailsRes.hasResponse()) {
            res.status(500).send('No se encontró el producto que desea comprar')
            return;
        }
        let productDetails = productDetailsRes.value[0]
        let productPurchase = new ProductInPurchase(
            product.id,
            product.quantity,
            productDetails.price,
            [new ProductRequest(locationId, product.quantity)]
        )
        purchase.addProduct(productPurchase)
    }

    const purchaseDao = new PurchaseDAOPostgres()
    const purchaseRes = await purchaseDao.completePosPurchase(purchase)
    if (!purchaseRes.hasResponse()) {
        res.status(500).send(purchaseRes.error)
        return
    }

    const completePurchase = purchaseRes.value

    res.status(200).send(completePurchase)
    await sendBill(purchase)
}