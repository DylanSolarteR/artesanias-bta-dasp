"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import RegisterPhysicalLocation from "@/components/FormsRegister/RegisterPhysicalLocationForm";
import Loading from "@/components/Loading";
import * as apiPhysicalLocation from "@/api/physicalLocation.api";

function EditPhysicalLocationPage() {
  const { id } = useParams<{ id: string }>();
  const { role } = useMainContext();
  const [physicalLocationData, setPhysicalLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      apiPhysicalLocation
        .getPhysicalLocationById(Number(id))
        .then((data) => {
          setPhysicalLocationData(data);
          setLoading(false);
        })
        .catch(() => {
          router.push("/dashboard/puntos-fisicos");
        });
    }
  }, [id]);

  const handleSubmit = async (data) => {
    await apiPhysicalLocation.updatePhysicalLocation(
      data.address, 
      data.telephone,
      false,
      data.latitude,
      data.longitude
    );
    router.push("/dashboard/puntos-fisicos");
  };

  useEffect(() => {
    if (role && !hasPermission(role, "update:physical-stores")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : loading ? (
    <Loading />
  ) : (
    <RegisterPhysicalLocation onSubmit={handleSubmit} physicalLocation={physicalLocationData} />
  );
}

export default EditPhysicalLocationPage;