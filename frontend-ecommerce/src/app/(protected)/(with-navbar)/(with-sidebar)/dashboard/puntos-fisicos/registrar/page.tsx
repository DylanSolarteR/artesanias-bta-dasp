"use client";
type Props = {};
import RegisterPhysicalLocation from "@/components/FormsRegister/RegisterPhysicalLocationForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import { useEffect, useState } from "react";
import * as apiPhysicalLocation from "@/api/physicalLocation.api";

function Page({ }: Props) {
  const { role } = useMainContext();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    try {
      const result = await apiPhysicalLocation.createPhysicalLocation(data.address, data.telephone, data.latitude, data.longitude, data.imgFile);
      if (result.success) {
        setMessage("Punto físico creado con éxito.");
      } else {
        setMessage(`${result.message}`);
      }
    } catch (error) {
      setMessage("Error inesperado al crear el punto físico.");
    } finally {
      setOpen(true);
    }
  };

  return !role ? (
    <Loading />
  ) : !hasPermission(role, "create:physical-stores") ? (
    router.push("/POS")
  ) : (
    <><RegisterPhysicalLocation onSubmit={handleSubmit} /><ConfirmationDialog
      message={message}
      open={open}
      setOpen={setOpen}
      showCancel={false}
      confirmText="Aceptar" /></>
  );
}

export default Page;
