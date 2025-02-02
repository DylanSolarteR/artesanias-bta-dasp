export interface basicUserDataSchema {
    email: string;
    name: string;
    docType: string;
    identification: string;
    telephone: string;
}

export interface addressDataSchema {
    departmentId: number;
    deliveryAddress: string;
    zipCode: string;
}

export enum docTypes {
    cc = 'CC',
    ce = 'CE',
    ti = 'TI'
}