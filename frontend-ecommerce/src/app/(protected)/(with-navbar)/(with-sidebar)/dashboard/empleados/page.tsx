"use client";
import { useState } from "react";
import ConsultEmployees from "@/components/TableConsult/consultEmployees";
import { useMainContext } from "@/app/context/MainContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import { EMPLOYEE } from "@/types/employee.types";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const [employees_table, setEmployees_table] = useState<EMPLOYEE[]>([]);

  return !role ? (
    <Loading />
  ) : (
    <>
      {!hasPermission(role, "view:employees") ? (
        router.push("/POS")
      ) : (
        <>
          <ConsultEmployees employees_table={employees_table} />
        </>
      )}
    </>
  );
}

export default Page;
