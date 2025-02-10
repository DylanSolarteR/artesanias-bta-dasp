import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'

type reportFilters = {
    orderBy: [name: string, type: string],
    dateStart?: string,
    dateEnd?: string,
    typeSale?: string | boolean,
    physicalLocation?: number
}

type reportAssociationFilters = {
    dateStart?: string,
    dateEnd?: string,
    typeSale?: string | boolean,
    physicalLocation?: number,
    category?: number
}

export async function listReportSales({
    orderBy,
    dateStart = null,
    dateEnd = null,
    typeSale = null,
    physicalLocation = null,
}: reportFilters) {
    const query = new URLSearchParams();
    query.append('orderBy', `${orderBy[0]},${orderBy[1]}`)
    if (dateStart) {
        query.append('dateStart', dateStart.toString())
    }
    if (dateEnd) {
        query.append('dateEnd', dateEnd.toString())
    }
    if (typeSale) {
        query.append('typeSale', typeSale.toString())
    }
    if (physicalLocation) {
        query.append('physicalLocation', physicalLocation.toString())
    }

    try {

        const response = await AxiosInstance.get('/reportSales/list?' + query.toString())
        const reportSales: Array<any> = response.data
        return reportSales.map(r => ({ 
            product: <string>r.product, 
            category: <string>r.category,
            quantitySold: <number>r.quantitySold, 
            totalSales: <number>r.totalSales,
            typeSale: <string>r.typeSale, 
            physicalLocation: <string>r.physicalLocation
        }))
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}


export async function listReportAssociation({
    dateStart = null,
    dateEnd = null,
    typeSale = null,
    physicalLocation = null,
    category = null
}: reportAssociationFilters) {
    const query = new URLSearchParams();

    if (dateStart) {
        query.append('dateStart', dateStart.toString())
    }
    if (dateEnd) {
        query.append('dateEnd', dateEnd.toString())
    }
    if (typeSale) {
        query.append('typeSale', typeSale.toString())
    }
    if (physicalLocation) {
        query.append('physicalLocation', physicalLocation.toString())
    }
    if (category) {
        query.append('category', category.toString())
    }

    try {

        const response = await AxiosInstance.get('/reportAssociation/list?' + query.toString())
        const reportSales: Array<any> = response.data
        return reportSales.map(r => ({ 
            items: <string>r.items, 
            support: <string>r.support
        }))
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}
