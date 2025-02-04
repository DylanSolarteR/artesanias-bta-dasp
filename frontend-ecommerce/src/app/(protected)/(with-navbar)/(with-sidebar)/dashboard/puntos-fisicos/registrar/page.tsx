"use client";
type Props = {};
import RegisterPhysicalLocation from "@/components/FormsRegister/RegisterPhysicalLocationForm";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";

function Page({}: Props) {
  const { role } = useMainContext();
  const router = useRouter();

  if (!role) {
    return <Loading />;
  }

  if (!hasPermission(role, "view:physical-stores")) {
    router.push("/POS");
    return null;
  }

  return <RegisterPhysicalLocation />;
}

export default Page;
