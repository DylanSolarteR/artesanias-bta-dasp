
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
            return new ObjectResponse(false, null, 'Failed to add Products')
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
            return new ObjectResponse(false, null, 'Failed to get inventories')
        }
    }

    async decreaseQuantity(inventory: Inventory): Promise<boolean> {
        const query = `
            UPDATE inventory
            SET quantity = quantity - $1
            WHERE pk_fk_product = $2 AND pk_fk_physical_location = $3
            AND quantity >= $1 -- Asegurarse de que la cantidad no sea negativa
            RETURNING *;
        `;

        try {
            const pool = await PostgresConnection.getInstance().getPool();
            const res = await pool.query({
                text: query,
                values: [inventory.quantity, inventory.productId, inventory.locationId],
            });

            if (res.rowCount === 1) {
                const updatedInventory = new Inventory(
                    res.rows[0].pk_fk_product,
                    res.rows[0].pk_fk_physical_location,
                    res.rows[0].quantity,
                    res.rows[0].display_quantity,
                    res.rows[0].ecommerce_available_quantity
                );
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error('Error when decreasing the quantity in inventory', e);
            return false;
        }
    }

    async delete(object: Inventory): Promise<boolean> {
        throw Error('Unimplemented')

    }

    async update(object: Inventory): Promise<boolean> {
        throw Error('Unimplemented')

    }
}
