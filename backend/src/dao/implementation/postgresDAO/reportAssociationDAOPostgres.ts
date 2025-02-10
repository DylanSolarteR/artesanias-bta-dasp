import { Criteria } from "../../Criteria";
import { ReportAssociation } from "../../../model/businessTypes";
import { IDAO, ObjectResponse } from "../../dao";
import { PostgresConnection } from "../postgresConnection";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";


export class ReportAssociationDAOPostgres implements IDAO<ReportAssociation> {

    async create(object: ReportAssociation): Promise<ObjectResponse<ReportAssociation>> {
        throw Error('Unimplemented')
    }

    async query(criteria: Criteria): Promise<ObjectResponse<ReportAssociation[]>> {
        let [restriction, params] = CriteriaPostgresConverter.convert(criteria)
        
        let query =
        `SELECT 
            pip.pk_fk_purchase AS purchase, 
            pip.pk_fk_product AS product
        FROM product_in_purchase pip
        JOIN product p ON pip.pk_fk_product = p.pk_id
        JOIN category c ON p.fk_category = c.pk_id
        JOIN purchase pu ON pip.pk_fk_purchase = pu.pk_id
        LEFT JOIN physical_purchase pp ON pu.pk_id = pp.pk_fk_purchase
        LEFT JOIN employee e ON pp.fk_employee = e.pk_id
        LEFT JOIN physical_location pl ON e.fk_physical_location = pl.pk_id`

        query += restriction

        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query({
                text: query,
                values: params
            })

            let transactions = [];

            if (res.rowCount > 0) {
                transactions = res.rows.map(r => new ReportAssociation(
                    r.purchase,
                    r.product
                ))
            }

            return new ObjectResponse(true, transactions, null)
        }
        catch (e) {
            return new ObjectResponse(false, null, `Error: ${e.message}`);
        }

    }

    async delete(object: ReportAssociation): Promise<boolean> {
        throw Error('Unimplemented')

    }

    async update(object: ReportAssociation): Promise<boolean> {
        throw Error('Unimplemented')

    }
}