import { AxiosInstance } from '@/api/axios';
import { isAxiosError } from 'axios';
import { EMPLOYEE } from '@/types/employee.types';

// Obtener todos los empleados
export async function listAllEmployees() {
    try {
        const response = await AxiosInstance.get('/employee/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        const employees: EMPLOYEE[] = response.data;
        return employees;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            return { 
                success: false, 
                message: err.response.data, 
                status: err.response.status 
            };
        }
        return { 
            success: false, 
            message: 'Error inesperado, revise los datos.', 
            status: 500 
        };
    }
}

// Obtener un empleado por ID
export async function getEmployeeById(id: number) {
    try {
        const response = await AxiosInstance.get(`/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        const employee: EMPLOYEE = response.data[0];
        return employee;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            return { 
                success: false, 
                message: err.response.data, 
                status: err.response.status 
            };
        }
        return { 
            success: false, 
            message: 'Error inesperado, revise los datos.', 
            status: 500 
        };
    }
}

// Actualizar un empleado
export async function updateEmployee(employeeData: EMPLOYEE) {
    const { id, email, name, lastName, telephone, role, locationId, active } = employeeData;
    try {
        const response = await AxiosInstance.put('/employee/', { id, email, name, lastName, telephone, role, locationId, active }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        return { success: true, data: response.data, status: response.status };

    } catch (err) {
        if (isAxiosError(err) && err.response) {
            return { 
                success: false, 
                message: err.response.data, 
                status: err.response.status 
            };
        }
        return { 
            success: false, 
            message: 'Error inesperado, revise los datos.', 
            status: 500 
        };
    }
}

export async function deleteEmployee(id: string) {
    try {
        const response = await AxiosInstance.delete(`/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            return { 
                success: false, 
                message: err.response.data, 
                status: err.response.status 
            };
        }
        return { 
            success: false, 
            message: 'Error inesperado, revise los datos.', 
            status: 500 
        };
    }
}