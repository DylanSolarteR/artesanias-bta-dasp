"use client";
import Image from "next/image";
import { EMPLOYEE } from "@/types/employee.types";
import { useRouter } from "next/navigation";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";


interface ConsultEmployeesProps {
  employees_table: EMPLOYEE[];
  deleteEmployee: (id: number) => void;
}

function ConsultEmployees({
  employees_table,
  deleteEmployee,
}: ConsultEmployeesProps) {
  const router = useRouter();

  const handleDelete = (id: number) => {
    deleteEmployee(id);
  };

  const handleUpdate = (id: number) => {
    router.push(`empleados/editar/${id}`);
  };
  return (
    <div className="container-dashboard">
      <div className="flex-column">
        <h1>EMPLEADOS</h1>
        <div className="content-right">
          <div className="search">
            <input type="text" placeholder="Buscar empleado" />
            <Image src={SearchIcon} alt="search" width={20} height={20} />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Identificación</th>
              <th scope="col">Nombre</th>
              <th scope="col">Rol</th>
              <th scope="col">Punto Físico</th>
              <th scope="col">Celular</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {employees_table.length !== 0 ? (
              employees_table.map((employee) => (
                <tr key={employee.id} className="text-center">
                  <td data-label="Identificación">{employee.id}</td>
                  <td data-label="Nombre">{employee.name}</td>
                  <td data-label="Rol">{employee.role}</td>
                  <td data-label="Punto Físico">{employee.locationId}</td>
                  <td data-label="Celular">{employee.telephone}</td>
                  <td data-label="Acciones">
                    <button onClick={() => handleUpdate(employee.id)}>
                      <Image
                        src={UpdateIcom}
                        alt="update"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button onClick={() => handleDelete(employee.id)}>
                      <Image
                        src={DeleteIcon}
                        alt="delete"
                        width={30}
                        height={30}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={6}>No se encontraron empleados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultEmployees;
