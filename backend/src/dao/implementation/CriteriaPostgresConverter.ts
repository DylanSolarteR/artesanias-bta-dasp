import { Criteria, matchType } from "../Criteria";

type columns = true | string[]

export class CriteriaPostgresConverter {

    /**
     * 
     * @param criteria Criteria with filters
     * @param table Name of table to query
     * @param columns Columns of table to query, if it is `true` all columns will be query
     */
    static convert(criteria: Criteria,): [String, any[], { filter: string, order: string, limit: string, offset: string }] {
        if (criteria == null) {
            return ['', [], { filter: '', order: '', limit: '', offset: '' }];
        }
        let filter: string = '';

        let paramCount = 0;
        let params = []
        if (criteria.hasFilters()) {
            filter += '\nWHERE ';
            filter += criteria.filters!.map((filt) => {
                paramCount += 1;
                params.push(filt.value)
                return `${filt.name} ${filt.type} $${paramCount}`
            }).join(' AND ');
        }

        let order: string = '';
        if (criteria.hasSorts()) {
            order += '\nORDER BY ';
            order += criteria.sortBy!.map((sort) => `${sort.name} ${sort.asc ? 'ASC' : 'DESC'}`)
        }

        let limit: string = '';
        if (criteria.hasLimit()) {
            if (typeof (criteria.limit) != 'number') {
                throw Error('Limit should be a number')
            }
            let limitInt = Math.floor(criteria.limit)
            limit = `\nLIMIT ${limitInt}`
        }

        let offset: string = '';
        if (criteria.hasOffset()) {
            if (typeof (criteria.offset) != 'number') {
                throw Error('Offset should be a number')
            }
            let offsetInt = Math.floor(criteria.offset)
            offset = `\nOFFSET ${offsetInt}`
        }

        return [filter + order + limit + offset, params, { filter, order, limit, offset }];
    }
}
