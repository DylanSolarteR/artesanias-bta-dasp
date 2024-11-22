import { docTypes } from "./businessTypes";


export class ProductRequest {

    constructor(
        private _locationId: number,
        public quantity: number,
        public isComplete: boolean = null
    ) { }

    get locationId() {
        return this._locationId;
    }

}

export class ProductInPurchase {
    constructor(
        public productId: number,
        public quantity: number,
        public unitPrice: number,
        public productRequests?: ProductRequest[]
    ) {
        if (!productRequests) {
            this.productRequests = [];
        }
    }


    public addProductRequest(newProductReq: ProductRequest) {
        this.productRequests.push(newProductReq)
    }

    public removeProductRequest(delteProductReq: ProductRequest) {
        this.productRequests = this.productRequests.filter(
            (r) => {
                return r.locationId !== delteProductReq.locationId
            }
        )
    }
}

export abstract class Purchase {
    constructor(
        public date: Date,
        public email: string,
        public name: string,
        public docType: docTypes,
        public identification: string,
        public telephone: string,
        public readonly isPhysicalPurchase: boolean,
        public readonly total_price: number | null,
        public products: ProductInPurchase[],
        private _id?: number
    ) {
        if (!products) {
            this.products = [];
        }
    }

    set id(_id) {
        if (this._id != null) {
            throw Error('id is inmutable')
        }
        this._id = _id;
    }

    get id() {
        return this._id;
    }

    public addProduct(newProduct: ProductInPurchase) {
        this.products.push(newProduct)
    }

    public removeProduct(delteProduct: ProductInPurchase) {
        this.products = this.products.filter(
            (r) => {
                return r.productId !== delteProduct.productId
            }
        )
    }

    public static validateDocType(docType: string) {
        return Object.values(docType).includes(docType as docTypes)
    }
}

export class EcommercePurchase extends Purchase {
    constructor(
        date: Date,
        email: string,
        name: string,
        docType: docTypes,
        identification: string,
        telephone: string,
        total_price: number | null,
        public departmentId: number,
        public departmentName: string | null,
        public deliveryAddress: string,
        public zipCode: string,
        products?: ProductInPurchase[],
        _id?: number
    ) {
        super(
            date,
            email,
            name,
            docType,
            identification,
            telephone,
            false,
            total_price,
            products,
            _id
        )
    }
}

export class PhysicalPurchase extends Purchase {
    constructor(
        date: Date,
        email: string,
        name: string,
        docType: docTypes,
        identification: string,
        telephone: string,
        total_price: number | null,
        public employeeId: number,
        products?: ProductInPurchase[],
        _id?: number
    ) {
        super(
            date,
            email,
            name,
            docType,
            identification,
            telephone,
            true,
            total_price,
            products,
            _id
        )
    }
}

