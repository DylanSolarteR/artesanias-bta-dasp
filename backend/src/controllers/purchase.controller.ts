import { Request, Response } from "express";
import { EcommercePurchase, ProductInPurchase, ProductRequest, Purchase } from "../model/purchase";
import { Criteria, Filter, matchType, Sort } from "../dao/Criteria";
import { InventoryDAOPostgres } from "../dao/implementation/postgresDAO/inventoryDAOPostrgres";
import { Inventory } from "../model/businessTypes";
import { ProductDAOPostgres } from "../dao/implementation/postgresDAO/productDAOPostgres";
import { PurchaseDAOPostgres } from "../dao/implementation/postgresDAO/purchaseDAOPostrgres";



export async function completePurchase(req: Request, res: Response) {
    try {
        let { basicUserData, addressData, productList } = req.body as {
            basicUserData: any; // Cambia `any` al tipo correspondiente
            addressData: any; // Cambia `any` al tipo correspondiente
            productList: Array<{ id: number; quantity: number }>;
        };;

        if (!Purchase.validateDocType(basicUserData.docType)) {
            res.status(400).send('Tipo de documento invalido.')
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
            let criteria = new Criteria({
                filters: [
                    new Filter('pk_fk_product', product.id, matchType.strictEqual),
                    new Filter('ecommerce_available_quantity', 0, matchType.greaterThan),
                ],
                sortBy: [
                    new Sort('ecommerce_available_quantity', false),
                    new Sort('quantity', false)
                ]
            })

            const candidateInventoriesRes = await inventoryDao.query(criteria)
            if (!candidateInventoriesRes.hasResponse()) {
                res.status(500).send(candidateInventoriesRes.error)
                return;
            }
            if (candidateInventoriesRes.value.length == 0) {
                res.status(409).send('No hay stock de los productos solicitados')
                return;
            }

            let demandSatisfied = 0;
            let requiredInventories: Array<{ inv: Inventory, requestQuantity: number }> = []
            for (let inventory of candidateInventoriesRes.value) {
                let requestQuantity = inventory.ecommerceAvailable >= product.quantity - demandSatisfied ?
                    product.quantity - demandSatisfied : inventory.ecommerceAvailable;
                demandSatisfied += requestQuantity;
                requiredInventories.push({ inv: inventory, requestQuantity })

                if (demandSatisfied === product.quantity) {
                    break;
                }
                else if (demandSatisfied > product.quantity) {
                    res.status(409).send('El sistema fue incapaz de asignar los productos a su compra')
                    return;
                }
            }
            if (demandSatisfied < product.quantity) {
                res.status(409).send('No hay stock de los productos solicitados')
                return;
            }

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
                requiredInventories.map((i) => new ProductRequest(i.inv.locationId, i.requestQuantity))
            )
            purchase.addProduct(productPurchase)
        }

        let purchaseDao = new PurchaseDAOPostgres()
        const purchaseRes = await purchaseDao.create(purchase)
        if (!purchaseRes.hasResponse()) {
            res.status(500).send(purchaseRes.error)
            return;
        }

        res.status(200).send({ purchaseId: purchaseRes.value.id })
    } catch (error) {
        res.status(500).send('Error interno')
    }
}