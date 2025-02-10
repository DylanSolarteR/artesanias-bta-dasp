"use client";
import { useMainContext } from "@/app/context/MainContext";
import { hasPermission } from "@/util/RolePermissions";
import { useRouter } from "next/navigation";
import RegisterUserData from "@/components/FormsRegister/RegisterUserDataForm";
import Loading from "@/components/Loading";
import * as apiUser from "@/api/auth.api";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await apiUser.createUser(data);
      router.push("/dashboard/empleados");
    } catch (error) {
      console.error("Error al crear empleado:", error);
    }
  };

  return !role ? (
    <Loading />
  ) : !hasPermission(role, "create:employees") ? (
    router.push("/POS")
  ) : (
    <RegisterUserData onSubmit={handleSubmit} />
  );
}

export default Page;
