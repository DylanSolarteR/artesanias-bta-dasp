
import { Inventory } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";
import { PostgresConnection } from "../postgresConnection";

export class InventoryDAOPostgres implements IDAO<Inventory> {

    async create(inventory: Inventory): Promise<ObjectResponse<Inventory>> {
        const query = `INSERT INTO inventory VALUES ($1, $2, $3, $4, $5) RETURNING *`

        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query({
                text: query,
                values: [
                    inventory.productId,
                    inventory.locationId,
                    inventory.quantity,
                    inventory.displayQuantity,
                    inventory.ecommerceAvailable
                ]
            })

            if (res.rowCount === 1) {
                const createdInventory = new Inventory(
                    res.rows[0].pk_fk_product,
                    res.rows[0].pk_fk_physical_location,
                    res.rows[0].quantity,
                    res.rows[0].displayQuantity,
                    res.rows[0].ecommerce_available_quantity
                )
                console.log(createdInventory)
                return new ObjectResponse(true, createdInventory, null)
            }
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Fue imposible registrar el inventario')
        }
    }

    async query(criteria: Criteria): Promise<ObjectResponse<Inventory[]>> {
        let query = `SELECT * FROM inventory`
        let [restriction, params] = CriteriaPostgresConverter.convert(criteria)

        query += restriction
        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query({
                text: query,
                values: params
            })

            let products = [];
            if (res.rowCount > 0) {
                products = res.rows.map(i => new Inventory(
                    i.pk_fk_product,
                    i.pk_fk_physical_location,
                    i.quantity,
                    i.display_quantity,
                    i.ecommerce_available_quantity
                ))
            }
            return new ObjectResponse(true, products, null)
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Fue imposible obtener el inventario')
        }
    }

    async queryInventory(criteria: Criteria): Promise<ObjectResponse<Inventory[]>> {
        let [_, params, { filter, order, limit, offset }] = CriteriaPostgresConverter.convert(criteria);
        let query = `
            SELECT 
                inventory.pk_fk_product AS product_id,
                inventory.pk_fk_physical_location AS location_id,
                inventory.quantity AS total_quantity,
                inventory.display_quantity AS display_quantity,
                inventory.ecommerce_available_quantity AS ecommerce_quantity,
                product.name AS product_name,
                product.image as product_image,
                category.pk_id AS category_id,
                category.name AS category_name,
                physical_location.address as location_address,
                product.price as price
            FROM inventory
            INNER JOIN product ON inventory.pk_fk_product = product.pk_id
            INNER JOIN category ON product.fk_category = category.pk_id
            INNER JOIN physical_location ON inventory.pk_fk_physical_location = physical_location.pk_id
            ${filter}
            ${order} ${limit} ${offset};
        `;

        try {
            let pool = await PostgresConnection.getInstance().getPool();

            let res = await pool.query({
                text: query,
                values: params,
            });

            let inventories = [];
            if (res.rowCount > 0) {
                inventories = res.rows.map(row => ({
                    productId: row.product_id,
                    locationId: row.location_id,
                    productName: row.product_name,
                    productImage: row.product_image,
                    totalQuantity: row.total_quantity,
                    displayQuantity: row.display_quantity,
                    ecommerceQuantity: row.ecommerce_quantity,
                    categoryId: row.category_id,
                    categoryName: row.category_name,
                    locationAddress: row.location_address,
                    price: row.price,
                }));
            }

            return new ObjectResponse(true, inventories, null);
        } catch (e) {
            return new ObjectResponse(false, null, "Fue imposible obtener el inventario");
        }
    }


    async delete(object: Inventory): Promise<boolean> {
        throw Error('Unimplemented')
    }

    async update(inventory: Inventory): Promise<boolean | ObjectResponse<Inventory>> {
        const query = `
        UPDATE inventory
            SET quantity = $1, display_quantity = $2
        WHERE pk_fk_product = $3 AND pk_fk_physical_location = $4
        RETURNING *`;

        try {
            const pool = await PostgresConnection.getInstance().getPool();
            const res = await pool.query({
                text: query,
                values: [inventory.quantity, inventory.displayQuantity, inventory.productId, inventory.locationId]
            });
            if (res.rowCount === 1) {
                return true;
            }
        } catch (error) {
            if (error.constraint === 'c_ecommerce_available_quantity_domain') {
                return new ObjectResponse(false, null,
                    'No se puede actualizar el inventario, pues la modificación viola la cantidad reservada en compras')
            }
            console.log('Error updating inventory', error);
            console.log(error.constraint)
            return false
        }

    }
}
