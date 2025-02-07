"use client";
import RegisterProduct from "@/components/FormsRegister/RegisterProductForm";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import * as apiProduct from "@/api/product.api";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await apiProduct.createProduct(data);
      router.push("/dashboard/productos");
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return !role ? (
    <Loading />
  ) : !hasPermission(role, "create:products") ? (
    router.push("/POS")
  ) : (
    <RegisterProduct onSubmit={handleSubmit} />
  );
}

export default Page;
