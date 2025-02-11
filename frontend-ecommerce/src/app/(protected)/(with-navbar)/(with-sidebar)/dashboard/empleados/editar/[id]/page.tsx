"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import RegisterEmployee from "@/components/FormsRegister/RegisterUserDataForm";
import ConfirmationDialog from "@/components/ConfirmationDialog"
import Loading from "@/components/Loading";
import * as apiEmployee from "@/api/employees.api";

function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const { role } = useMainContext();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
    try {
      const result = await apiEmployee.updateEmployee({
        id: Number(id),
        email: data.email,
        name: data.name,
        lastName: data.lastName,
        telephone: data.telephone,
        role: data.role,
        locationId: data.locationId,
        active: data.activeS,
      });
      if (result.success) {
        setMessage("Empleado modificado con éxito.");
      } else {
        setMessage(`${result.message}`);
      }
    } catch (error) {
      setMessage("Error inesperado al modificar el empleado.");
    } finally {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (role && !hasPermission(role, "update:employees")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : loading ? (
    <Loading />
  ) : (
    <>
      <RegisterEmployee onSubmit={handleSubmit} user={employeeData} />
      <ConfirmationDialog
        message={message}
        open={open}
        setOpen={setOpen}
        showCancel={false}
        confirmText="Aceptar"
      />
    </>
  );
}

export default EditEmployeePage;
