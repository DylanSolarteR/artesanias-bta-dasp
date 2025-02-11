
import { isAxiosError } from "axios";
import { AxiosInstance } from "./axios";
import { addressDataSchema, basicUserDataSchema, productSchema } from '../types/purchase.types';

export async function initializePurchase(data: { basicUserData: basicUserDataSchema, addressData: addressDataSchema, productList: productSchema[] }): Promise<string> {
    try {
        const response = await AxiosInstance.post('/purchase/initialize-purchase', data);
        return response.data.url;
    } catch (err) {
        if (isAxiosError(err)) {
            console.log(err)
            throw err;
        }
    }
}

export async function completePurchase(purchaseId: number) {
    try {
        const response = await AxiosInstance.post('/purchase/complete-purchase', { purchaseId });
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.log(err)
            throw err;
        }
    }
}
export async function rejectPurchase(purchaseId: number) {
    try {
        const response = await AxiosInstance.post('/purchase/reject-purchase', { purchaseId });
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.log(err)
            throw err;
        }
    }
}

export async function completePosPurchase(
    data: { basicUserData: basicUserDataSchema, productList: productSchema[], locationId: number }
) {
    try {
        const response = await AxiosInstance.post('/purchase/pos-purchase', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response;
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.code === "ERR_NETWORK") {
                return { success: false, message: 'No es posible establecer conexión con el servidor, verifica tu conexión a internet.', status: 777 }
            }
            return err.response;
        }
    }
}