
import { PoolClient } from "pg";
import { docTypes, Inventory } from "../../../model/businessTypes";
import { Purchase, EcommercePurchase, PhysicalPurchase, ProductInPurchase, ProductRequest } from "../../../model/purchase";
import { Criteria, Filter, matchType, Sort } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { PostgresConnection } from "../postgresConnection";
import { InventoryDAOPostgres } from "./inventoryDAOPostgres";
import { ProductDAOPostgres } from "./productDAOPostgres";

export class PurchaseDAOPostgres implements IDAO<Purchase> {

    // Use for physical purchases
    async create(purchase: Purchase): Promise<ObjectResponse<Purchase>> {
        const insertPurchase = `INSERT INTO purchase(
            date, email, name, doc_type, identification, telephone)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`

        let client = await PostgresConnection.getInstance().getClient()
        try {
            await client.query('BEGIN')
            await client.query('LOCK TABLE inventory IN SHARE MODE')
            let purchaseInsertRes = await client.query({
                text: insertPurchase,
                values: [
                    purchase.date,
                    purchase.email,
                    purchase.name,
                    purchase.docType,
                    purchase.identification,
                    purchase.telephone,
                ]
            })

            purchase.id = purchaseInsertRes.rows[0].pk_id;

            if (purchaseInsertRes.rowCount !== 1) {
                await client.query('ROLLBACK');
                return new ObjectResponse(false, null, 'Error al crear la compra')
            }

            if (purchase instanceof EcommercePurchase) {
                const insertEcomPurchase = `INSERT INTO ecommerce_purchase(
                pk_fk_purchase, fk_department, delivery_address, zip_code, isComplete)
                VALUES ($1, $2, $3, $4) RETURNING *;`
                let ecomPurchaseInsertRes = await client.query({
                    text: insertEcomPurchase,
                    values: [
                        purchase.id,
                        purchase.departmentId,
                        purchase.deliveryAddress,
                        purchase.zipCode,
                        false
                    ]
                })
                if (ecomPurchaseInsertRes.rowCount !== 1) {
                    await client.query('ROLLBACK');
                    return new ObjectResponse(false, null, 'Error al registrar los detalles de la compra')
                }
            }
            else if (purchase instanceof PhysicalPurchase) {
                const insertPhysicalPurchase = `INSERT INTO physical_purchase(
                pk_fk_purchase, fk_employee)
                VALUES ($1, $2) RETURNING *;`
                let physicalPurchaseInsertRes = await client.query({
                    text: insertPhysicalPurchase,
                    values: [
                        purchase.id,
                        purchase.employeeId
                    ]
                })
                if (physicalPurchaseInsertRes.rowCount !== 1) {
                    await client.query('ROLLBACK');
                    return new ObjectResponse(false, null, 'Error al registrar los detalles de la compra')
                }
            }
            else {
                // This should not be able to happen
                throw Error('Invalid purchase implementation')
            }

            const insertProductPurchase = `INSERT INTO product_in_purchase(
                        pk_fk_product, pk_fk_purchase, quantity, unit_price)
                        VALUES ($1, $2, $3, $4) RETURNING *;`
            const insertProductRequestPurchase = `INSERT INTO product_request(
                        pk_fk_product, pk_fk_purchase, pk_fk_physical_location, quantity, request_complete)
                        VALUES ($1, $2, $3, $4, $5) RETURNING *;`
            for (let product of purchase.products) {
                let productInsertRes = await client.query({
                    text: insertProductPurchase,
                    values: [
                        product.productId,
                        purchase.id,
                        product.quantity,
                        product.unitPrice,
                    ]
                })
                if (productInsertRes.rowCount !== 1) {
                    await client.query('ROLLBACK');
                    return new ObjectResponse(false, null,
                        `Error al añadir el producto con id ${product.productId} a la compra`
                    )
                }

                for (let request of product.productRequests) {
                    let requestInsertRes = await client.query({
                        text: insertProductRequestPurchase,
                        values: [
                            product.productId,
                            purchase.id,
                            request.locationId,
                            request.quantity,
                            purchase instanceof PhysicalPurchase
                        ]
                    })
                    if (requestInsertRes.rowCount !== 1) {
                        await client.query('ROLLBACK');
                        return new ObjectResponse(false, null,
                            `Fallo al solicitar el producto ${product.productId}\n` +
                            `al punto fisico con id ${request.locationId}`
                        )
                    }

                    // Update inventory for physical purchases
                    if (purchase instanceof PhysicalPurchase) {
                        const updateInventory = `UPDATE inventory
                            SET quantity = quantity-$1, display_quantity = display_quantity-$1
                            WHERE pk_fk_product = $2 AND pk_fk_physical_location = $3;`
                        let inventoryUpdateRes = await client.query({
                            text: updateInventory,
                            values: [
                                request.quantity,
                                product.productId,
                                request.locationId,
                            ]
                        })
                        if (inventoryUpdateRes.rowCount !== 1) {
                            await client.query('ROLLBACK');
                            return new ObjectResponse(false, null,
                                `Fallo al actualizar el inventario`
                            )
                        }
                    }
                    else { // Update ecommerce avaialablity
                        const updateInventory = `UPDATE inventory
                            SET ecommerce_available_quantity = ecommerce_available_quantity-$1
                            WHERE pk_fk_product = $2 AND pk_fk_physical_location = $3;`
                        let inventoryUpdateRes = await client.query({
                            text: updateInventory,
                            values: [
                                request.quantity,
                                product.productId,
                                request.locationId,
                            ]
                        })
                        if (inventoryUpdateRes.rowCount !== 1) {
                            await client.query('ROLLBACK');
                            return new ObjectResponse(false, null,
                                `Fallo al actualizar el inventario`
                            )
                        }
                    }
                }
            }

            await client.query('COMMIT')
            return new ObjectResponse(true, purchase, null)

        }
        catch (e) {
            await client.query('ROLLBACK');
            return new ObjectResponse(false, null,
                'Falla al registrar la compra.\n' +
                (!e.constraint ? e.message ?? '' : '')
            )
        }
        finally {
            client.release()
        }
    }

