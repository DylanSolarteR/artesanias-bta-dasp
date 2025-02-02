"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import RegisterEmployee from "@/components/FormsRegister/RegisterUserDataForm";
import Loading from "@/components/Loading";
import * as apiEmployee from "@/api/employees.api";

function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const { role } = useMainContext();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      apiEmployee
        .getEmployeeById(Number(id))
        .then((data) => {
          setEmployeeData(data);
          setLoading(false);
        })
        .catch(() => {
          router.push("/dashboard/empleados");
        });
    }
  }, [id]);

  const handleSubmit = async (data) => {
    await apiEmployee.updateEmployee(
      Number(id),
      data.email,
      data.name,
      data.lastName,
      data.telephone,
      data.role,
      data.locationId,
      data.activeS
    );
    router.push("/dashboard/empleados");
  };

  useEffect(() => {
    if (role && !hasPermission(role, "view:products")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : loading ? (
    <Loading />
  ) : (
    <RegisterEmployee onSubmit={handleSubmit} user={employeeData} />
  );
}

export default EditEmployeePage;