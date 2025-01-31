
import { isAxiosError } from "axios";
import { AxiosInstance } from "./axios";
import { addressDataSchema, basicUserDataSchema } from '../types/purchase.types';

export async function initializePurchase(data: { basicUserData: basicUserDataSchema, addressData: addressDataSchema, productList: { id: number, quantity: number }[] }): Promise<number> {
    try {
        const response = await AxiosInstance.post('/purchase/initialize-purchase', data);
        console.log(response.data.purchaseId)
        return response.data.purchaseId;
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