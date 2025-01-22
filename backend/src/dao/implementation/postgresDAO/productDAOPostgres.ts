
import { Product } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { PostgresConnection } from "../postgresConnection";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";

export class ProductDAOPostgres implements IDAO<Product> {
    async create(product: Product): Promise<ObjectResponse<Product>> {
        const query = `INSERT INTO product VALUES (DEFAULT, $1, $2, $3, $4, $5, true, $6) RETURNING *`

        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query({
                text: query,
                values: [
                    product.baseProductId,
                    product.name,
                    product.description,
                    product.price,
                    product.img,
                    product.categoryId
                ]
            })

            if (res.rowCount === 1) {
                const createdProduct = new Product(
                    res.rows[0].fk_id_base_product,
                    res.rows[0].name,
                    res.rows[0].description,
                    res.rows[0].price,
                    res.rows[0].image,
                    res.rows[0].isActive,
                    res.rows[0].fk_category,
                    res.rows[0].pk_id
                )
                console.log(createdProduct)
                return new ObjectResponse(true, createdProduct, null)
            }
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Error al crear el producto')
        }
    }

    async query(criteria: Criteria): Promise<ObjectResponse<Product[]>> {
        let [_, params, { filter, order, limit, offset }] = CriteriaPostgresConverter.convert(criteria)
        let query =
            `SELECT \n` +
            `product.*, \n` +
            `category.name as cat_name, \n` +
            `category.pk_id as cat_id, \n` +
            `SUM(ecommerce_available_quantity) as stock \n` +
            `FROM product \n` +
            `INNER JOIN category ON category.pk_id = product.fk_category \n` +
            `LEFT JOIN inventory ON product.pk_id = inventory.pk_fk_product \n` +
            filter +
            `\nGROUP BY product.pk_id, cat_name, cat_id \n` +
            order + limit + offset;


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
                    p.pk_id,
                    parseInt(p.stock) | 0
                ))
            }
            return new ObjectResponse(true, products, null)
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Fue impossible obtener el/los productos')
        }

    }
    async delete(product: Product): Promise<boolean> {
        const query = ` UPDATE product 
                        SET 
                            active = 'false'
                        WHERE id = $1
                        RETURNING *
                    `;

        try {
            let pool = await PostgresConnection.getInstance().getPool();

            let res = await pool.query({
                text: query,
                values: [
                    product.id
                ]
            });

            if (res.rowCount === 1) {

                return true;
            } else {
                return false;
            }
        }
        catch (e) {
            return false;
        }

    }

    async update(product: Product): Promise<boolean> {
        const query = ` UPDATE product 
                        SET 
                            base_product_id = $1,
                            name = $2,
                            description = $3,
                            price = $4,
                            img = $5,
                            category_id = $6
                        WHERE id = $7
                        RETURNING *
                    `;

        try {
            let pool = await PostgresConnection.getInstance().getPool();

            let res = await pool.query({
                text: query,
                values: [
                    product.baseProductId,
                    product.name,
                    product.description,
                    product.price,
                    product.img,
                    product.categoryId,
                    product.id
                ]
            });

            if (res.rowCount === 1) {
                const updatedProduct = new Product(
                    res.rows[0].fk_id_base_product,
                    res.rows[0].name,
                    res.rows[0].description,
                    res.rows[0].price,
                    res.rows[0].image,
                    res.rows[0].active,
                    res.rows[0].fk_category,
                    res.rows[0].pk_id
                );
                console.log(updatedProduct);
                return true;
            } else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
}