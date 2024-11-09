

export class Product {

    public static readonly filterDict = {
        'minPrice': 'price',
        'maxPrice': 'price',
        'category': 'category',
        'name': 'name',
        'price': 'price',
    }
    constructor(
        public name: string,
        public description: string,
        public categoryName: string,
        public categoryId: number,
        public baseProductId: number,
        public price: number,
        public img: string,
        private _id?: number
    ) { }

    set id(_id) {
        if (this._id != null) {
            throw Error('id is inmutable')
        }
        this._id = _id;
    }

    get id() {
        return this._id;
    }

}

export class ProductCategory {
    constructor(
        public name: string,
        public description: string,
        private _id?: number
    ) { }

    set id(_id) {
        if (this._id != null) {
            throw Error('id is inmutable')
        }
        this._id = _id;
    }

    get id() {
        return this._id;
    }
}