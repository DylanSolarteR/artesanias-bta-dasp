import { Request, Response } from 'express';
import { InventoryDAOPostgres } from '../dao/implementation/postgresDAO/inventoryDAOPostgres';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { employeeRoles, Inventory } from '../model/businessTypes';
import { ObjectResponse } from '../dao/dao';
import { z } from 'zod';
import { EmployeeDAOPostgres } from '../dao/implementation/postgresDAO/employeeDAOPostrgres';


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

const updateSchema = z.object({
    productId: z.number({ message: 'La id del producto es requerida' })
        .int({ message: 'La id del producto debe ser un entero' }),

    physicalLocationId: z.number({ message: 'La id del punto fisico es requerida' })
        .int({ message: 'La id del punto fisico debe ser un entero' }),

    quantity: z.number({ message: 'La cantidad en bodega debe ser un número' })
        .int({ message: 'La cantidad en bodega debe ser un entero' }).optional(),

    displayQuantity: z.number({ message: 'La cantidad en exhibición debe ser un número' })
        .int({ message: 'La cantidad en exhibición debe ser un entero' }).optional(),
})
export async function updateInventory(req: Request, res: Response) {

    const userId = req['user_id'] // Requiere verifyAuth middleware

    const employeeDao = new EmployeeDAOPostgres();
    const employeeRes = await employeeDao.query(new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    }));
    if (!employeeRes.hasResponse()) {
        res.status(500).send('No se puedo validar la autenticidad del usuario');
        return;
    }

    if (employeeRes.value.length !== 1) {
        res.status(404).send('Usuario no encontrado');
        return;
    }

    const user = employeeRes.value[0];

    const parseRes = updateSchema.safeParse(req.body);
    if (!parseRes.success) {
        const messages = parseRes.error.errors.map(e => e.message);
        res.status(400).send(messages);
        return;
    }
    let { productId,
        physicalLocationId,
        quantity,
        displayQuantity } = parseRes.data;
    console.log(productId, physicalLocationId, quantity, displayQuantity);

    const isNotAdmin = user.role !== employeeRoles.administrator;
    const isLocationManager = user.role === employeeRoles.manager && user.locationId === physicalLocationId;
    if (isNotAdmin && !isLocationManager) {
        res.status(403).send('No tienes permisos para realizar esta acción');
        return;
    }

    const dao = new InventoryDAOPostgres();

    const invRes = await dao.query(new Criteria({
        filters: [
            new Filter('pk_fk_product', productId, matchType.strictEqual),
            new Filter('pk_fk_physical_location', physicalLocationId, matchType.strictEqual)]
    }));
    if (!invRes.hasResponse()) {
        res.status(500).send(invRes.error);
        return;
    }
    if (invRes.value.length === 0) {
        res.status(404).send('Inventario no encontrado');
        return;
    }
    const inventory = invRes.value[0];

    inventory.quantity = quantity ?? inventory.quantity;
    inventory.displayQuantity = displayQuantity ?? inventory.displayQuantity;



    let updateResult = await dao.update(inventory)
    if (updateResult !== true) {
        if (updateResult instanceof ObjectResponse) {
            res.status(500).send(updateResult.error)
            return
        }
        res.status(500).send('No se pudo actualizar el inventario')
        return
    }

    res.status(200).send('Inventario actualizado')

}

