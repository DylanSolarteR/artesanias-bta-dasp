"use client";
type Props = {};
import InventoryAdmin from "@/components/InventoryAdmin";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { hasPermission } from "@/util/RolePermissions";
import InventoryManager from "@/components/InventoryManager";

function Page({}: Props) {
  const { role } = useMainContext();
  const router = useRouter();

  useEffect(() => {
    if (role && !hasPermission(role, "view:inventory")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : (
    <>
      {hasPermission(role, "view:inventory") && role === "administrator" && (
        <InventoryAdmin />
      )}
      {hasPermission(role, "view:inventory") && role === "manager" && (
        <InventoryManager />
      )}
    </>
  );
}

export default Page;
