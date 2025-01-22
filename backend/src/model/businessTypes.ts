

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
        public isActive: boolean,
        private _id?: number,
        public stock?: number,
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

export enum employeeRoles {
    administrator = 'administrator',
    manager = 'manager',
    cashier = 'cashier'
}
export enum docTypes {
    cc = 'CC',
    ce = 'CE',
    ti = 'TI'
}

export class Employee {
    constructor(
        public name: string,
        public lastName: string,
        public telephone: string,
        public role: employeeRoles,
        public hashedPassword: string,
        public locationId: number | null,
        public docType: docTypes,
        public docNumber: string,
        private _id?: number
    ) {
        // Validate role in runtime
        if (!Employee.validateRole(this.role)) {
            throw Error(`Invalid role for Employee type, ${this.role} not in ${Object.values(employeeRoles)}`)
        }
    }

    public static validateRole(role: string) {
        return Object.values(employeeRoles).includes(role as employeeRoles)
    }

    public static validateRoleHierarchy(roleA: employeeRoles, roleB: employeeRoles): boolean {
        if (roleA === employeeRoles.administrator) {
            return true
        }
        if (roleA === employeeRoles.manager && roleB === employeeRoles.cashier) {
            return true
        }
        return false
    }

    public static validateDocType(docType: string) {
        return Object.values(docType).includes(docType as docTypes)
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

    public getSecureEmployee() {
        let { hashedPassword, _id, ...secureEmployee } = this
        return { ...secureEmployee, id: _id }
    }
}

export class PhysicalLocation {
    constructor(
        public address: string,
        public telephone: string,
        public active: boolean,
        public latitude: number,
        public longitude: number,
        private _id?: number
    ) { }

    get id() {
        return this._id;
    }

    set id(_id) {
        if (this._id != null) {
            throw Error('id is inmutable')
        }
        this._id = _id;
    }

}
export class Inventory {
    constructor(
        public readonly productId: number,
        public readonly locationId: number,
        public quantity: number,
        public displayQuantity: number,
        public ecommerceAvailable: number
    ) { }
}

