"use client";
import { useEffect, useState } from "react";
import { useMainContext } from "@/app/context/MainContext";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import { EMPLOYEE } from "@/types/employee.types";
import ConsultEmployees from "@/components/TableConsult/consultEmployees";
import Loading from "@/components/Loading";
import * as apiEmployees from "@/api/employees.api";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const [employees_table, setEmployees_table] = useState<EMPLOYEE[]>([]);

  function deleteEmployee(id: number) {
    apiEmployees.deleteEmployee(String(id));
    const newEmployee = employees_table.filter(
      (employee) => employee.id !== id
    );
    setEmployees_table(newEmployee);
  }

  useEffect(() => {
    apiEmployees.listAllEmployees().then((employee) => {
      setEmployees_table(employee);
    });
  }, []);

  useEffect(() => {
    if (role && !hasPermission(role, "view:employees")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : (
    <>
      {hasPermission(role, "view:employees") && (
        <ConsultEmployees
          employees_table={employees_table}
          deleteEmployee={deleteEmployee}
        />
      )}
    </>
  );
}

export default Page;
