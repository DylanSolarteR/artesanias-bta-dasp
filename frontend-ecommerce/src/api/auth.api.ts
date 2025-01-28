import { loginSchema } from '@/util/validation'
import { ZodError } from 'zod'
import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
export async function loginAuth(prevState: null, queryData: FormData) {
    const data = {
        userId: parseInt(queryData.get('userId') as string),
        password: queryData.get('password')
    }

    try {
        loginSchema.parse(data)
        const response = await AxiosInstance.post('/auth/singin', data)
        localStorage.setItem('authToken', response.data.authToken)
        return { success: true, message: 'Inicio de sesión satisfactorio.', status: response.status, authToken: response.data.authToken }
    } catch (err) {
        if (err instanceof ZodError) {
            return { success: false, message: err.issues[0].message, status: 400 }
        }
        if (isAxiosError(err)) {
            return { success: false, message: err.message, status: err.status }
        }
        return { success: false, message: 'Error inesperado, revise las credenciales o intentelo más tarde.', status: 400 }
    }

}

export async function getRole() {
    try {
        const response = await AxiosInstance.get('/auth/get-role', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        return { success: true, role: response.data.role, status: response.status }
    } catch (err) {
        if (isAxiosError(err)) {
            return { success: false, message: err.response.data, status: err.status }
        }
        return { success: false, message: 'Error inesperado, revise las credenciales o intentelo más tarde.', status: 400 }
    }

}