import { Request, Response } from "express";
import { EcommercePurchase, ProductInPurchase, ProductRequest, Purchase } from "../model/purchase";
import { Criteria, Filter, matchType, Sort } from "../dao/Criteria";
import { InventoryDAOPostgres } from "../dao/implementation/postgresDAO/inventoryDAOPostgres";
import { Inventory } from "../model/businessTypes";
import { ProductDAOPostgres } from "../dao/implementation/postgresDAO/productDAOPostgres";
import { PurchaseDAOPostgres } from "../dao/implementation/postgresDAO/purchaseDAOPostrgres";



export async function initializePurchase(req: Request, res: Response) {
    try {
        let { basicUserData, addressData, productList } = req.body as {
            basicUserData: any; // Cambia `any` al tipo correspondiente
            addressData: any; // Cambia `any` al tipo correspondiente
            productList: Array<{ id: number; quantity: number }>;
        };

        if (!Purchase.validateDocType(basicUserData.docType)) {
            res.status(400).send('Tipo de documento invalido.')
            return
        }
        let purchase = new EcommercePurchase(
            new Date(),
            basicUserData.email,
            basicUserData.name,
            basicUserData.docType,
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
            purchase.addProduct(productPurchase)
        }

        let purchaseDao = new PurchaseDAOPostgres()
        const purchaseRes = await purchaseDao.initializePurchase(purchase)
        if (!purchaseRes.hasResponse()) {
            res.status(500).send(purchaseRes.error)
            return;
        }

        res.status(200).send({ purchaseId: purchaseRes.value.id })
    } catch (error) {
        res.status(500).send('Error interno')
    }
}

export async function completePurchase(req: Request, res: Response) {
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
    if (purchase.isComplete) {
        res.status(500).send('La compra ya ha sido completada')
        return
    }
    purchaseDao.completePurchase(purchase)

    res.status(200).send('Compra completada')

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