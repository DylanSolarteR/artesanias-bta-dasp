
import { PhysicalLocation } from "../../../model/businessTypes";
import { Criteria } from "../../Criteria";
import { IDAO, ObjectResponse } from "../../dao";
import { PostgresConnection } from "../postgresConnection";
import { CriteriaPostgresConverter } from "../CriteriaPostgresConverter";

export class PhysicalLocationDAOPostgres implements IDAO<PhysicalLocation> {
    async create(physicalLocation: PhysicalLocation): Promise<ObjectResponse<PhysicalLocation>> {
        let query = 'INSERT INTO physical_location VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *'
        try {
            let pool = await PostgresConnection.getInstance().getPool()
            let res = await pool.query({
                text: query,
                values: [
                    physicalLocation.address,
                    physicalLocation.telephone,
                    physicalLocation.active,
                    physicalLocation.latitude,
                    physicalLocation.longitude,
                    physicalLocation.image
                ]
            })

            if (res.rowCount === 1) {
                const createdLocation = new PhysicalLocation(
                    res.rows[0].address,
                    res.rows[0].telephone,
                    res.rows[0].active,
                    res.rows[0].latitude,
                    res.rows[0].longitude,
                    res.rows[0].image,
                    res.rows[0].pk_id
                )
                return new ObjectResponse(true, createdLocation, null)
            }
        }
        catch (e) {
            console.log(e);
            return new ObjectResponse(false, null, 'Error al crear el punto físico')
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
                    l.address,
                    l.telephone,
                    l.active,
                    l.latitude,
                    l.longitude,
                    l.image,
                    l.pk_id
                ))
            }
            return new ObjectResponse(true, locations, null)
        }
        catch (e) {
            console.log(e);
            return new ObjectResponse(false, null, 'Fue imposible obtener los puntos físicos')
        }
    }


    async delete(physicalLocation: PhysicalLocation): Promise<boolean> {
        let query = `UPDATE physical_location SET active = FALSE WHERE pk_id=$1;`
        try {
            let pool = await PostgresConnection.getInstance().getPool()
            let res = await pool.query({
                text: query,
                values: [
                    physicalLocation.id
                ]
            })
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
        let query = `UPDATE physical_location 
                    SET address=$2, telephone=$3, active=$4, latitude=$5, longitude=$6,
                    image=$7
                    WHERE pk_id=$1;`
        try {
            let pool = await PostgresConnection.getInstance().getPool()
            let res = await pool.query({
                text: query,
                values: [
                    physical_location.id,
                    physical_location.address,
                    physical_location.telephone,
                    physical_location.active,
                    physical_location.latitude,
                    physical_location.longitude,
                    physical_location.image
                ]
            })

            if (res.rowCount === 1) {
                return true;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }

    }
}