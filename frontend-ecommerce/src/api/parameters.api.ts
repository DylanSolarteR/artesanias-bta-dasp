import { AxiosInstance } from '@/api/axios'
import { DEPARTMENT } from '@/types/parameter.types'
import { isAxiosError } from 'axios'

export async function getDepartments() {
    try {

        const response = await AxiosInstance.get('/parameters/departments')
        const departments: Array<DEPARTMENT> = response.data
        return departments
    }
    catch (err) {
        if (isAxiosError(err)) {
            console.log(err)
            throw err;
        }
    }
}

export async function getDocTypes() {
    try {
        const response = await AxiosInstance.get('/parameters/doc-types')
        const docTypes: Array<string> = response.data
        return docTypes
    }
    catch (err) {
        if (isAxiosError(err)) {
            console.log(err)
            throw err;
        }
    }
}