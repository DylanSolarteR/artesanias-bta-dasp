"use client";
type Props = {};
import InventoryAdmin from "@/components/InventoryAdmin";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";

function page({}: Props) {
  const { role } = useMainContext();
  const router = useRouter();

  return !role ? (
    <Loading />
  ) : (
    <>
      {!hasPermission(role, "view:inventory") ? (
        router.push("/POS")
      ) : (
        <>
          <InventoryAdmin />
        </>
      )}
    </>
  );
}

export default page;
