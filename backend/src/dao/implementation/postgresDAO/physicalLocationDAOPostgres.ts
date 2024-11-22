
import { PhysicalLocation } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { PostgresConnection } from "../postgresConnection";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";

export class PhysicalLocationDAOPostgres implements IDAO<PhysicalLocation> {
    async create(physicalLocation: PhysicalLocation): Promise<ObjectResponse<PhysicalLocation>> {
        let query='INSERT INTO physical_location VALUES (DEFAULT, $1, $2) RETURNING *'
        try {
            let pool = await PostgresConnection.getInstance().getPool()
            console.log(physicalLocation.direction, physicalLocation.telephone)
            let res = await pool.query({
                text: query,
                values: [
                    physicalLocation.direction,
                    physicalLocation.telephone
                ]
            })

            if (res.rowCount === 1) {
                const createdLocation = new PhysicalLocation(
                    res.rows[0].direction,
                    res.rows[0].telephone,
                    res.rows[0].pk_id
                )
                console.log(createdLocation)
                return new ObjectResponse(true, createdLocation, null)
            }
        }
        catch (e) {
            console.log(e);
            return new ObjectResponse(false, null, 'Failed to create Physical location')
        }
    }

    async query(criteria: Criteria): Promise<ObjectResponse<PhysicalLocation[]>> {
        let query = `SELECT * FROM physical_location`
        let [restriction, params] = CriteriaPostgresConverter.convert(criteria)
        query += restriction

        try {
            let pool = await PostgresConnection.getInstance().getPool()
            let res = await pool.query({
                text: query,
                values: params
            })

            let locations = [];
            if (res.rowCount > 0) {
                locations = res.rows.map(l => new PhysicalLocation(
                    l.direction,
                    l.telephone,
                    l.pk_id
                ))
            }
            return new ObjectResponse(true, locations, null)
        }
        catch (e) {
            console.log(e);
            return new ObjectResponse(false, null, 'Failed to get physical locations')
        }
    }


    async delete(physicalLocation: PhysicalLocation): Promise<boolean> {
        let query = `DELETE FROM physical_location WHERE pk_id=$1;`
        try {
            let pool = await PostgresConnection.getInstance().getPool()
            let res = await pool.query({
                text: query,
                values: [
                    physicalLocation.id
                ]
            })
            console.log(res);
            if (res.rowCount === 1) {
                return true;
            }
        }
        catch (e) {
            console.log(e);
            console.log("meu deus ha fallado")
            return false;
        }

    }
//
    async update(physical_location: PhysicalLocation): Promise<boolean> {
        let query = `UPDATE physical_location SET direction=$2, telephone=$3 WHERE pk_id=$1;`
        try {
            let pool = await PostgresConnection.getInstance().getPool()
            let res = await pool.query({
                text: query,
                values: [
                    physical_location.id,
                    physical_location.direction,
                    physical_location.telephone
                ]
            })
            
            console.log(res);
            if (res.rowCount === 1) {
                return true;
            }
        }
        catch (e) {
            console.log(e);
            console.log("meu deus ha fallado")
            return false;
        }

    }
}