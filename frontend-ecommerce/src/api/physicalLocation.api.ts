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
export async function getPhysicalLocationById(id: string): Promise<PHYSICAL_LOCATION> {
    const query = new URLSearchParams();
    query.append('id', id);
    try {
        const response = await AxiosInstance.get(`/location/?${query.toString()}`);
        const location: PHYSICAL_LOCATION = response.data; // Verifica si el backend devuelve un único objeto o una lista
        return location;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(`Error al obtener la ubicación física con ID ${id}:`, err.response?.data || err.message);
            throw new Error(`No se pudo obtener la ubicación física con ID ${id}.`);
        }
        throw err; // Para errores no relacionados con Axios
    }
}


export async function createPhysicalLocation(location: PHYSICAL_LOCATION) {
    try {
        const response = await AxiosInstance.post('/location', location, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data; // Devuelve el nuevo punto físico creado
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

// Actualizar un punto físico existente
export async function updatePhysicalLocation(location: PHYSICAL_LOCATION) {
    try {
        const response = await AxiosInstance.put('/location', location, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data; // Devuelve un mensaje de éxito
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

// Eliminar un punto físico por ID
export async function deletePhysicalLocation(id: string) {
    try {
        const response = await AxiosInstance.delete(`/location/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data; // Devuelve un mensaje de éxito
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}