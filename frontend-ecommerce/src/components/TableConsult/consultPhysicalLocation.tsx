"use client";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import { useRouter } from "next/navigation";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";
import SearchBarMenu from "../SearchBarMenu";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import ImageFb from "../ImageFb";

interface ConsultPhysicalLocationsProps {
  physicalLocation_table: PHYSICAL_LOCATION[];
  deletePhysicalLocation: (id: number) => void;
}

function ConsultPhysicalLocations({
  physicalLocation_table,
  deletePhysicalLocation,
}: ConsultPhysicalLocationsProps) {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [physicalLocation_list_filtered, setPhysicalLocation_list_filtered] =
    useState<PHYSICAL_LOCATION[]>([]);

  const handleDelete = (id: number) => {
    deletePhysicalLocation(id);
  };

  const handleUpdate = (id: number) => {
    router.push(`puntos-fisicos/editar/${id}`);
  };

  useEffect(() => {
    setPhysicalLocation_list_filtered(physicalLocation_table);
    setShowLoader(false);
  }, [physicalLocation_table]);

  return (
    <div className="container-dashboard">
      <div className="flex-column">
        <h1>PUNTOS FÍSICOS</h1>
        <div className="content-right">
          <section className="flex flex-col justify-start items-center max-h-20">
            <SearchBarMenu
              search_name="punto físico"
              data_array={physicalLocation_table}
              filter_keys={["address", "_id"]}
              onFilter={setPhysicalLocation_list_filtered}
            />
          </section>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Identificación</th>
              <th scope="col">Dirección</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {showLoader ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <Loading />
                </td>
              </tr>
            ) : physicalLocation_list_filtered.length !== 0 ? (
              physicalLocation_list_filtered.map((physicalLocation) =>
                physicalLocation.active ? (
                  <tr key={physicalLocation._id} className="text-center">
                    <td data-label="Identificación">{physicalLocation._id}</td>
                    <td data-label="Dirección">{physicalLocation.address}</td>
                    <td data-label="Teléfono">{physicalLocation.telephone}</td>
                    <td data-label="Acciones">
                      <button
                        onClick={() => handleUpdate(physicalLocation._id)}
                      >
                        <ImageFb
                          src={UpdateIcom}
                          alt="update"
                          width={30}
                          height={30}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(physicalLocation._id)}
                      >
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
                <td colSpan={4}>No se encontraron puntos físicos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultPhysicalLocations;
