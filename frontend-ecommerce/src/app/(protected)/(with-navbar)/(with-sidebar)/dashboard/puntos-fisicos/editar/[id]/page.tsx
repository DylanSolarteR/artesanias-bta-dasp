"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import RegisterPhysicalLocation from "@/components/FormsRegister/RegisterPhysicalLocationForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Loading from "@/components/Loading";
import * as apiPhysicalLocation from "@/api/physicalLocation.api";

function EditPhysicalLocationPage() {
  const { id } = useParams<{ id: string }>();
  const { role } = useMainContext();
  const [physicalLocationData, setPhysicalLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
    try {
      const result = await apiPhysicalLocation.updatePhysicalLocation(
        Number(id),
        data.address,
        data.telephone,
        true,
        data.latitude,
        data.longitude,
        data.imgFile,
      );
      if (result.success) {
        setMessage("Puto físico modificado con éxito.");
      } else {
        setMessage(`${result.message}`);
      }
    } catch (error) {
      setMessage("Error inesperado al modificar el punto físico.");
    } finally {
      setOpen(true);
    }
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
    <><RegisterPhysicalLocation onSubmit={handleSubmit} physicalLocation={physicalLocationData} /><ConfirmationDialog
          message={message}
          open={open}
          setOpen={setOpen}
          showCancel={false}
          confirmText="Aceptar" /></>
  );
}

export default EditPhysicalLocationPage;