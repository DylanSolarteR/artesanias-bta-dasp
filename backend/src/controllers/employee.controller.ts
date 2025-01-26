import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Employee, employeeRoles } from '../model/businessTypes';
import { EmployeeDAOPostgres } from '../dao/implementation/postgresDAO/employeeDAOPostrgres';
import { comparePassword, hashPassword, singToken } from '../helpers/auth.helper';



export async function listEmployees(req: Request, res: Response) {
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware
    let dao = new EmployeeDAOPostgres();
    let query: Object = req.query;
    const role = employeeRoles.cashier;

    if (!Employee.validateRoleHierarchy(userRole, role)) {
        res.status(400).send("Invalid role")
        return
    }

    let filters = []
    if (req.params['id'] != null) {
        filters.push(new Filter('pk_id',
            <string>req.params['id'], matchType.strictEqual));
    }

    let sorts = []
    let resultEmployees = await dao.query(new Criteria({
        filters,
        sortBy: sorts,
        limit: query['limit'] || 10,
        offset: query['offset'] || null

    }));

    if (resultEmployees.hasResponse()) {
        res.status(200).send(resultEmployees.value.map((employee: Employee) => {
            return employee.getSecureEmployee()
        }))
    }
    else {
        res.status(500).send(resultEmployees.error)
    }
}

export async function updateEmployee(req: Request, res: Response) {
    let dao = new EmployeeDAOPostgres();
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware
    let id, locationId, name, last_name, telephone, docType, docNumber;

    try {
        ({ id, locationId, name, last_name, telephone, docType, docNumber } = req.body);

    } catch (e) {
        res.status(400).send("Id, locationId, name, lastname and telephone are required")
    }
    console.log(userRole);
    let userCriteria = new Criteria({
        filters: [new Filter('pk_id', id, matchType.strictEqual)]
    })

    let employeeResult = await dao.query(userCriteria);
    console.log(employeeResult.value[0])

    let rol = employeeResult.value[0].role;
    let password = employeeResult.value[0].hashedPassword;

    if (!Employee.validateRoleHierarchy(userRole, rol)) {
        res.status(400).send("Invalid role")
        return
    }


    let result = await dao.update(new Employee(name, last_name, telephone, rol, password, locationId, id, docType, docNumber))

    if (result) {
        res.status(200).send(result)
    }
    else {
        res.status(500).send(result)
    }
}



