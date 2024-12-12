import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
import { PHYSICAL_LOCATION } from '@/types/physicalLocation.types'

export async function listPhysicalLocations() {
    try {

        let response = await AxiosInstance.get('/location/list')
        let locations: PHYSICAL_LOCATION[] = response.data
        return locations;
    }
    catch (err) {
        if (isAxiosError(err)) {
            // console.log(err)
            throw err;
        }
    }
}

export async function getPhysicalLocation(id: string) {
    let query = new URLSearchParams();
    query.append('id', id.toString())
    try {
        let response = await AxiosInstance.get(`/location/list?` + query.toString())
        let locations: PHYSICAL_LOCATION = response.data
        return locations;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}