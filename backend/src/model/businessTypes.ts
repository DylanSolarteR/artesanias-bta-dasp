

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

export enum employeeRoles {
    administrator = 'administrator',
    manager = 'manager',
    cashier = 'cashier'
}
export class Employee {
    constructor(
        public name: string,
        public lastName: string,
        public telephone: string,
        public role: employeeRoles,
        public hashedPassword: string,
        public locationId: number | null,
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
        let { hashedPassword, ...secureEmployee } = this
        return secureEmployee
    }
}