import z from 'zod';
import { docTypes } from '@/types/purchase.types';

export const loginSchema = z.object({
    userId: z.number({ message: "Id de usuario no valida" }),
    password:
        z.string()
            .min(6, { message: "Contraseña incorrecta" })
            .max(20, { message: "Contraseña incorrecta" })
});



const docTypeValues = Object.values(docTypes) as [string, ...string[]]

export const PurchaseDataScheme = z.object({
    name: z.string().min(3, { message: "El nombre debe tener mínimo 3 caracteres" }),
    email: z.string().email({ message: "El email no es válido" }),
    documentType: z.enum(docTypeValues, {
        message: 'Tipo de documento inválido'
    }),
    documentNum: z.preprocess(value => String(value).replace(/^0+/g, ''),
        z.string()
            .regex(/^\d+$/, { message: 'Número de documento inválido' })
            .refine(value => parseInt(value) > 0, { message: 'La identificación debe ser mayor a 0' })
            .and(z.string().min(1, { message: 'Número de documento debe tener al menos 1 caractér' })
                .max(15, { message: 'Número de documento debe tener máximo 15 caractér' }))
    ),
    address: z.string().min(10, { message: "La dirección debe tener mínimo 10 caracteres" }),
    phone: z.preprocess(value => String(value).replace(/^0+/g, ''),
        z.string()
            .regex(/^\d+$/, { message: 'Teléfono inválido' })
            .refine(value => parseInt(value) > 0, { message: 'El teléfono debe ser mayor a 0' })
    ),
    department: z.string().min(4, { message: "El departamento debe tener mínimo 4 caracteres" }),
    city: z.string().min(4, { message: "La ciudad debe tener mínimo 4 caracteres" }),
    zip: z.string().min(5, { message: "El código postal debe tener mínimo 5 caracteres" }),
})




const basicUserDataSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    name: z.string({ message: 'Nombre inválido' }).trim()
        .min(3, 'Nombre inválido'),
    docType: z.enum(docTypeValues, {
        message: 'Tipo de documento inválido'
    }),
    identification: z.preprocess(value => String(value).replace(/^0+/g, ''),
        z.string()
            .regex(/^\d+$/, { message: 'La identificación inválida' })
            .refine(value => parseInt(value) > 0, { message: 'La identificación debe ser mayor a 0' })
            .and(z.string().min(1, { message: 'Identificación inválida' })
                .max(15, { message: 'Identificación inválida' }))
    ),
    telephone: z.preprocess(value => String(value).replace(/^0+/g, ''),
        z.string()
            .regex(/^\d+$/, { message: 'Teléfono inválido' })
            .refine(value => parseInt(value) > 0, { message: 'El teléfono debe ser mayor a 0' })
    )
});