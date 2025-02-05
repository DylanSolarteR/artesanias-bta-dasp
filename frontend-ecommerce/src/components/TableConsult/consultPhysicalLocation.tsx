"use client";
import Image from "next/image";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import { useRouter } from "next/navigation";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";


interface ConsultPhysicalLocationsProps {
  physicalLocation_table: PHYSICAL_LOCATION[];
  deletePhysicalLocation: (id: number) => void;
}

function ConsultPhysicalLocations({
  physicalLocation_table,
  deletePhysicalLocation,
}: ConsultPhysicalLocationsProps) {
  const router = useRouter();

  const handleDelete = (id: number) => {
    deletePhysicalLocation(id);
  };

  const handleUpdate = (id: number) => {
    router.push(`puntos-fisicos/editar/${id}`);
  };
  return (
    <div className="container-dashboard">
      <div className="flex-column">
        <h1>PUNTOS FÍSICOS</h1>
        <div className="content-right">
          <div className="search">
            <input type="text" placeholder="Buscar punto físico" />
            <Image src={SearchIcon} alt="search" width={20} height={20} />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Identificación</th>
              <th scope="col">Dirección</th>
              <th scope="col">Teléfono</th>
            </tr>
          </thead>

          <tbody>
            {physicalLocation_table.length !== 0 ? (
              physicalLocation_table.map((physicalLocation) => (
                <tr key={physicalLocation._id} className="text-center">
                  <td data-label="Identificación">{physicalLocation._id}</td>
                  <td data-label="Dirección">{physicalLocation.address}</td>
                  <td data-label="Teléfono">{physicalLocation.telephone}</td>
                  <td data-label="Acciones">
                    <button onClick={() => handleUpdate(physicalLocation._id)}>
                      <Image
                        src={UpdateIcom}
                        alt="update"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button onClick={() => handleDelete(physicalLocation._id)}>
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
                <td colSpan={6}>No se encontraron puntos físicos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultPhysicalLocations;