// const API_RESOURCE = 'http://localhost:3200/api/auth/singin'
const ROOT_STRING = '/auth/singin'
import {loginSchema} from '@/util/validation'
import {ZodError} from 'zod'
import {AxiosInstance} from '@/api/axios'
import { isAxiosError } from 'axios'
export async function loginAuth(prevState: null, queryData: FormData) {
    const data = {
        userId: parseInt(queryData.get('userId') as string),
        password: queryData.get('password')
    }

    try{
        loginSchema.parse(data)
        let response = await AxiosInstance.post(ROOT_STRING, data)
        console.log(response.data)
        return {success: true, message: 'Inicio de sesión satisfactorio.', status: response.status}
    }catch(err){
        if(err instanceof ZodError){
            console.log(err.issues[0].message)
            return{success: false, message: err.issues[0].message, status: 400}
        }
        if(isAxiosError(err)){
            return {success: false, message: err.response.data, status: err.status}
        }
        console.log(err)
        return {success: false, message: 'Error inesperado, revise las credenciales o intentelo más tarde.', status: 400}
    }

}