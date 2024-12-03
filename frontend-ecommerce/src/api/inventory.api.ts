import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
import { PRODUCT_FROM_INVENTARY } from '@/types/inventory.types'

export async function listProductsFromAllInventories() {
    try {

        let response = await AxiosInstance.get('/inventory/list')
        let inventories: PRODUCT_FROM_INVENTARY[] = response.data
        return inventories;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function listProductsFromInventory(inventoryId: number) {
    let query = new URLSearchParams();
    query.append('locationId', inventoryId.toString())
    try {

        let response = await AxiosInstance.get(`/inventory/list?` + query.toString())
        let inventories: PRODUCT_FROM_INVENTARY[] = response.data
        return inventories;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}