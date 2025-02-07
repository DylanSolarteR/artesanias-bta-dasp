
import { isAxiosError } from "axios";
import { AxiosInstance } from "./axios";
import { addressDataSchema, basicUserDataSchema, productSchema } from '../types/purchase.types';
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { headers } from "next/headers";

export async function initializePurchase(data: { basicUserData: basicUserDataSchema, addressData: addressDataSchema, productList: productSchema[] }): Promise<number> {
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
            return err.response;
        }
    }
}