

interface criteriaParams {
    filters?: Filter[]|null,
    sortBy?: Sort[]|null,
    offset?: number|null,
    limit?: number|null
}
export class Criteria { 
    public filters: Filter[]|null;
    public sortBy: Sort[]|null;
    public offset: number|null;
    public limit: number|null;

    constructor({filters = null, sortBy = null, offset = null, limit = null}: criteriaParams) { 
        this.filters = filters;
        this.sortBy = sortBy;
        this.offset = offset;
        this.limit = limit;
    };

    public hasFilters(){ return this.filters != null && this.filters.length > 0 }
    public hasSorts(){ return this.sortBy != null && this.sortBy.length > 0 }
    public hasOffset(){ return this.offset != null }
    public hasLimit(){ return this.limit != null }
}

export enum matchType {
    strictEqual = '=',
    nonStrictEqual = 'LIKE',
    different = '!=',
    greaterThan = '>',
    greaterThanOrEqual = '>=',
    lessThan = '<',
    lessThanOrEqual = '<=',
}

export class Filter {
    constructor(
        public name: string,
        public value: string|number,
        public type: matchType
    ) {};
}

export class Sort {
    constructor(
        public name: string,
        public asc: boolean
    ) { };
}