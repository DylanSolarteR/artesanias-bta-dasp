
import { ProductCategory } from "../../model/businessTypes";
import { Criteria } from "../Criteria";
import { IDAO, ObjectResponse } from "../dao";
import { PostgresConnection } from "./postgresConnection";

export class CategoryDAOPostgres implements IDAO<ProductCategory> {
    async create(object: ProductCategory): Promise<ObjectResponse<ProductCategory>> {
        throw Error('Unimplemented')
    }

    async query(criteria: Criteria): Promise<ObjectResponse<ProductCategory[]>> {
        let query = `SELECT * FROM category`

        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query(query)

            let categories = [];
            if (res.rowCount > 0) {
                categories = res.rows.map(c => new ProductCategory(
                    c.name,
                    c.description,
                    c.pk_id
                ))
            }
            return new ObjectResponse(true, categories, null)
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Failed to get categories')
        }

    }

    async delete(object: ProductCategory): Promise<boolean> {
        throw Error('Unimplemented')

    }

    async update(object: ProductCategory): Promise<boolean> {
        throw Error('Unimplemented')

    }
}