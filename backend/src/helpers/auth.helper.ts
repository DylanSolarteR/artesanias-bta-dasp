
import { compare, hash } from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { EmployeeDAOPostgres } from "../dao/implementation/postgresDAO/employeeDAOPostrgres";
import { Criteria, Filter, matchType } from "../dao/Criteria";
import { employeeRoles } from "../model/businessTypes";

const jwt_config: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '2h'
}

export function singToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, jwt_config)
}

export function verifyToken(token): false | { id: string } {
    try {
        return <{ id: string }>jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return false
    }
}

export async function comparePassword(toCompare, originalPassword) {
    return await compare(toCompare, originalPassword)
}

export async function hashPassword(password: string) {
    return await hash(password, parseInt(process.env.SALT))
}

export async function getUserRole(userId: number): Promise<employeeRoles> {
    let dao = new EmployeeDAOPostgres()
    const criteria = new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    })
    const employeeResult = await dao.query(criteria)
    if (!employeeResult.hasResponse()) {
        throw Error(employeeResult.error);
    }
    if (employeeResult.value.length == 0) {
        throw Error('This user was deleted');
    }
    if (employeeResult.value.length == 0) {
        console.log('Se nos metieron al rancho');
        throw Error('hackerman');
    }
    const employee = employeeResult.value[0];
    return employee.role;
}

export async function validateRole(role: employeeRoles, requiredRoles: employeeRoles | employeeRoles[]): Promise<boolean> {
    if (!Array.isArray(requiredRoles)) {
        requiredRoles = [requiredRoles];
    }
    return requiredRoles.includes(role);
}