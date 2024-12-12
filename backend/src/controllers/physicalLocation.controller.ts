import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { PhysicalLocationDAOPostgres } from '../dao/implementation/postgresDAO/physicalLocationDAOPostgres';
import { PhysicalLocation } from '../model/businessTypes';



export async function listPhysicalLocations(req: Request, res: Response) {
    let dao = new PhysicalLocationDAOPostgres();
    let query: Object = req.query;

    let filters = []
    if (req.params['id'] != null) {
        filters.push(new Filter('pk_id',
            <string>req.params['id'], matchType.strictEqual));
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
    let dao = new PhysicalLocationDAOPostgres();
    let result = await dao.create(new PhysicalLocation(req.body.address, req.body.telephone))

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }
}


export async function deletePhysicalLocation(req: Request, res: Response) {
    let dao = new PhysicalLocationDAOPostgres();
    let result = await dao.delete(new PhysicalLocation(null, null, parseInt(req.params.id)))

    if (result) {
        res.status(200).send(result)
    }
    else {
        res.status(500).send(result)
    }
}

export async function updatePhysicalLocation(req: Request, res: Response) {
    let dao = new PhysicalLocationDAOPostgres();
    let result = await dao.update(new PhysicalLocation(req.body.address, req.body.telephone, parseInt(req.params.id)))

    if (result) {
        res.status(200).send(result)
    }
    else {
        res.status(500).send(result)
    }
}

