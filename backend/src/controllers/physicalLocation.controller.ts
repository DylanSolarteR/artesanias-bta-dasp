import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { PhysicalLocationDAOPostgres } from '../dao/implementation/postgresDAO/physicalLocationDAOPostgres';
import { PhysicalLocation } from '../model/businessTypes';



export async function listPhysicalLocations(req: Request, res: Response) {
    let dao = new PhysicalLocationDAOPostgres();
    let result = await dao.query(null);

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}

export async function locationid(req: Request, res: Response) {
    let dao = new PhysicalLocationDAOPostgres();
    let result = await dao.getById(parseInt(req.params.id));

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}

export async function createPhysicalLocation(req: Request, res: Response) {
    let dao= new PhysicalLocationDAOPostgres();
    let result = await dao.create(new PhysicalLocation(req.body.direction, req.body.telephone))

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }
}


export async function deletePhysicalLocation(req: Request, res: Response) {
    let dao= new PhysicalLocationDAOPostgres();
    let result = await dao.delete(new PhysicalLocation(null,null,parseInt(req.params.id)))

    if (result) {
        res.status(200).send(result)
    }
    else {
        res.status(500).send(result)
    }
}

export async function updatePhysicalLocation(req: Request, res: Response) {
    let dao= new PhysicalLocationDAOPostgres();
    let result = await dao.update(new PhysicalLocation(req.body.direction,req.body.telephone,parseInt(req.params.id)))

    if (result) {
        res.status(200).send(result)
    }
    else {
        res.status(500).send(result)
    }
}

