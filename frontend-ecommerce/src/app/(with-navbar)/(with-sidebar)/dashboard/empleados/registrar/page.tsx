"use client";
type Props = {};
import RegisterUserData from "@/components/RegisterUserDataForm";
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
      {!hasPermission(role, "view:employees") ? (
        router.push("/POS")
      ) : (
        <>
          <RegisterUserData />
        </>
      )}
    </>
  );
}

export default page;