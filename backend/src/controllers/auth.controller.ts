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
        res.status(500).send('La id de usuario y la contraseña son requeridos')
        return
    }
    if (!userId) {
        res.status(500).send('La id de usuario es requerida')
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
        res.status(404).send('Usuario no encontrado')
        return
    }

    let employee = employeeResult.value[0];
    let isCorrectPassword = await comparePassword(password, employee.hashedPassword)
    if (!isCorrectPassword) {
        res.status(401).send('Contraseña incorrecta')
        return
    }
    let toSendEmployee = employee.getSecureEmployee()
    res.status(200).send({
        authToken: singToken(toSendEmployee),
        employee: toSendEmployee
    })
}

export async function singUp(req: Request, res: Response) {

    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware
    let { name, lastName, telephone, role, locationId, docType, docNumber } = req.body;

    if (!name || !lastName || !telephone || !role || !docType || !docNumber) {
        res.status(400).send('Todos los campos son requeridos')
        return
    }

    const dao = new EmployeeDAOPostgres();
    if (!Employee.validateRole(role)) {
        res.status(400).send('Rol invalido para el nuevo empleado')
        return
    }

    if (!Employee.validateRoleHierarchy(userRole, role)) {
        res.status(401).send(`El rol ${userRole} no es suficiente para crear un usuario con el rol ${role}`)
        return
    }

    locationId ?? null;
    const newEmployee = new Employee(
        name,
        lastName,
        telephone,
        role,
        await hashPassword(`${locationId ?? 0} ${name} ${lastName}`),
        locationId,
        docType,
        docNumber
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

export async function updateUser(req: Request, res: Response) {

    let id, idpl, name, lastname, telephone, role, password, doctype, identification;

    const dao = new EmployeeDAOPostgres();
    try {
        ({ id, idpl, name, lastname, telephone, role, password, doctype, identification } = req.body);
    }
    catch (e) {
        res.status(400).send('Campos invalidos')
        return
    }

    const newEmployee = new Employee(
        id,
        idpl, 
        name, 
        lastname, 
        telephone, 
        role, 
        password, 
        doctype, 
        identification
    )

    let insertResult = await dao.update(newEmployee)
    if (insertResult == false) {
        res.status(500).send("Error")
        return
    }

    res.status(200).send("Usuario actualizado")
}