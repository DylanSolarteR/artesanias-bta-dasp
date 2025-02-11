"use client";
import RegisterProduct from "@/components/FormsRegister/RegisterProductForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import * as apiProduct from "@/api/product.api";
import { useState } from "react";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    try {
      const result = await apiProduct.createProduct(data);
      if (result.success) {
        setMessage("Producto creado con éxito.");
      } else {
        setMessage(`${result.message}`);
      }
    } catch (error) {
      setMessage("Error inesperado al crear un producto.");
    } finally {
      setOpen(true);
    }
  };

  return !role ? (
    <Loading />
  ) : !hasPermission(role, "create:products") ? (
    router.push("/POS")
  ) : (
    <><RegisterProduct onSubmit={handleSubmit} /><ConfirmationDialog
      message={message}
      open={open}
      setOpen={setOpen}
      showCancel={false}
      confirmText="Aceptar" /></>
  );
}

export default Page;
