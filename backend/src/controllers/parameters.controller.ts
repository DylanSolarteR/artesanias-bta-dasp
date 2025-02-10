
import { Request, Response } from "express";
import { DepartmentDAOPostgres } from "../dao/implementation/postgresDAO/departmentDAOPostgres";
import { docTypes } from "../model/businessTypes";

export async function getDeparments(req: Request, res: Response) {
    const dao = new DepartmentDAOPostgres();

    const result = await dao.query(null);

    if (result.hasResponse()) {
        res.status(200).json(result.value);
        return;
    }
    res.status(500).json({ message: result.error || 'Error interno al consultar departamentos' });

}

const docTypeValues = Object.values(docTypes);

export function getDocTypes(req: Request, res: Response) {
    res.status(200).json(docTypeValues);
}