"use client";
type Props = {};
import RegisterPhysicalLocation from "@/components/FormsRegister/RegisterPhysicalLocationForm";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import { useEffect } from "react";
import * as apiPhysicalLocation from "@/api/physicalLocation.api";

function Page({ }: Props) {
  const { role } = useMainContext();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await apiPhysicalLocation.createPhysicalLocation(data.address, data.telephone, data.latitude, data.longitude, data.imgFile);
      router.push("/dashboard/puntos-fisicos");
    } catch (error) {
      console.error("Error al crear un punto físico:", error);
    }
  };

  return !role ? (
    <Loading /> 
  ) : !hasPermission(role, "create:physical-stores") ? (
    router.push("/POS")
  ) : (
    <RegisterPhysicalLocation onSubmit={handleSubmit} />
  );
}

export default Page;
