"use client";
import DashboardCard from "@/components/DashboardCard";
import EmployeeImage from "@/app/images/EmployeeImage.png";
import ProductImage from "@/app/images/ProductImage.png";
import InventoryImage from "@/app/images/InventoryImage.png";
import ShopImage from "@/app/images/PhysicalPointImage.png";
import ReportImage from "@/app/images/ReportImage.png";

import EmployeeIcon from "@/app/images/EmployeeImage.webp";
import ProductIcon from "@/app/images/VaseImage.png";
import InventoryIcon from "@/app/images/BoxesImage.webp";
import ShopIcon from "@/app/images/StoreImage.webp";
import ReportIcon from "@/app/images/ReportImage.webp";

import { useMainContext } from "@/app/context/MainContext";
import { hasPermission } from "@/util/RolePermissions";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import "@/app/css/dashboard.css";

import { useRouter } from "next/navigation";

function Dashboard() {
  const { role } = useMainContext();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (role) {
      role === "cashier" ? router.push("/POS") : setMounted(true);
    }
  }, [role]);

  if (!mounted) {
    return <Loading />;
  } else {
    return (
      <>
        <main className="container">
          <section className="dashboard">
            <h1>DASHBOARD</h1>
            <div className="flex-grid">
              {hasPermission(role, "view:employees") && (
                <DashboardCard
                  title="Empleados"
                  image={EmployeeImage}
                  href={[
                    {
                      title: "Ver Empleados",
                      href: "/dashboard/empleados",
                      icon: EmployeeIcon,
                    },
                  ]}
                />
              )}
              {hasPermission(role, "view:products") && (
                <DashboardCard
                  title="Productos"
                  image={ProductImage}
                  href={[
                    {
                      title: "Ver productos",
                      href: "/dashboard/productos",
                      icon: ProductIcon,
                    },
                  ]}
                />
              )}
              {hasPermission(role, "view:inventory") && (
                <DashboardCard
                  title="Inventario"
                  image={InventoryImage}
                  href={[
                    {
                      title: "Ver inventario",
                      href: "/dashboard/inventario",
                      icon: InventoryIcon,
                    },
                  ]}
                />
              )}
              {hasPermission(role, "view:physical-stores") && (
                <DashboardCard
                  title="Puntos Fisicos"
                  image={ShopImage}
                  href={[
                    {
                      title: "Ver puntos físicos",
                      href: "/dashboard/puntos-fisicos",
                      icon: ShopIcon,
                    },
                  ]}
                />
              )}
              {hasPermission(role, "view:reports") && (
                <DashboardCard
                  title="Reportes"
                  image={ReportImage}
                  href={[
                    {
                      title: "Ver reportes",
                      href: "/dashboard/reportes",
                      icon: ReportIcon,
                    },
                  ]}
                />
              )}
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Dashboard;
