"use client";
import { EMPLOYEE } from "@/types/employee.types";
import { useRouter } from "next/navigation";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";
import SearchBarMenu from "../SearchBarMenu";
import Loading from "@/components/Loading";
import { useState } from "react";
import { useEffect } from "react";
import ImageFb from "../ImageFb";

interface ConsultEmployeesProps {
  employees_table: EMPLOYEE[];
  deleteEmployee: (id: number) => void;
}

function ConsultEmployees({
  employees_table,
  deleteEmployee,
}: ConsultEmployeesProps) {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [employee_list_filtered, setEmployee_list_filtered] = useState<
    EMPLOYEE[]
  >([]);

  const handleDelete = (id: number) => {
    deleteEmployee(id);
  };

  const handleUpdate = (id: number) => {
    router.push(`empleados/editar/${id}`);
  };

  useEffect(() => {
    setEmployee_list_filtered(employees_table);
    setShowLoader(false);
  }, [employees_table]);

  return (
    <div className="container-dashboard">
      <div className="flex-column">
        <h1>EMPLEADOS</h1>
        <div className="content-right">
          <section className="flex flex-col justify-start items-center max-h-20">
            <SearchBarMenu
              search_name="empleado"
              data_array={employees_table}
              filter_keys={["name", "_id"]}
              onFilter={setEmployee_list_filtered}
            />
          </section>
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
            {showLoader ? (
              <td colSpan={7} className="text-center">
                <Loading />
              </td>
            ) : employee_list_filtered.length !== 0 ? (
              employee_list_filtered.map((employee) =>
                employee.active ? (
                  <tr key={employee.id} className="text-center">
                    <td data-label="Identificación">{employee.id}</td>
                    <td data-label="Nombre">{employee.name}</td>
                    <td data-label="Rol">{employee.role}</td>
                    <td data-label="Punto Físico">{employee.locationId}</td>
                    <td data-label="Celular">{employee.telephone}</td>
                    <td data-label="Acciones">
                      <button onClick={() => handleUpdate(employee.id)}>
                        <ImageFb
                          src={UpdateIcom}
                          alt="update"
                          width={30}
                          height={30}
                        />
                      </button>
                      <button onClick={() => handleDelete(employee.id)}>
                        <ImageFb
                          src={DeleteIcon}
                          alt="delete"
                          width={30}
                          height={30}
                        />
                      </button>
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <tr className="text-center">
                <td colSpan={7}>No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultEmployees;
