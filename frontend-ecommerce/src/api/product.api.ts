

import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
import { PRODUCT } from '@/types/product.types'

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
    const query = new URLSearchParams();
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
        const response = await AxiosInstance.get('/product/list?' + query.toString())
        const products: Array<any> = response.data
        // TODO No hay imagenes de los productos
        // NOTE En las pages no se usa el id, lo dejo por si acaso
        return products.map(p => ({
            imagen: "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder",
            nombre: <string>p.name,
            precio: <number>p.price,
            id: <number>p._id
        }))
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }

}

export async function getProductById(id: number) {
    const query = new URLSearchParams();
    query.append('id', id.toString())
    try {
        const response = await AxiosInstance.get('/product/list?' + query.toString())
        const product: PRODUCT = response.data[0]
        // console.log(product)
        return product
    } catch (err) {
        if (isAxiosError(err)) {
            console.log("Error de extracción de datos")
        }
    }
}