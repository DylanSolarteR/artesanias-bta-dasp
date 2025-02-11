"use client";
import { useMainContext } from "@/app/context/MainContext";
import { hasPermission } from "@/util/RolePermissions";
import { useRouter } from "next/navigation";
import RegisterUserData from "@/components/FormsRegister/RegisterUserDataForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Loading from "@/components/Loading";
import * as apiUser from "@/api/auth.api";
import { useState } from "react";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    try {
      const result = await apiUser.createUser(data);
      if (result.success) {
        setMessage("Empleado creado con éxito.");
      } else {
        setMessage(`${result.message}`);
      }
    } catch (error) {
      setMessage("Error inesperado al crear empleado.");
    } finally {
      setOpen(true);
    }
  };

  return !role ? (
    <Loading />
  ) : !hasPermission(role, "create:employees") ? (
    router.push("/POS")
  ) : (
    <><RegisterUserData onSubmit={handleSubmit} /><ConfirmationDialog
      message={message}
      open={open}
      setOpen={setOpen}
      showCancel={false}
      confirmText="Aceptar"
    /></>
  );
}

export default Page;
