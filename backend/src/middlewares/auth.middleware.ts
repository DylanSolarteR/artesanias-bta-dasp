import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/auth";
import { EmployeeDAOPostgres } from "../dao/implementation/postgresDAO/employeeDAOPostrgres";
import { Criteria, Filter, matchType } from "../dao/Criteria";
import { employeeRoles } from "../model/businessTypes";

export function verifyAuth(req: Request, res: Response, next: NextFunction) {

    let token;
    try {
        token = req.headers.authorization.split(' ')[1];
    } catch (error) {
        res.status(401).send('Auth token is required for the query')
        return
    }
    const data = verifyToken(token);
    if (data === false) {
        res.status(401).send('Invalid token')
        return
    }
    next()
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {

    let token = req.headers.authorization.split(' ')[1];
    const data = verifyToken(token);
    const userId = data['id']

    let dao = new EmployeeDAOPostgres()
    const criteria = new Criteria({
        filters: [new Filter('pk_id', userId, matchType.strictEqual)]
    })
    const employeeResult = await dao.query(criteria)
    if (!employeeResult.hasResponse()) {
        res.status(500).send(employeeResult.error)
        return
    }
    if (employeeResult.value.length == 0) {
        res.status(401).send('This user was deleted')
        return
    }
    if (employeeResult.value.length == 0) {
        console.log('Se nos metieron al rancho')
        res.status(401).send('🤨🔫')
        return
    }
    const employee = employeeResult.value[0]
    if (employee.role !== employeeRoles.administrator) {
        res.status(401).send('You must be an administrator to do it')
        return

    }

    next()
}