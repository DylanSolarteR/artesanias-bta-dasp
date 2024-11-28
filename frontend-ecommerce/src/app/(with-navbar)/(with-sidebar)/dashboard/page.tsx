"use client";
import DashboardCard from "@/components/DashboardCard";
import UserIcon from "@/app/icons/UserIcon.svg?url";
import InventoryIcon from "@/app/icons/InventoryIcon.svg?url";
import ShopIcon from "@/app/icons/ShopIcon.svg?url";
import ReportIcon from "@/app/icons/ReportIcon.svg?url";

import { useMainContext } from "@/app/context/MainContext";
import { hasPermission } from "@/util/RolePermissions";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

function dashboard() {
  const { role } = useMainContext();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (role) {
      console.log(role === "cashier");
      role === "cashier" ? router.push("/POS") : setMounted(true);
    }
  }, [role]);

  if (!mounted) {
    return <Loading />;
  } else {
    return (
      <>
        <main className="dashboard-container">
          <section className="dashboard">
            <h1>DASHBOARD</h1>
            <div className="view-main">
              {hasPermission(role, "view:employees") && (
                <DashboardCard
                  title="Empleado"
                  icon={UserIcon}
                  href="/dashboard/empleados"
                />
              )}
              {hasPermission(role, "view:products") && (
                <DashboardCard
                  title="Productos"
                  icon={InventoryIcon}
                  href="/dashboard/productos"
                />
              )}
              {hasPermission(role, "view:inventory") && (
                <DashboardCard
                  title="Inventario"
                  icon={InventoryIcon}
                  href="/dashboard/inventario"
                />
              )}
              {hasPermission(role, "view:physical-stores") && (
                <DashboardCard
                  title="Puntos Fisicos"
                  icon={ShopIcon}
                  href="/dashboard/puntos-fisicos"
                />
              )}
              {hasPermission(role, "view:reports") && (
                <DashboardCard
                  title="Reportes"
                  icon={ReportIcon}
                  href="/dashboard/reportes"
                />
              )}
              {hasPermission(role, "view:POS") && (
                <DashboardCard title="POS" icon={ReportIcon} href="/POS" />
              )}
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default dashboard;
