import { AxiosInstance } from '@/api/axios';
import { isAxiosError } from 'axios';
import { EMPLOYEE } from '@/types/employee.types';

// Obtener todos los empleados
export async function listAllEmployees() {
    try {
        const response = await AxiosInstance.get('/employee/list', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        const employees: EMPLOYEE[] = response.data;
        return employees;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

// Obtener un empleado por ID
export async function getEmployeeById(id: number) {
    try {
        const response = await AxiosInstance.get(`/employee/list/${id}`);
        const employee: EMPLOYEE = response.data;
        return employee;
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}

// Actualizar un empleado
export async function updateEmployee(employee: EMPLOYEE) {
    try {
        const response = await AxiosInstance.put('/employee', employee);
        return response.data; // Podría ser un mensaje de éxito
    } catch (err) {
        if (isAxiosError(err)) {
            throw err;
        }
    }
}