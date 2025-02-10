import { Request, Response } from 'express';
import { FPGrowth } from 'node-fpgrowth';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { ReportAssociationDAOPostgres } from '../dao/implementation/postgresDAO/reportAssociationDAOPostgres';

export async function listTransaction(req: Request, res: Response) {

    let dao = new ReportAssociationDAOPostgres();
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
    if (query.hasOwnProperty('category')) {
        filters.push(new Filter('p.fk_category',
            <string>req.query['category'], matchType.strictEqual));
    }

    let result = await dao.query(new Criteria({
        filters
    }));

    let transactions = {};

    result.value.forEach(row => {
        if (!transactions[row.purchase]) {
            transactions[row.purchase] = [];
        }
        transactions[row.purchase].push(row.product);
    });
    
    const transactionsArray = Object.values(transactions) as unknown[][];

    // FP-Growth
    const fpgrowth = new FPGrowth<number>(0.2); // importante: Configurar umbral mínimo de soporte (Aquí valida un 20%)
    const itemsets = await fpgrowth.exec(transactionsArray as number[][]);

    const resultAssociations = itemsets.map(itemset => ({
        items: itemset.items,
        support: itemset.support
    }));

    const filteredResults = resultAssociations.filter(result => result.items.length > 1);

    if (result.hasResponse()) {
        res.status(200).send(filteredResults)
    }
    else {
        res.status(500).send(result.error)
    }

}