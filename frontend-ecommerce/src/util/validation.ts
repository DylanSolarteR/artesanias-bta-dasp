import z from 'zod';

export const loginSchema = z.object({
    user: 
        z.string()
        .min(4, {message:"El nombre de usuario debe tener mínimo 4 caracteres"})
        .max(20, {message:"El nombre de usuario debe tener máximo 20 caracteres"}),
    password: 
        z.string()
        .min(6, {message: "La contraseña debe tener mínimo 6 caracteres"})
        .max(20, {message:"La contraseña debe tener máximo 20 caracteres"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {message:"La contraseña debe tener mínimo 6, máximo 20 caracteres, al menos una letra mayúscula, una letra minúscula y un número"}),
});

export const PurchaseDataScheme = z.object({
    name: z.string().min(4, {message:"El nombre debe tener mínimo 4 caracteres"}),
    email: z.string().email({message:"El email no es válido"}),
    documentType: z.enum(["CC", "CE", "NIT", "TI"], {message:"El tipo de documento no es válido"}),
    documentNum: z.string().min(5, {message:"El documento debe tener mínimo 5 caracteres"}),
    address: z.string().min(10, {message:"La dirección debe tener mínimo 10 caracteres"}),
    phone: z.string().min(10, {message:"El teléfono debe tener mínimo 10 caracteres"}),
    department: z.string().min(4, {message:"El departamento debe tener mínimo 4 caracteres"}),
    city: z.string().min(4, {message:"La ciudad debe tener mínimo 4 caracteres"}),
    zip: z.string().min(5, {message:"El código postal debe tener mínimo 5 caracteres"}),
})
/*
Nombre
Correo
Tipo Doc (TI, CC, CE, NIT)
Documento Num
Direccion
Telefono
Departamento
Ciudad
Codigo Postal
*/