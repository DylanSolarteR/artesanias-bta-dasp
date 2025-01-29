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
        res.status(400).send('La id de producto, la id del punto físico, la cantidad y la cantidad de visualización son requeridos')
        return
    }

    const newInventory = new Inventory(
        productId,
        physicalLocationId,
        quantity,
        displayquantity,
        ecommerceAvailable)

    let insertResult = await dao.create(newInventory)
    if (!insertResult.hasResponse()) {
        res.status(500).send(insertResult.error)
        return
    }

    let inventory = insertResult.value

    res.status(200).send({ inventory })
}

export async function listInventory(req: Request, res: Response) {
    let dao = new InventoryDAOPostgres();
    let query: Object = req.query;

    let filters = [];
    if (query.hasOwnProperty('productCode')) {
        filters.push(new Filter('inventory.pk_fk_product', <string>query['productCode'], matchType.strictEqual));
    }
    if (query.hasOwnProperty('locationId')) {
        filters.push(new Filter('inventory.pk_fk_physical_location', <string>query['locationId'], matchType.strictEqual));
    }

    let sorts = [];
    if (query.hasOwnProperty('orderBy')) {
        if (!Array.isArray(query['orderBy'])) {
            query['orderBy'] = [query['orderBy']];
        }
        for (let sort of query['orderBy']) {
            let [name, type] = sort.split(',');
            type = type.toUpperCase();
            if (['ASC', 'DESC'].indexOf(type) === -1) {
                res.status(500).send({ error: 'Invalid sort type for param: ' + name });
                return;
            }
            sorts.push(new Sort(name, type === 'ASC'));
        }
    }

    let result = await dao.queryInventory(
        new Criteria({
            filters,
            sortBy: sorts,
            limit: query['limit'] || 50,
            offset: query['offset'] || null,
        })
    );

    if (result.hasResponse()) {
        res.status(200).send(result.value);
    } else {
        res.status(500).send(result.error);
    }
}


export async function updateInventory(req: Request, res: Response) {

    let productId, physicalLocationId, quantity, displayquantity, ecommerceavailable;

    const dao = new InventoryDAOPostgres();
    try {
        ({ productId, physicalLocationId, quantity } = req.body);
    }
    catch (e) {
        res.status(400).send('La id de producto, la id del punto físico y la cantidad son requeridos')
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

    res.status(200).send("Product remove")
}

