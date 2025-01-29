import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Employee, employeeRoles } from '../model/businessTypes';
import { EmployeeDAOPostgres } from '../dao/implementation/postgresDAO/employeeDAOPostrgres';

/**
 * Filters a list of users based on the user that is querying
 * hidding the superiors of the user and the users that are not in the same location
 * @param users list of users to filter
 * @param user User thats is querying
 * @returns A list of users that the user can see
 */
function filterUsers(users: Employee[], user: Employee) {
    if (user.role === employeeRoles.administrator) {
        return users
    }
    if (user.role === employeeRoles.manager) {
        return users.filter(u => u.role === employeeRoles.cashier && u.locationId === user.locationId)
    }
    if (user.role === employeeRoles.cashier) {
        return []
    }
}

export async function listEmployees(req: Request, res: Response) {
    const userId: number = req['user_id']; //Require verifyAuth middleware
    let dao = new EmployeeDAOPostgres();
    let query: Object = req.query;

    const userDao = new EmployeeDAOPostgres();
    const userRes = await userDao.query(new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    }));
    if (!userRes.hasResponse() || userRes.value.length != 1) {
        res.status(404).send("Falla al verificar la autenticidad del usuario autenticado")
        return
    }

    const user = userRes.value[0];

    if (user.role === employeeRoles.cashier) {
        res.status(401).send("No tienes permisos para ver empleados")
        return
    }

    let filters = []
    if (req.params['id'] != null) {
        filters.push(new Filter('pk_id',
            <string>req.params['id'], matchType.strictEqual));
    }
    else {
        const activeValue = query['inactive']
        let activeFilter = null
        if (activeValue === 'only') {
            activeFilter = new Filter('active', false, matchType.strictEqual)
        }
        else if (activeValue === 'include') {
        }
        else {
            activeFilter = new Filter('active', true, matchType.strictEqual)
        }

        if (activeFilter) { filters.push(activeFilter) }
    }

    if (user.role === employeeRoles.manager) {
        filters.push(new Filter('role', employeeRoles.cashier, matchType.strictEqual))
    }

    let sorts = []
    let resultEmployees = await dao.query(new Criteria({
        filters,
        sortBy: sorts,
        limit: query['limit'] || 10,
        offset: query['offset'] || null

    }));

    if (resultEmployees.hasResponse()) {
        const users = filterUsers(resultEmployees.value, user)
        res.status(200).send(users.map((employee: Employee) => {
            return employee.getSecureEmployee()
        }))
    }
    else {
        res.status(500).send(resultEmployees.error)
    }
}

export async function updateEmployee(req: Request, res: Response) {

    const userId = req['user_id']; //Require verifyAuth middleware

    let id, email, name, lastName, telephone;
    let { role, locationId, active } = req.body;

    try {
        ({ id, email, name, lastName, telephone } = req.body);
    }
    catch (e) {
        res.status(400).send('Campos invalidos')
        return
    }

    const dao = new EmployeeDAOPostgres();
    const userRes = await dao.query(new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    }))
    if (!userRes.hasResponse() || userRes.value.length != 1) {
        res.status(500).send('Usuario editor no encontrado')
        return
    }

    const user = userRes.value[0]

    if (role && !Employee.validateRole(role)) {
        res.status(400).send('Rol invalido')
        return
    }

    const toModUserRes = await dao.query(new Criteria({
        filters: [new Filter('pk_id', id, matchType.strictEqual)]
    }))

    if (!toModUserRes.hasResponse()) {
        res.status(500).send('Usuario a modificar no encontrado')
        return
    }

    let toModUser = toModUserRes.value[0]

    if (user.id != id && user.role === employeeRoles.cashier) {
        res.status(401).send('Los cajeros solo pueden modificar su propia información')
        return
    } else if (!Employee.validateRoleHierarchy(user.role, toModUser.role) && user.role !== employeeRoles.cashier) {
        res.status(401).send('No tienes permisos para modificar a este usuario')
        return
    }

    if (user.role === employeeRoles.manager && toModUser.locationId != user.locationId) {
        res.status(401).send('Los gerentes solo pueden modificar empleados de su local')
        return
    }

    if (role && user.role != employeeRoles.administrator) {
        res.status(401).send('Solo los administradores pueden modificar roles')
        return
    }

    if (locationId && locationId !== toModUser.locationId && user.role != employeeRoles.administrator) {
        res.status(401).send('Solo los administradores pueden modificar la ubicación de un empleado')
        return
    }

    if (active != null && user.role != employeeRoles.administrator) {
        res.status(401).send('Solo los administradores pueden modificar el estado de un empleado')
        return
    }

    toModUser.email = email ?? toModUser.email
    toModUser.name = name ?? toModUser.name
    toModUser.lastName = lastName ?? toModUser.lastName
    toModUser.telephone = telephone ?? toModUser.telephone
    toModUser.locationId = locationId ?? toModUser.locationId
    toModUser.role = role ?? toModUser.role
    toModUser.active = active ?? toModUser.active

    let updateResult = await dao.update(toModUser)
    if (updateResult == false) {
        res.status(500).send("Error interno al actualizar la información del usuario")
        return
    }

    res.status(200).send("Usuario actualizado")
}

export async function deleteEmployee(req: Request, res: Response) {
    //Require verifyAuth middleware. The id is of the user that is making the request
    const userId: number = req['user_id']

    // id is the id of the employee to delete
    let id: string | number = req.params['id']

    if (id == null) {
        res.status(400).send("La id es requerida")
    }

    try {
        id = parseInt(id)
    } catch (e) {
        res.status(400).send("La id debe ser un numero")
    }

    const userDao = new EmployeeDAOPostgres();
    const userRes = await userDao.query(new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    }));
    if (!userRes.hasResponse() || userRes.value.length != 1) {
        res.status(404).send("Falla al verificar la autenticidad del usuario autenticado")
        return
    }

    const user = userRes.value[0];
    if (user.role === employeeRoles.cashier) {
        res.status(400).send("Un cajero no puede eliminar empleados")
        return
    }

    const toDeleteUserResult = await userDao.query(new Criteria({
        filters: [new Filter('pk_id', id, matchType.strictEqual)]
    }));

    if (!toDeleteUserResult.hasResponse() || toDeleteUserResult.value.length != 1) {
        res.status(404).send("No se encontro el empleado a eliminar")
        return
    }
    const toDeleteUser = toDeleteUserResult.value[0]

    let update = false
    const isManager = user.role === employeeRoles.manager
    const toDeleteIsCashier = toDeleteUser.role === employeeRoles.cashier
    const locationShare = user.locationId === toDeleteUser.locationId

    const isAdmin = user.role === employeeRoles.administrator
    const isSameUser = user.id === toDeleteUser.id

    if (isSameUser) {
        res.status(400).send("Un empleado no puede eliminarse a si mismo")
        return
    }

    if (isAdmin || (isManager && toDeleteIsCashier && locationShare)) {
        update = true
    }

    if (!update) {
        res.status(400).send("No tienes permisos para eliminar a este empleado")
        return
    }

    const deleteResult = await userDao.delete(toDeleteUser)
    if (deleteResult) {
        res.status(200).send("Empleado eliminado")
    }
    else {
        res.status(500).send("Falla al eliminar el empleado")
    }

}

