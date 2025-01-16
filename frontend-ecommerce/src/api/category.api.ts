import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
// '/category/list'
export async function listCategories() {
    try {

        const response = await AxiosInstance.get('/category/list')
        const categories: Array<any> = response.data
        return categories.map(c => ({ name: <string>c.name, id: <number>c._id }))
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}