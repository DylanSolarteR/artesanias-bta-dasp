import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
import { PRODUCT_FROM_INVENTARY } from '@/types/inventory.types'

export async function listProductsFromAllInventories() {
    try {

        const response = await AxiosInstance.get('/inventory/list')
        const inventories: PRODUCT_FROM_INVENTARY[] = response.data
        return inventories;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function listProductsFromInventory(inventoryId: number) {
    const query = new URLSearchParams();
    query.append('locationId', inventoryId.toString())
    try {

        const response = await AxiosInstance.get(`/inventory/list?` + query.toString())
        const inventories: PRODUCT_FROM_INVENTARY[] = response.data
        return inventories;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}