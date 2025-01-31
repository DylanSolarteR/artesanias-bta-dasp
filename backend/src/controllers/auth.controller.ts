import { Request, Response } from 'express';
import { Criteria, Filter, matchType, Sort } from '../dao/Criteria';
import { Employee, employeeRoles } from '../model/businessTypes';
import { EmployeeDAOPostgres } from '../dao/implementation/postgresDAO/employeeDAOPostrgres';
import { compareHashString, hashString, singToken, verifyToken } from '../helpers/auth.helper';
import z from 'zod';
import { MailSender } from '../utils/EmailSender';


export async function singIn(req: Request, res: Response) {

    let dao = new EmployeeDAOPostgres();
    let userId, password;
    try {
        ({ userId, password } = req.body);
    }
    catch (e) {
        res.status(500).send('La id de usuario y la contraseña son requeridos')
        return
    }
    if (!userId) {
        res.status(500).send('La id de usuario es requerida')
        return
    }

    let userCriteria = new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    })

    let employeeResult = await dao.query(userCriteria);

    if (!employeeResult.hasResponse()) {
        res.status(500).send(employeeResult.error)
        return
    }

    // It should not have more than one row result
    if (employeeResult.value.length > 1) {
        res.status(400).send('Hackerman :p')
        return
    }
    if (employeeResult.value.length === 0) {
        res.status(404).send('Usuario no encontrado')
        return
    }

    let employee = employeeResult.value[0];
    let isCorrectPassword = await compareHashString(password, employee.hashedPassword)
    if (!isCorrectPassword) {
        res.status(401).send('Contraseña incorrecta')
        return
    }
    let toSendEmployee = employee.getSecureEmployee()
    res.status(200).send({
        authToken: singToken(toSendEmployee),
        employee: toSendEmployee
    })
}

export async function singUp(req: Request, res: Response) {

    const userRole: employeeRoles = req['user_role']; //Require identifyRole middleware
    let { name, lastName, email, telephone, role, locationId, docType, docNumber } = req.body;

    if (!name || !lastName || !email || !telephone || !role || !docType || !docNumber) {
        res.status(400).send('Todos los campos son requeridos')
        return
    }

    const dao = new EmployeeDAOPostgres();
    if (!Employee.validateRole(role)) {
        res.status(400).send('Rol invalido para el nuevo empleado')
        return
    }

    if (!Employee.validateRoleHierarchy(userRole, role)) {
        res.status(401).send(`El rol ${userRole} no es suficiente para crear un usuario con el rol ${role}`)
        return
    }

    locationId ?? null;
    const newEmployee = new Employee(
        name,
        lastName,
        email,
        telephone,
        role,
        await hashString(`${locationId ?? 0} ${name} ${lastName}`),
        locationId,
        docType,
        docNumber,
        true
    )

    let insertResult = await dao.create(newEmployee)
    if (!insertResult.hasResponse()) {
        res.status(500).send(insertResult.error)
        return
    }

    let employee = insertResult.value

    res.status(200).send({ createdEmployee: employee.getSecureEmployee() })
}

export async function getRole(req: Request, res: Response) {

    const userRole = req['user_role']; //Require identifyRole middleware
    res.status(200).send({ role: userRole });
}

const forgotPassSchema = z.object({
    email: z.string().email({ message: 'El email no es válido' }),
    id: z.number({ message: 'El id debe ser un número' })
        .int({ message: 'El id debe ser un número entero' })
        .positive({ message: 'El id debe ser un número positivo' })
})

export async function forgotPassword(req: Request, res: Response) {
    const validationResult = forgotPassSchema.safeParse(req.body)
    if (!validationResult.success) {
        const errors = validationResult.error.errors.map(e => e.message).join('\n')
        res.status(400).send(errors)
        return
    }

    const { email, id } = validationResult.data

    const dao = new EmployeeDAOPostgres();
    const criteria = new Criteria({
        filters: [
            new Filter('email', email, matchType.strictEqual),
            new Filter('pk_id', id, matchType.strictEqual)
        ]
    })

    const employeeResult = await dao.query(criteria);
    if (!employeeResult.hasResponse()) {
        res.status(500).send(employeeResult.error)
        return
    }

    if (employeeResult.value.length !== 1) {
        res.status(404).send('Usuario no encontrado')
        return
    }

    const token = singToken({ id: id }, { expiresIn: '30m' })

    // Send email
    const mail = new MailSender()
    let html = `<a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Click aquí para recuperar tu contraseña</a>`
    html += `<p>${token}</p>`
    mail.sendMail({
        to: email,
        subject: 'Recuperación de contraseña',
        html
    })
    console.log(email)
    res.status(200).send('Se ha enviado un correo con las instrucciones para recuperar tu contraseña')

}

const resetPassSchema = z.object({
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(60, { message: 'La contraseña debe tener máximo 60 caracteres' }),
    token: z.string({ message: 'El token es requerido' }),
})
export async function resetPassword(req: Request, res: Response) {

    const validationResult = resetPassSchema.safeParse(req.body)
    if (!validationResult.success) {
        const errors = validationResult.error.errors.map(e => e.message).join('\n')
        res.status(400).send(errors)
        return
    }

    const { password, token } = validationResult.data

    console.log(password, token)

    const data = <false | { id: string }>verifyToken(token)
    if (data === false) {
        res.status(400).send('Token inválido')
        return
    }
    const dao = new EmployeeDAOPostgres()
    const criteria = new Criteria({
        filters: [new Filter('pk_id', parseInt(data.id), matchType.strictEqual)]
    })
    const employeeResult = await dao.query(criteria)
    if (!employeeResult.hasResponse()) {
        res.status(500).send(employeeResult.error)
        return
    }
    if (employeeResult.value.length !== 1) {
        res.status(404).send('Usuario no encontrado')
        return
    }
    const employee = employeeResult.value[0]
    const newPassword = await hashString(password)
    employee.hashedPassword = newPassword

    const updateResult = await dao.update(employee)
    if (!updateResult) {
        res.status(500).send('No se pudo actualizar la contraseña')
        return
    }

    res.status(200).send('Contraseña actualizada')

}