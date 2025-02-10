import { Department } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";
import { PostgresConnection } from "../postgresConnection";


export class DepartmentDAOPostgres implements IDAO<Department> {
    create(object: Department): Promise<ObjectResponse<Department>> {
        throw new Error("Method not implemented.");
    }
    async query(criteria: Criteria | null): Promise<ObjectResponse<Department[]>> {
        let query = `SELECT * FROM department`
        let [restriction, params] = CriteriaPostgresConverter.convert(criteria)
        query += restriction

        const pool = await PostgresConnection.getInstance().getPool();
        try {
            const result = await pool.query({
                text: query,
                values: params
            })

            let departments: Department[] = []

            for (let row of result.rows) {
                departments.push(new Department(
                    row.name,
                    row.pk_id
                ))
            }
            return new ObjectResponse(true, departments, null)
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Fue imposible consultar los departamentos')
        }

    }
    update(object: Department): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(object: Department): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}