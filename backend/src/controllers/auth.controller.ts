import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Employee, employeeRoles } from '../model/businessTypes';
import { EmployeeDAOPostgres } from '../dao/implementation/postgresDAO/employeeDAOPostrgres';
import { comparePassword, hashPassword, singToken } from '../helpers/auth.helper';



export async function singIn(req: Request, res: Response) {

    let dao = new EmployeeDAOPostgres();
    let userId, password;
    try {
        ({ userId, password } = req.body);
    }
    catch (e) {
        res.status(500).send('User id and password is required')
        return
    }
    if (!userId) {
        res.status(500).send('User id is required')
        return
    }

    let userCriteria = new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    })

    let employeeResult = await dao.query(userCriteria);

    if (!employeeResult.hasResponse()) {
        res.status(500).send(employeeResult.error)
        return
    }

    // It should not have more than one row result
    if (employeeResult.value.length > 1) {
        res.status(400).send('Hackerman :p')
        return
    }
    if (employeeResult.value.length === 0) {
        res.status(404).send('User not found')
        return
    }

    let employee = employeeResult.value[0];
    let isCorrectPassword = await comparePassword(password, employee.hashedPassword)
    if (!isCorrectPassword) {
        res.status(401).send('Wrong password')
        return
    }
    res.status(200).send({
        authToken: singToken({ id: employee.id, }),
        employee: employee.getSecureEmployee()
    })
}

export async function singUp(req: Request, res: Response) {

    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware
    let name, lastName, telephone, role, locationId;

    const dao = new EmployeeDAOPostgres();
    try {
        ({ name, lastName, telephone, role } = req.body);
    }
    catch (e) {
        res.status(400).send('Name, lastName, telephone, role and locationId are required')
        return
    }
    if (!Employee.validateRole(role)) {
        res.status(400).send('Invalid role selected for new user')
        return
    }

    if (!Employee.validateRoleHierarchy(userRole, role)) {
        res.status(401).send(`The role ${userRole} its no enought to create a new user with the role ${role}`)
        return
    }

    // TODO validar los otros campos
    locationId ?? null;
    const newEmployee = new Employee(
        name,
        lastName,
        telephone,
        role,
        await hashPassword(`${locationId ?? 0} ${name} ${lastName}`),
        locationId
    )

    let insertResult = await dao.create(newEmployee)
    if (!insertResult.hasResponse()) {
        res.status(500).send(insertResult.error)
        return
    }

    let employee = insertResult.value
    console.log('final:', employee)

    res.status(200).send({ createdEmployee: employee.getSecureEmployee() })
}

export async function getRole(req: Request, res: Response) {

    const userRole = req['user_role']; //Require identifyRole middleware
    res.status(200).send({ role: userRole });
}