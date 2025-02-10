import { AxiosInstance } from '@/api/axios';
import { isAxiosError } from 'axios';
import { PHYSICAL_LOCATION } from '@/types/physicalLocation.types';

// Obtener todas las ubicaciones físicas
export async function listPhysicalLocations(): Promise<PHYSICAL_LOCATION[]> {
    try {
        const response = await AxiosInstance.get('/location/');
        const locations: PHYSICAL_LOCATION[] = response.data;
        return locations;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error('Error al obtener las ubicaciones físicas:', err.response?.data || err.message);
            throw new Error('No se pudo obtener la lista de ubicaciones físicas.');
        }
        throw err; // Para errores no relacionados con Axios
    }
}

// Obtener una ubicación física por ID
export async function getPhysicalLocationById(id: string | number): Promise<PHYSICAL_LOCATION> {
    const query = new URLSearchParams();
    if (typeof id === 'number') id = id.toString();
    query.append('id', id);
    try {
        const response = await AxiosInstance.get(`/location/?${query.toString()}`);
        const location: PHYSICAL_LOCATION = response.data[0];
        return location;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(`Error al obtener la ubicación física con ID ${id}:`, err.response?.data || err.message);
            throw new Error(`No se pudo obtener la ubicación física con ID ${id}.`);
        }
        throw err; // Para errores no relacionados con Axios
    }
}


export async function createPhysicalLocation(address: string, telephone: string, latitude: number, longitude: number, image: string) {
    try {
        const form = new FormData();
        form.append("address", address);
        form.append("telephone", telephone);
        form.append("latitude", latitude.toString());
        form.append("longitude", longitude.toString());
        form.append("imgFile", image);

        const response = await AxiosInstance.post('/location/', form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

// Actualizar un punto físico existente
export async function updatePhysicalLocation(
    id: number,
    address: string,
    telephone: string,
    active: boolean,
    latitude: number,
    longitude: number,
    imgFile: string
) {
    try {
        const form = new FormData();
        form.append("address", address);
        form.append("telephone", telephone);
        form.append("active", active.toString());
        form.append("latitude", latitude.toString());
        form.append("longitude", longitude.toString());
        form.append("id", id.toString());
        form.append("imgFile", imgFile);

        const response = await AxiosInstance.put(`/location/${id}`, form,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export async function deletePhysicalLocation(id: number) {
    try {
        const response = await AxiosInstance.delete(`/location/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

export function getlistPhysicalLocations() {
    throw new Error("Function not implemented.");
}
