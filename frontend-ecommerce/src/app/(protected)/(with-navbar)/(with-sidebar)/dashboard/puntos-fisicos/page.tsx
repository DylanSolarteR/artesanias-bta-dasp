"use client";
import { useState, useEffect } from "react";
import { useMainContext } from "@/app/context/MainContext";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import ConsultPhysicalLocation from "@/components/TableConsult/consultPhysicalLocation";
import Loading from "@/components/Loading";
import * as apiPhysicalLocation from "@/api/physicalLocation.api";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const [physicalLocation_table, setPhysicalLocation_table] = useState<PHYSICAL_LOCATION[]>([]);

  function deletePhysicalLocation(id: number) {
    apiPhysicalLocation.deletePhysicalLocation(String(id));
    const newPhysicalLocations = physicalLocation_table.filter((physicalLocation) => physicalLocation._id !== id);
    setPhysicalLocation_table(newPhysicalLocations);
  }

  useEffect(() => {
    apiPhysicalLocation
      .listPhysicalLocations()
      .then((physicalLocation) => {
        setPhysicalLocation_table(physicalLocation);
    });
  }, []);

  useEffect(() => {
    if (role && !hasPermission(role, "view:physical-stores")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : (
    <>
      {hasPermission(role, "view:products") && (
        <ConsultPhysicalLocation
          physicalLocation_table={physicalLocation_table}
          deletePhysicalLocation={deletePhysicalLocation}
        />
      )}
    </>
  );
}

export default Page;