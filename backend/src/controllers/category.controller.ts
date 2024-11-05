import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Product } from '../model/businessTypes';
import { CategoryDAOPostgres } from '../dao/implementation/categoryDAOPostgres';



export async function listCategories(req: Request, res: Response) {
    let dao = new CategoryDAOPostgres();

    let result = await dao.query(null);

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}