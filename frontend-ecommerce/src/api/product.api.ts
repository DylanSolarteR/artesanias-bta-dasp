

import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
import { PRODUCT } from '@/types/product.types'

type productFilters = {
    orderBy: [name: 'name' | 'price', type: string],
    category?: number,
    minPrice?: number,
    maxPrice?: number,
    nameProd?: string,
    limit?: number,
    offset?: number,
}

export async function createProduct(product) {
    try {
        const form = new FormData();
        for (const key in product) {
            console.log(key, product[key]);
            form.append(key, product[key]);
        }
        const response = await AxiosInstance.post('/product', form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function listProducts({
    orderBy,
    category = null,
    minPrice = null,
    maxPrice = null,
    nameProd = null,
    limit = null,
    offset = null,
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
    if (limit) {
        query.append('limit', limit.toString())
    }
    if (offset) {
        query.append('offset', offset.toString())
    }
    try {
        const response = await AxiosInstance.get('/product/list?' + query.toString())
        const products: Array<any> = response.data
        // TODO No hay imagenes de los productos
        // NOTE En las pages no se usa el id, lo dejo por si acaso
        return products.map(p => ({
            imagen: p.img,
            // imagen: <string>p.img,
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

export async function getlistProducts({
    orderBy,
    category = null,
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
    try {
        const response = await AxiosInstance.get('/product/list?' + query.toString())
        const products: PRODUCT[] = response.data
        return products
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
            console.log("Error de extracción de datos")
        }
    }

}

export async function getProductById(id: number) {
    const query = new URLSearchParams();
    query.append('id', id.toString())
    try {
        const response = await AxiosInstance.get('/product/list?' + query.toString())
        const product: PRODUCT = response.data[0]
        return product
    } catch (err) {
        if (isAxiosError(err)) {
            console.log("Error de extracción de datos")
        }
    }
}

export async function getProductsByBaseId(baseid: number) {
    const query = new URLSearchParams();
    query.append('baseid', baseid.toString())
    try {
        const response = await AxiosInstance.get('/product/list?' + query.toString())
        const products: PRODUCT[] = response.data
        return products
    } catch (err) {
        if (isAxiosError(err)) {
            console.log("Error de extracción de datos")
        }
    }
}

export async function updateProduct(id: number, baseProductId: string, name: string, description: string, price: string, img: string, categoryId: string) {
    try {
        const response = await AxiosInstance.put(`/product/${id}`, { baseProductId, name, description, price, img, categoryId }, {
            headers: {
                Authorization: `barer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function deleteProduct(id: string) {
    try {
        const response = await AxiosInstance.delete(`/product/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}
