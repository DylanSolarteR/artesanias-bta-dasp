import { Product } from "../model/businessTypes";
import { Criteria } from "./Criteria";


export interface IDAO<T> {

    create(object: T): Promise<ObjectResponse<T>>;
    query(criteria: Criteria | null): Promise<ObjectResponse<T[]>>;
    update(object: T): Promise<boolean>;
    delete(object: T): Promise<boolean>;
}

export class ObjectResponse<T> {

    constructor(
        private successfull: boolean,
        private object: T | null,
        private _error: string | null
    ) { };

    public hasResponse() {
        return this.successfull;
    }

    public get value(): T {
        if (this.object == null) {
            throw new Error('Unsuccessfull response no has value')
        }
        return this.object;
    }

    public get error() {
        return this._error;
    }
}

