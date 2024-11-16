"use client";
import "@/app/css/dashboard-sidebar.css";
import { useState, useEffect } from "react";
import { getRole } from "@/api/auth.api";

import Image from "next/image";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon.png";
import UserIcon from "@/app/icons/UserIcon.svg?url";
import InventoryIcon from "@/app/icons/InventoryIcon.svg?url";
import ShopIcon from "@/app/icons/ShopIcon.svg?url";
import ReportIcon from "@/app/icons/ReportIcon.svg?url";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import Link from "next/link";

function DashboardSideBar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { role, setRole } = useMainContext();
  const [showEmployeeMenu, setShowEmployeeMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [showInventoryMenu, setShowInventoryMenu] = useState(false);
  const [showPhysicalPointsMenu, setShowPhysicalPointsMenu] = useState(false);
  const [showReportsMenu, setShowReportsMenu] = useState(false);

  useEffect(() => {
    getRole().then((response) => {
      if (response.status === 200) {
        setRole(response.role);
        // console.log(response.role);
        setMounted(true);
      }
      if (response.status === 401) {
        router.push("/login");
      }
    });
  }, []);

  if (!mounted) {
    return <Loading />;
  } else {
    return (
      <>
        <aside>
          <h1>CONTENIDO</h1>
          {/* Menú Empleado */}
          {hasPermission(role, "view:employees") && (
            <div>
              <h2
                onClick={() => setShowEmployeeMenu(!showEmployeeMenu)}
                className="menu-title"
              >
                <span>
                  <Image
                    src={UserIcon}
                    alt="Icono de empleado"
                    width={24}
                    height={24}
                  />
                </span>
                Empleado
                <span
                  className={`arrow-icon ${showEmployeeMenu ? "open" : ""}`}
                >
                  <Image
                    src={ArrowDownIcon}
                    alt="Flecha despliegue"
                    width={24}
                    height={24}
                  />
                </span>
              </h2>
            </div>
          )}
          {/* Menú Productos */}
          {hasPermission(role, "view:products") && (
            <div>
              <h2
                onClick={() => setShowProductMenu(!showProductMenu)}
                className="menu-title"
              >
                <span>
                  <Image
                    src={UserIcon}
                    alt="Icono de producto"
                    width={24}
                    height={24}
                  />
                </span>
                Producto
                <span className={`arrow-icon ${showProductMenu ? "open" : ""}`}>
                  <Image
                    src={ArrowDownIcon}
                    alt="Flecha despliegue"
                    width={24}
                    height={24}
                  />
                </span>
              </h2>
            </div>
          )}
          {/* Menú Inventario */}
          {hasPermission(role, "view:inventory") && (
            <div>
              <h2
                onClick={() => setShowInventoryMenu(!showInventoryMenu)}
                className="menu-title"
              >
                <span>
                  <Image
                    src={InventoryIcon}
                    alt="Icono de inventario"
                    width={24}
                    height={24}
                  />
                </span>
                Inventario
                <span
                  className={`arrow-icon ${showInventoryMenu ? "open" : ""}`}
                >
                  <Image
                    src={ArrowDownIcon}
                    alt="Flecha despliegue"
                    width={24}
                    height={24}
                  />
                </span>
              </h2>
            </div>
          )}
          {/* Menú Puntos Fisicos */}
          {hasPermission(role, "view:physical-stores") && (
            <div>
              <h2
                onClick={() =>
                  setShowPhysicalPointsMenu(!showPhysicalPointsMenu)
                }
                className="menu-title"
              >
                <span>
                  <Image
                    src={ShopIcon}
                    alt="Icono de puntos fisicos"
                    width={24}
                    height={24}
                  />
                </span>
                Puntos Físicos
                <span
                  className={`arrow-icon ${
                    showPhysicalPointsMenu ? "open" : ""
                  }`}
                >
                  <Image
                    src={ArrowDownIcon}
                    alt="Flecha despliegue"
                    width={24}
                    height={24}
                  />
                </span>
              </h2>
            </div>
          )}
          {/* Menú Reportes */}
          {hasPermission(role, "view:reports") && (
            <div>
              <h2
                onClick={() => setShowReportsMenu(!showReportsMenu)}
                className="menu-title"
              >
                <span>
                  <Image
                    src={ReportIcon}
                    alt="Icono de reportes"
                    width={24}
                    height={24}
                  />
                </span>
                Reportes
                <span className={`arrow-icon ${showReportsMenu ? "open" : ""}`}>
                  <Image
                    src={ArrowDownIcon}
                    alt="Flecha despliegue"
                    width={24}
                    height={24}
                  />
                </span>
              </h2>
            </div>
          )}
          {/* Menú POS */}
          {hasPermission(role, "view:POS") && (
            <div>
              <Link href={"/POS"}>
                <h2
                  onClick={() => setShowReportsMenu(!showReportsMenu)}
                  className="menu-title"
                >
                  <span>
                    <Image
                      src={ReportIcon}
                      alt="Icono de reportes"
                      width={24}
                      height={24}
                    />
                  </span>
                  POS
                </h2>
              </Link>
            </div>
          )}
        </aside>
      </>
    );
  }
}

export default DashboardSideBar;
