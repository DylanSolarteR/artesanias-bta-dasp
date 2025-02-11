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
            console.log(err)
            if (err.code === "ERR_NETWORK") {
                return { success: false, message: 'Error de conexión, revise su conexión a internet o intentelo mas tarde.', status: 400 }
            }
            if (err.response.status === 401) {
                return { success: false, message: 'Usuario o contraseña incorrectos.', status: 401 }
            }
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

export async function createUser(employee) {
    try {
        const response = await AxiosInstance.post('/auth/singup', employee, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        return { success: true, data: response.data, status: response.status };
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            return { 
                success: false, 
                message: err.response.data, 
                status: err.response.status 
            };
        }
        return { 
            success: false, 
            message: 'Error inesperado, revise los datos.', 
            status: 500 
        };
    }

}

export async function forgotPassword(userData: { id: number, email: string }) {
    try {
        const response = await AxiosInstance.post('/auth/forgot-password', userData)
        return { success: true, message: response.data, status: response.status }
    } catch (err) {
        if (isAxiosError(err)) {
            return { success: false, message: err.response.data, status: err.status }
        }
        return { success: false, message: 'Error inesperado, revise los datos.', status: 400 }
    }
}

export async function resetPassword(pwData: { password: string, token: string }) {
    try {
        const response = await AxiosInstance.post('/auth/reset-password', pwData)
        return { success: true, message: response.data, status: response.status }
    } catch (err) {
        if (isAxiosError(err)) {
            return { success: false, message: err.response.data, status: err.status }
        }
        return { success: false, message: 'Error inesperado, revise los datos.', status: 400 }
    }
}