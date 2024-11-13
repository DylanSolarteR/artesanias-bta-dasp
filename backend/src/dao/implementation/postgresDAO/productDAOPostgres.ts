
import { Product } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { PostgresConnection } from "../postgresConnection";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";

export class ProductDAOPostgres implements IDAO<Product> {
    async create(object: Product): Promise<ObjectResponse<Product>> {
        throw Error('Unimplemented')
    }

    async query(criteria: Criteria): Promise<ObjectResponse<Product[]>> {
        let query = `SELECT 
                        product.*,
                        category.name as cat_name,
                        category.pk_id as cat_id
                    FROM product
                    INNER JOIN category ON category.pk_id = product.fk_category`
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
                products = res.rows.map(p => new Product(
                    p.name,
                    p.description,
                    p.cat_name,
                    p.cat_id,
                    p.fk_id_prod_base,
                    p.price,
                    p.image,
                    p.active,
                    p.pk_id
                ))
            }
            return new ObjectResponse(true, products, null)
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Failed to get products')
        }

    }

    async delete(object: Product): Promise<boolean> {
        throw Error('Unimplemented')

    }

    async update(object: Product): Promise<boolean> {
        throw Error('Unimplemented')

    }
}