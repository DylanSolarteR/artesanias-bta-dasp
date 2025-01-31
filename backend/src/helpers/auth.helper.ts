
import { compare, hash } from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { EmployeeDAOPostgres } from "../dao/implementation/postgresDAO/employeeDAOPostrgres";
import { Criteria, Filter, matchType } from "../dao/Criteria";
import { employeeRoles } from "../model/businessTypes";

const jwt_config: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '2h'
}

export function singToken(payload, options?: SignOptions): string {
    const _jwt_config = { ...jwt_config, ...options }
    return jwt.sign(payload, process.env.JWT_SECRET, _jwt_config)
}

export function verifyToken(token): false | any {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return false
    }
}

export async function compareHashString(toCompare, hashedString) {
    return await compare(toCompare, hashedString)
}

export async function hashString(str: string) {
    return await hash(str, parseInt(process.env.SALT))
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