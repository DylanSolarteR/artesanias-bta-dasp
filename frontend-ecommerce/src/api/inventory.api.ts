import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
import { PRODUCT_FROM_INVENTARY, UPDATE_PRODUCT_INVENTORY } from '@/types/inventory.types'
import { headers } from 'next/headers'

export async function listProductsFromAllInventories() {
    try {

        const response = await AxiosInstance.get('/inventory/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        const inventories: PRODUCT_FROM_INVENTARY[] = response.data
        return inventories;
    }
    catch (err) {
        if (isAxiosError(err)) {
            console.log(err)
            throw err;
        }
    }
}

export async function listProductsFromInventory(inventoryId: number) {
    const query = new URLSearchParams();
    query.append('locationId', inventoryId.toString())
    try {

        const response = await AxiosInstance.get(`/inventory/?` + query.toString(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        const inventories: PRODUCT_FROM_INVENTARY[] = response.data
        return inventories;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function listProductsFromInventoryByLocationId(locationId: number) {
    const query = new URLSearchParams();
    query.append('locationId', locationId.toString())
    try {

        const response = await AxiosInstance.get(`/inventory/?` + query.toString(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        const products: PRODUCT_FROM_INVENTARY[] = response.data
        return products;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function updateProductInInventoryQuantity(productId: number, quantity: number, displayQuantity: number, physicalLocationId: number) {
    try {
        await AxiosInstance.put(`/inventory/`, {
            productId,
            physicalLocationId,
            quantity,
            displayQuantity
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        return { success: true, message: 'Stock actualizado correctamente', status: 200 }
    }
    catch (err) {
        if (isAxiosError(err)) {
            console.log(err)
            if (err.code === "ERR_NETWORK") {
                return { success: false, message: 'Error de conexión, revise su conexión a internet o intentelo mas tarde.', status: err.status }
            }
            if (err.code === "ERR_BAD_REQUEST") {
                return { success: false, message: err.response.data, status: err.response.status }
            }
        }
    }
}