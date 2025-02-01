"use client";
import Image from "next/image";
import { EMPLOYEE } from "@/types/employee.types";
import { useRouter } from "next/navigation";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";

interface ConsultEmployeesProps {
  employees_table: EMPLOYEE[];
  //deleteEmployeee: (id: number) => void;
}

function ConsultEmployees({
  employees_table,
  //deleteEmployeee,
}: ConsultEmployeesProps) {
  const router = useRouter();

  const handleDelete = (id: number) => {
    //deleteEmployeee(id);
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
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.locationId}</td>
                  <td>{employee.telephone}</td>
                  <td>
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
