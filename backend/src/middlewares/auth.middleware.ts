import { NextFunction, Request, Response } from "express";
import { getUserRole, verifyToken } from "../helpers/auth.helper";
import { EmployeeDAOPostgres } from "../dao/implementation/postgresDAO/employeeDAOPostrgres";
import { Criteria, Filter, matchType } from "../dao/Criteria";
import { employeeRoles } from "../model/businessTypes";

export function verifyAuth(req: Request, res: Response, next: NextFunction) {

    let token;
    try {
        token = req.headers.authorization?.split(' ')[1];
    } catch (error) {
        res.status(401).send('Auth token is required for the query')
        return
    }
    const data = verifyToken(token);
    if (data === false) {
        res.status(401).send('Invalid token')
        return
    }
    req['user_id'] = data.id;
    next()
}

export async function identifyRole(req: Request, res: Response, next: NextFunction) {

    if (!req.headers.authorization) {
        res.status(401).send('Auth token is required for the query')
        return
    }
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(401).send('Auth token is required for the query')
        return
    }
    const data = verifyToken(token);
    const userId = data['id'];

    try {
        const role = await getUserRole(userId);
        req['user_role'] = role;
    } catch (error) {
        res.status(401).send(error.toString());
        return;
    }
    next()
}