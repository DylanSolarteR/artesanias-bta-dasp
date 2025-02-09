import { Request, Response } from 'express';
import { ReportSales } from '../model/businessTypes';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { ReportSalesDAOPostgres } from '../dao/implementation/postgresDAO/reportSalesDAOPostgres';

export async function listReportSales(req: Request, res: Response) {
    let dao = new ReportSalesDAOPostgres();
    let query: Object = req.query;
    
    let filters = []
    if (query.hasOwnProperty('dateStart')) {
        filters.push(new Filter('pu.date',
            <string>req.query['dateStart'], matchType.greaterThanOrEqual));
    }
    if (query.hasOwnProperty('dateEnd')) {
        filters.push(new Filter('pu.date',
            <string>req.query['dateEnd'], matchType.lessThanOrEqual));
    }
    if (query.hasOwnProperty('typeSale')) {
        filters.push(new Filter('pu.is_physical_purchase',
            <string>req.query['typeSale'], matchType.strictEqual));
    }
    if (query.hasOwnProperty('physicalLocation')) {
        filters.push(new Filter('pl.pk_id',
            <string>req.query['physicalLocation'], matchType.strictEqual));
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
            if (!ReportSales.filterDict.hasOwnProperty(name)) {
                res.status(500)
                    .send({ error: 'Invalid sort name: ' + name });
                return;

            }
            sorts.push(new Sort(ReportSales.filterDict[name], type === 'ASC'));
        }
    }    

    let result = await dao.query(new Criteria({
        filters,
        sortBy: sorts
    }));

    if (result.hasResponse()) {
        res.status(200).send(result.value)
    }
    else {
        res.status(500).send(result.error)
    }

}