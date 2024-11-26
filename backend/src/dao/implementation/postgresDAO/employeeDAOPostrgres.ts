
import { Employee } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";
import { PostgresConnection } from "../postgresConnection";

export class EmployeeDAOPostgres implements IDAO<Employee> {
    async create(employee: Employee): Promise<ObjectResponse<Employee>> {
        const query = 'INSERT INTO employee VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *'

        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query({
                text: query,
                values: [
                    employee.locationId,
                    employee.name,
                    employee.lastName,
                    employee.telephone,
                    employee.role,
                    employee.hashedPassword
                ]
            })

            if (res.rowCount === 1) {
                const createdEmployee = new Employee(
                    res.rows[0].name,
                    res.rows[0].last_name,
                    res.rows[0].telephone,
                    res.rows[0].role,
                    res.rows[0].password,
                    res.rows[0].fk_physical_location,
                    res.rows[0].pk_id
                )
                console.log(createdEmployee)
                return new ObjectResponse(true, createdEmployee, null)
            }
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Failed to create employee')
        }
    }

    async query(criteria: Criteria): Promise<ObjectResponse<Employee[]>> {
        let query = `SELECT * FROM employee`
        let [restriction, params] = CriteriaPostgresConverter.convert(criteria)
        query += restriction

        try {
            let pool = await PostgresConnection.getInstance().getPool()

            let res = await pool.query({
                text: query,
                values: params
            })

            let employees = [];
            if (res.rowCount > 0) {
                employees = res.rows.map(c => new Employee(
                    c.name,
                    c.last_name,
                    c.telephone,
                    c.role,
                    c.password,
                    c.fk_physical_location,
                    c.pk_id
                ))
            }
            return new ObjectResponse(true, employees, null)
        }
        catch (e) {
            return new ObjectResponse(false, null, 'Failed to get employees')
        }

    }

    async delete(object: Employee): Promise<boolean> {
        throw Error('Unimplemented')

    }

    async update(employee: Employee): Promise<boolean> {
        let query = `UPDATE employee SET fk_physical_location=$2, name=$3, last_name=$4, telephone=$5 WHERE pk_id=$1;`
        try {
            let pool = await PostgresConnection.getInstance().getPool()
            let res = await pool.query({
                text: query,
                values: [
                    employee.id,
                    employee.locationId,
                    employee.name,
                    employee.lastName,
                    employee.telephone
                ]
            })
            
            console.log(res);
            if (res.rowCount === 1) {
                return true;
            }
        }
        catch (e) {
            console.log(e);
            console.log("meu deus ha fallado")
            return false;
        }

    }
}