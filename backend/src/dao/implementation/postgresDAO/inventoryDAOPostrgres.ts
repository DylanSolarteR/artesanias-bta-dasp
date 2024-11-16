
import { Inventory } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";
import { PostgresConnection } from "../postgresConnection";

export class InventoryDAOPostgres implements IDAO<Inventory> {
    async create(inventory: Inventory): Promise<ObjectResponse<Inventory>> {
        throw Error('Unimplemented')
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

    async delete(object: Inventory): Promise<boolean> {
        throw Error('Unimplemented')

    }

    async update(object: Inventory): Promise<boolean> {
        throw Error('Unimplemented')

    }
}
