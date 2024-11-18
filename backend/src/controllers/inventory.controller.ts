import { Request, Response } from 'express';
import { InventoryDAOPostgres } from '../dao/implementation/postgresDAO/inventoryDAOPostgres';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Inventory } from '../model/businessTypes';


export async function createInventory(req: Request, res: Response) {

    let productId, physicalLocationId, quantity, displayquantity, ecommerceAvailable;

    const dao = new InventoryDAOPostgres();
    try {
        ({ productId, physicalLocationId, quantity, displayquantity } = req.body);
    }
    catch (e) {
        res.status(400).send('product id, physical Location Id, quantity and display quantity are required')
        return
    }

    const newInventory = new Inventory(
        productId,
        physicalLocationId,
        quantity,
        displayquantity,
        ecommerceAvailable    )

    let insertResult = await dao.create(newInventory)
    if (!insertResult.hasResponse()) {
        res.status(500).send(insertResult.error)
        return
    }

    let inventory = insertResult.value
    console.log('final:', inventory)

    res.status(200).send({ inventory })
}
    
export async function updateInventory(req: Request, res: Response) {

    let productId, physicalLocationId, quantity, displayquantity, ecommerceavailable;

    const dao = new InventoryDAOPostgres();
    try {
        ({ productId, physicalLocationId, quantity } = req.body);
    }
    catch (e) {
        res.status(400).send('Product Id, Physical location Id and quantity are required')
        return
    }

    const newInventory = new Inventory(
        productId,
        physicalLocationId, 
        quantity,
        displayquantity,
        ecommerceavailable
    )

    let insertResult = await dao.decreaseQuantity(newInventory)
    if (insertResult == false) {
        res.status(500).send("Error")
        return
    }

    res.status(200).send({ "Product remove" })
}

