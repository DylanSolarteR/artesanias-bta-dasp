import z, { number } from 'zod';

export const loginSchema = z.object({
    // user: 
    //     z.string()
    //     .min(4, {message:"Nombre de usuario no valido"})
    //     .max(20, {message:"Nombre de usuario no valido"}),
    userId: z.number({ message: "Id de usuario no valida" }),
    password:
        z.string()
            .min(6, { message: "Contraseña incorrecta" })
            .max(20, { message: "Contraseña incorrecta" })
});

export const PurchaseDataScheme = z.object({
    name: z.string().min(4, { message: "El nombre debe tener mínimo 4 caracteres" }),
    email: z.string().email({ message: "El email no es válido" }),
    documentType: z.enum(["CC", "CE", "NIT", "TI"], { message: "El tipo de documento no es válido" }),
    documentNum: z.string().min(5, { message: "El documento debe tener mínimo 5 caracteres" }),
    address: z.string().min(10, { message: "La dirección debe tener mínimo 10 caracteres" }),
    phone: z.string().min(10, { message: "El teléfono debe tener mínimo 10 caracteres" }),
    department: z.string().min(4, { message: "El departamento debe tener mínimo 4 caracteres" }),
    city: z.string().min(4, { message: "La ciudad debe tener mínimo 4 caracteres" }),
    zip: z.string().min(5, { message: "El código postal debe tener mínimo 5 caracteres" }),
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

//RegisterUserForm
export const EmployeeDataScheme = z.object({
    name: z.string().min(3, { message: "El nombre debe tener minimo 3 caracteres"}),
    lastname: z.string().min(4, {message:"El apellido debe tener minimo 4 caracteres "}),
    telephone: z.string().min(7, {message:"El telefono debe tener minimo 7 caracteres"}),
    role: z.enum(["cashier", "manager", "administrator"], { message: "Rol no válido" }),
    locationId: z.string().min(1,{message:""}),
    docType: z.enum(["CC", "CE", "NIT", "TI"], { message: "El tipo de documento no es válido" }),
    docNumber: z.string().min(8, {message:"El documento debe tener minimo 8 caracteres"})

})

/*
Nombre
Apellido
Telefono
Rol
Id del local
Tipo Documento (TI, CC, CE, NIT)
Numero de documento
*/

// RegisterProductForm
export const ProductDataScheme = z.object({
    productBase: z.string(),
    name: z.string()
    .min(4, {message:"Debe tener minimo 4 caracteres"})
    .max(30, {message:"Debe tener maximo 30 caracteres"}),
    description: z.string()
    .min(150, {message:"La descripcion debe tener minimo 150 caracteres"})
    .max(250, {message:"La descripcion debe tener maximo 250 caracteres"}),
    price: z.number().min(10000,{message:"El precio debe ser mayor a 10000"}),
    image: z.string(),
    active: z.boolean(),
    category: z.string()
    .min(15, {message:"La categoria debe tener minimo 15 caracteres"})
    .max(30, {message:"La categoria debe tener maximo 30 caracteres"}),

})

/*
Producto base
nombre
descripcion
precio
imagen
activo
categoria
*/


//RegisterPhysicalLocationForm
export const PhysicalLocationDataScheme = z.object({
    direction: z.string(),
    telephone: z.string()
})

/*
direccion
telefono
*/