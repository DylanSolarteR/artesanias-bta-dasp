
import { compare, hash } from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

const jwt_config: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '2h'
}

export function singToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, jwt_config)
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
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