import { AxiosInstance } from '@/api/axios'
import { isAxiosError } from 'axios'
import { PHYSICAL_LOCATION } from '@/types/physicalLocation.types'

export async function listPhysicalLocations() {
    try {

        const response = await AxiosInstance.get('/location/list')
        const locations: PHYSICAL_LOCATION[] = response.data
        return locations;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function getPhysicalLocation(id: string) {
    const query = new URLSearchParams();
    query.append('id', id.toString())
    try {
        const response = await AxiosInstance.get(`/location/list?` + query.toString())
        const locations: PHYSICAL_LOCATION = response.data
        return locations;
    }
    catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}