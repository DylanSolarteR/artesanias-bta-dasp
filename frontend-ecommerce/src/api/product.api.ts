

import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'

type productFilters = {
    orderBy: [name: 'name' | 'price', type: string],
    category?: number,
    minPrice?: number,
    maxPrice?: number,
    nameProd?: string,
}
export async function listProducts({
    orderBy,
    category = null,
    minPrice = null,
    maxPrice = null,
    nameProd = null,
}: productFilters) {
    let query = new URLSearchParams();
    query.append('orderBy', `${orderBy[0]},${orderBy[1]}`)
    if (nameProd) {
        query.append('name', nameProd.toString())
    }
    if (category) {
        query.append('category', category.toString())
    }
    if (minPrice) {
        query.append('minPrice', minPrice.toString())
    }
    if (maxPrice) {
        query.append('maxPrice', maxPrice.toString())
    }
    try {
        let response = await AxiosInstance.get('/product/list?' + query.toString())
        let products: Array<any> = response.data
        // TODO No hay imagenes de los productos
        // NOTE En las pages no se usa el id, lo dejo por si acaso
        return products.map(p => ({
            imagen: "next.svg",
            nombre: <string>p.name,
            precio: <number>p.price,
            id: <number>p._id
        }))
    } catch (err) {
        if (isAxiosError(err)) {
            console.log("Error de extracción de datos")
        }
    }

}