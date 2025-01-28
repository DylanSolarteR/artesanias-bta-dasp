"use client";
import Image from "next/image";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import { EMPLOYEE } from "@/types/employee.types";

function ConsultEmployees({ employees_table }: { employees_table: EMPLOYEE[] }) {
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
                  <td>{employee.identificacion}</td>
                  <td>{employee.nombre}</td>
                  <td>{employee.rol}</td>
                  <td>{employee.puntoFisico}</td>
                  <td>{employee.celular}</td>
                  <td>
                    <button>
                      <Image
                        src={SearchIcon}
                        alt="update"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button>
                      <Image
                        src={SearchIcon}
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
