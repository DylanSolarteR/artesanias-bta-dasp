
import { Product } from "../../model/businessTypes";
import { Criteria } from "../Criteria";
import { IDAO, ObjectResponse } from "../dao";
import { PostgresConnection } from "./connection";
import { CriteriaPostgresConverter } from "./CriteriaPostgresConverter";

export class ProductDAOPostgres implements IDAO<Product> {
    async create(object: Product): Promise<ObjectResponse<Product>> {
        throw Error('Unimplemented')
    }

    async query(criteria: Criteria): Promise<ObjectResponse<Product[]>> {
        let query = `SELECT 
                        producto.*,
                        categoria.nombre as cat_nom,
                        categoria.pk_id as cat_id
                    FROM producto
                    INNER JOIN categoria ON categoria.pk_id = producto.fk_categoria`
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
                    p.nombre,
                    p.descripcion,
                    p.cat_nom,
                    p.cat_id,
                    p.fk_id_prod_base,
                    p.valor,
                    p.imagen
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