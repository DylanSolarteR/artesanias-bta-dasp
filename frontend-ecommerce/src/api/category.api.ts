import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
// '/category/list'
export async function listCategories() {
    try {

        let response = await AxiosInstance.get('/category/list')
        let categories: Array<any> = response.data
        return categories.map(c => ({ name: <string>c.name, id: <number>c._id }))
    }
    catch (err) {
        if (isAxiosError(err)) {
            console.log("Error de extracción de datos")
        }
    }



}