import Image from "next/image";
import SearchIcon from "@/app/icons/searchIcon.png";

type Employee = {
  id: number;
  identificacion: string;
  nombre: string;
  rol: string;
  puntoFisico: string;
  celular: string;
};

function ConsultaEmpleado({ employees_table }: { employees_table: Employee[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row self-end">
        <input type="text" placeholder="Buscar empleado" />
        <Image src={SearchIcon} alt="search" width={30} height={30} />
      </div>
      <table className="border-slate-950 border-2">
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
  );
}

export default ConsultaEmpleado;
