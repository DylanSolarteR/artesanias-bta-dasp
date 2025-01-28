"use client";
type Props = {};
import RegisterPhysicalLocation from "@/components/RegisterPhysicalLocationForm";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";

function Page({}: Props) {
  const { role } = useMainContext();
  const router = useRouter();

  return !role ? (
    <Loading />
  ) : (
    <>
      {!hasPermission(role, "view:physical-stores") ? (
        router.push("/POS")
      ) : (
        <>
          <RegisterPhysicalLocation />
        </>
      )}
    </>
  );
}

export default Page;
