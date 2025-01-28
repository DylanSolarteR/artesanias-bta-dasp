import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { PhysicalLocationDAOPostgres } from '../dao/implementation/postgresDAO/physicalLocationDAOPostgres';
import { Employee, employeeRoles, PhysicalLocation } from '../model/businessTypes';



export async function listPhysicalLocations(req: Request, res: Response) {
    let dao = new PhysicalLocationDAOPostgres();
    let query: Object = req.query;

    let filters = []
    if (req.query['id'] != null) {
        filters.push(new Filter('pk_id',
            <string>req.query['id'], matchType.strictEqual));
    }

    let sorts = []
    let result = await dao.query(new Criteria({
        filters,
        sortBy: sorts,
        limit: query['limit'] || 10,
        offset: query['offset'] || null

    }));

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}


export async function createPhysicalLocation(req: Request, res: Response) {
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware

    if (!Employee.validateRoleHierarchy(userRole, employeeRoles.administrator)) {
        res.status(400).send("Rol inválido, necesita ser administrador")
        return
    }
    let {
        address,
        telephone,
        latitude,
        longitude
    } = req.body
    let dao = new PhysicalLocationDAOPostgres();
    let result = await dao.create(new PhysicalLocation(address, telephone, true, latitude, longitude))

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }
}


export async function deletePhysicalLocation(req: Request, res: Response) {
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware

    if (!Employee.validateRoleHierarchy(userRole, employeeRoles.administrator)) {
        res.status(400).send("Rol inválido, necesita ser administrador")
        return
    }

    let { id } = req.params
    let dao = new PhysicalLocationDAOPostgres();
    let query = await dao.query(new Criteria({ filters: [new Filter('pk_id', id, matchType.strictEqual)] }))
    if (query.hasResponse() && query.value.length != 1) {
        res.status(400).send("Punto físico no encontrado")
        return
    }

    let result = await dao.delete(query.value[0])

    if (result) {
        res.status(200).send('Punto físico eliminado')
    }
    else {
        res.status(500).send('Error al eliminar el punto físico')
    }
}

export async function updatePhysicalLocation(req: Request, res: Response) {
    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware

    if (!Employee.validateRoleHierarchy(userRole, employeeRoles.administrator)) {
        res.status(400).send("Rol inválido, necesita ser administrador")
        return
    }
    let {
        address,
        telephone,
        active,
        latitude,
        longitude,
        id
    } = req.body

    let dao = new PhysicalLocationDAOPostgres();
    let query = await dao.query(new Criteria({ filters: [new Filter('pk_id', id, matchType.strictEqual)] }))
    if (query.hasResponse() && query.value.length != 1) {
        res.status(400).send("No se encontró el punto físico")
        return
    }
    let result = await dao.update(new PhysicalLocation(address, telephone, active, latitude, longitude, id))

    if (result) {
        res.status(200).send('Punto físico actualizado')
    }
    else {
        res.status(500).send('Error al actualizar el punto físico')
    }
}

