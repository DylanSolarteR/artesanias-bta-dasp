const API_RESOURCE = 'http://localhost:3200/api/auth'
import {loginSchema} from '@/util/validation'
import {ZodError} from 'zod'


export async function loginAuth(prevState: null, queryData: FormData) {
    const data = {
        user: queryData.get('user'),
        password: queryData.get('password')
    }
    try{
        loginSchema.parse(data)
        //peticion
        return {success: true, message: 'Success', status: 200}
    }catch(err){
        if(err instanceof ZodError){
            console.log(err.issues[0].message)
            return{success: false, message: err.issues[0].message, status: 400}
        }
        return {success: false, message: 'Error', status: 400}
    }

}