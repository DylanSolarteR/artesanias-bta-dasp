import { Request, Response } from 'express';
import { ProductDAOPostgres } from '../dao/implementation/productDAOPostgres';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Product } from '../model/businessTypes';



export async function listProducts(req: Request, res: Response) {
    let dao = new ProductDAOPostgres();
    let query: Object = req.query;

    let filters = []
    if (query.hasOwnProperty('minPrice')) {
        filters.push(new Filter('valor',
            <string>req.query['minPrice'], matchType.greaterThanOrEqual));
    }
    if (query.hasOwnProperty('maxPrice')) {
        filters.push(new Filter('valor',
            <string>req.query['maxPrice'], matchType.lessThanOrEqual));
    }
    if (query.hasOwnProperty('category')) {
        filters.push(new Filter('categoria.pk_id',
            <string>req.query['category'], matchType.strictEqual));
    }

    let sorts = []
    if (query.hasOwnProperty('orderBy')) {
        if (!Array.isArray(query['orderBy'])) {
            query['orderBy'] = [query['orderBy']];
        }
        for (let sort of query['orderBy']) {
            let [name, type] = sort.split(',');
            type = type.toUpperCase()
            if (['ASC', 'DESC'].indexOf(type) == -1) {
                res.status(500)
                    .send({ error: 'Invalid sort type for param: ' + name });
                return;
            }
            if (!Product.filterDict.hasOwnProperty(name)) {
                res.status(500)
                    .send({ error: 'Invalid sort name: ' + name });
                return;

            }
            sorts.push(new Sort(Product.filterDict[name], type === 'ASC'));
        }
    }

    let result = await dao.query(new Criteria({
        filters,
        sortBy: sorts,
        limit: query['limit'] || 50,
        offset: query['offset'] || null

    }));

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}