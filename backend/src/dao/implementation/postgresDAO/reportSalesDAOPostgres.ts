import { Criteria } from "../../Criteria";
import { ReportSales } from "../../../model/businessTypes";
import { IDAO, ObjectResponse } from "../../dao";
import { PostgresConnection } from "../postgresConnection";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";


export class ReportSalesDAOPostgres implements IDAO<ReportSales> {

    async create(object: ReportSales): Promise<ObjectResponse<ReportSales>> {
        throw Error('Unimplemented')
    }

    async query(criteria: Criteria): Promise<ObjectResponse<ReportSales[]>> {
        let [_, params, { filter, order }] = CriteriaPostgresConverter.convert(criteria)
        let query = 
        `SELECT 
            p.name AS product,
            c.name AS category,
            SUM(pip.quantity) AS quantitySold,
            SUM(pip.quantity * pip.unit_price) AS totalSales,
            CASE 
                WHEN pu.is_physical_purchase THEN 'Físico' 
                ELSE 'Online' 
            END AS typeSale,
            pl.address AS physicalLocation
        FROM product_in_purchase pip
        JOIN product p ON pip.pk_fk_product = p.pk_id
        JOIN category c ON p.fk_category = c.pk_id
        JOIN purchase pu ON pip.pk_fk_purchase = pu.pk_id
        LEFT JOIN physical_purchase pp ON pu.pk_id = pp.pk_fk_purchase
        LEFT JOIN employee e ON pp.fk_employee = e.pk_id
        LEFT JOIN physical_location pl ON e.fk_physical_location = pl.pk_id \n` +
        filter +
        `\nGROUP BY p.name, c.name, pu.is_physical_purchase, pl.address \n` +
        order;
        
        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query({
                text: query,
                values: params
            })

            let report = [];
            if (res.rowCount > 0) {
                report = res.rows.map(r => new ReportSales(
                    r.product,
                    r.category,
                    r.quantitysold,
                    r.totalsales,
                    r.typesale,
                    r.physicallocation
                ))
            }

            return new ObjectResponse(true, report, null)

        }
        catch (e) {
            console.error('Error detallado:', e);
            return new ObjectResponse(false, null, `Error: ${e.message}`);
        }

    }

    async delete(object: ReportSales): Promise<boolean> {
        throw Error('Unimplemented')

    }

    async update(object: ReportSales): Promise<boolean> {
        throw Error('Unimplemented')

    }
}