    async query(criteria: Criteria): Promise<ObjectResponse<Purchase[]>> {
        throw Error('Unimplemented')
    }

    async delete(object: Purchase): Promise<boolean> {
        throw Error('Unimplemented')
    }

    async update(object: Purchase): Promise<boolean> {
        throw Error('Unimplemented')
    }

    async initializePurchase(purchase: EcommercePurchase): Promise<ObjectResponse<Purchase>> {
        const insertPurchase = `INSERT INTO purchase(
                date, email, name, doc_type, identification, telephone)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`

        let client = await PostgresConnection.getInstance().getClient()
        try {
            await client.query('BEGIN')
            await client.query('LOCK TABLE inventory IN SHARE ROW EXCLUSIVE MODE')

            let productsWithInventory;
            try {
                productsWithInventory = await this.findInventoryCandidates(purchase.products, client)
            } catch (error) {
                return new ObjectResponse(false, null, error.message);
            }
            purchase.products = productsWithInventory;

            // INSERT BASE PURCHASE
            let purchaseInsertRes = await client.query({
                text: insertPurchase,
                values: [
                    purchase.date,
                    purchase.email,
                    purchase.name,
                    purchase.docType,
                    purchase.identification,
                    purchase.telephone,
                ]
            })

            if (purchaseInsertRes.rowCount !== 1) {
                await client.query('ROLLBACK');
                return new ObjectResponse(false, null, 'Error al crear la compra')
            }
            purchase.id = purchaseInsertRes.rows[0].pk_id;

            // INSERT ECOMMERCE PURCHASE GENERALIZATION
            const insertEcomPurchase = `INSERT INTO ecommerce_purchase(
                    pk_fk_purchase, fk_department, delivery_address, zip_code, is_complete)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *;`
            let ecomPurchaseInsertRes = await client.query({
                text: insertEcomPurchase,
                values: [
                    purchase.id,
                    purchase.departmentId,
                    purchase.deliveryAddress,
                    purchase.zipCode,
                    false
                ]
            })
            if (ecomPurchaseInsertRes.rowCount !== 1) {
                await client.query('ROLLBACK');
                return new ObjectResponse(false, null, 'Error al registrar los detalles de la compra')
            }


            const insertProductPurchase = `INSERT INTO product_in_purchase(
                            pk_fk_product, pk_fk_purchase, quantity, unit_price)
                            VALUES ($1, $2, $3, $4) RETURNING *;`;
            const insertProductRequestPurchase = `INSERT INTO product_request(
                            pk_fk_product, pk_fk_purchase, pk_fk_physical_location, quantity, request_complete)
                            VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

            // INSERT PRODUCTS AND PRODUCT REQUESTS
            for (let product of purchase.products) {
                let productInsertRes = await client.query({
                    text: insertProductPurchase,
                    values: [
                        product.productId,
                        purchase.id,
                        product.quantity,
                        product.unitPrice,
                    ]
                })
                if (productInsertRes.rowCount !== 1) {
                    await client.query('ROLLBACK');
                    return new ObjectResponse(false, null,
                        `Error al añadir el producto con id ${product.productId} a la compra`
                    )
                }

                for (let request of product.productRequests) {
                    let requestInsertRes = await client.query({
                        text: insertProductRequestPurchase,
                        values: [
                            product.productId,
                            purchase.id,
                            request.locationId,
                            request.quantity,
                            purchase instanceof PhysicalPurchase
                        ]
                    })
                    if (requestInsertRes.rowCount !== 1) {
                        await client.query('ROLLBACK');
                        return new ObjectResponse(false, null,
                            `Fallo al solicitar el producto ${product.productId}\n` +
                            `al punto fisico con id ${request.locationId}`
                        )
                    }

                    // Update ecommerce avaialablity
                    const updateInventory = `UPDATE inventory
                                SET ecommerce_available_quantity = ecommerce_available_quantity-$1
                                WHERE pk_fk_product = $2 AND pk_fk_physical_location = $3;`
                    let inventoryUpdateRes = await client.query({
                        text: updateInventory,
                        values: [
                            request.quantity,
                            product.productId,
                            request.locationId,
                        ]
                    })
                    if (inventoryUpdateRes.rowCount !== 1) {
                        await client.query('ROLLBACK');
                        return new ObjectResponse(false, null,
                            `Fallo al actualizar el inventario`
                        )
                    }
                }
            }

            await client.query('COMMIT')
            return new ObjectResponse(true, purchase, null)

        }
        catch (e) {
            await client.query('ROLLBACK');
            return new ObjectResponse(false, null,
                'Falla al registrar la compra.\n' +
                (!e.constraint ? e.message ?? '' : '')
            )
        }
        finally {
            client.release()
        }
    }

    private async findInventoryCandidates(products: ProductInPurchase[], client: PoolClient): Promise<ProductInPurchase[]> {
        let inventoryDao = new InventoryDAOPostgres();
        let productDao = new ProductDAOPostgres();
        let result: ProductInPurchase[] = [];
        for (let product of products) {
            let criteria = new Criteria({
                filters: [
                    new Filter('pk_fk_product', product.productId, matchType.strictEqual),
                    new Filter('ecommerce_available_quantity', 0, matchType.greaterThan),
                ],
                sortBy: [
                    new Sort('ecommerce_available_quantity', false),
                    new Sort('quantity', false)
                ]
            })

            const candidateInventoriesRes = await inventoryDao.query(criteria)
            if (!candidateInventoriesRes.hasResponse()) {
                throw new Error('No se pudo consultar la disponibilidad de los productos')
            }
            if (candidateInventoriesRes.value.length == 0) {
                throw new Error(`No hay stock de para el producto con id: ${product.productId}`)
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
                    throw new Error('El sistema fue incapaz de asignar los productos a su compra')
                }
            }
            if (demandSatisfied < product.quantity) {
                throw new Error(`No hay stock de para el producto con id: ${product.productId}`)
            }

            let productDetailsRes = (await productDao.query(new Criteria(
                {
                    filters: [new Filter('product.pk_id', product.productId, matchType.strictEqual)]

                })))
            if (!productDetailsRes.hasResponse()) {
                throw new Error('No se encontró el producto que desea comprar')
            }
            let productDetails = productDetailsRes.value[0]
            let productPurchase = new ProductInPurchase(
                product.productId,
                product.quantity,
                productDetails.price,
                requiredInventories.map((i) => new ProductRequest(i.inv.locationId, i.requestQuantity))
            )
            result.push(productPurchase)
        }
        return result;
    }
}

export async function test() {
    let compra1 = new EcommercePurchase(
        new Date(),
        'pepe@gmail.com',
        'Comprador1',
        docTypes.cc,
        '111',
        '313',
        null,
        1,
        null,
        'Carrera compra1',
        '123',
        [new ProductInPurchase(1, 3, 4000, [new ProductRequest(1, 2), new ProductRequest(2, 1)])]
    )
    let com1prod2 = new ProductInPurchase(2, 4, 1111);
    com1prod2.addProductRequest(new ProductRequest(1, 2));
    com1prod2.addProductRequest(new ProductRequest(2, 2));
    compra1.addProduct(com1prod2)

    let dao = new PurchaseDAOPostgres()
    let rcomp1 = await dao.create(compra1)

    let compra2 = new PhysicalPurchase(
        new Date(),
        'james@si.com',
        'yeims',
        docTypes.ce,
        '888',
        '317',
        null,
        3,
        [new ProductInPurchase(3, 5, 1000, [new ProductRequest(2, 5, true)]),
        new ProductInPurchase(4, 6, 10000, [new ProductRequest(2, 6, true)]),
        ]
    )

    let rcomp2 = await dao.create(compra2)
    console.log()
}


export async function test2() {
    let query = `UPDATE inventory
	SET quantity = quantity-$1, display_quantity = display_quantity-$1
	WHERE pk_fk_product = 1;`

    let pool = await PostgresConnection.getInstance().getPool();
    let res = await pool.query({
        text: query,
        values: [
            5
        ]
    });

    console.log()
}