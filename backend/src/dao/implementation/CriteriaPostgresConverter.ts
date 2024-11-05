import { Criteria } from "../Criteria";

type columns = true | string[]

export class CriteriaPostgresConverter {

    /**
     * 
     * @param criteria Criteria with filters
     * @param table Name of table to query
     * @param columns Columns of table to query, if it is `true` all columns will be query
     */
    static convert(criteria: Criteria,): [String, any[]] {
        let query: string = '';

        let paramCount = 0;
        let params = []
        if (criteria.hasFilters()) {
            query += '\nWHERE ';
            query += criteria.filters!.map((filt) => {
                paramCount += 1;
                params.push(filt.value)
                return `${filt.name} ${filt.type} $${paramCount}`
            }).join(' AND ');
        }

        if (criteria.hasSorts()) {
            query += '\nORDER BY ';
            query += criteria.sortBy!.map((sort) => `${sort.name} ${sort.asc ? 'ASC' : 'DESC'}`)
        }

        if (criteria.hasLimit()) {
            if (typeof (criteria.limit) != 'number') {
                throw Error('Limit should be a number')
            }
            let limit = Math.floor(criteria.limit)
            query += `\nLIMIT ${limit}`
        }

        if (criteria.hasOffset()) {
            if (typeof (criteria.offset) != 'number') {
                throw Error('Offset should be a number')
            }
            let offset = Math.floor(criteria.offset)
            query += `\nOFFSET ${offset}`
        }

        return [query, params];
    }
}

// TEST
import { Filter, Sort, matchType } from "../Criteria";
let cri: Criteria = new Criteria({
    filters: [
        new Filter('papa', 'una papa', matchType.strictEqual),
        new Filter('yuca', 'una yuca', matchType.nonStrictEqual),
        new Filter('numero', 4, matchType.greaterThanOrEqual),
    ],
    sortBy: [
        new Sort('orden 1', true),
        new Sort('orden 2', false)
    ],
    limit: 50,
    offset: 10
})
let res = CriteriaPostgresConverter.convert(cri)
console.log(res)