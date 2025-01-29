"use client";
type Props = {};
import RegisterProduct from "@/components/FormsRegister/RegisterProductForm";
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
      {!hasPermission(role, "view:products") ? (
        router.push("/POS")
      ) : (
        <>
          <RegisterProduct />
        </>
      )}
    </>
  );
}

export default Page;