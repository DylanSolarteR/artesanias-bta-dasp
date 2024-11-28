"use client";
import "@/app/css/dashboard-sidebar.css";
import { useState, useEffect } from "react";
import { getRole } from "@/api/auth.api";

import Image from "next/image";
import MenuIcon from "@/app/icons/MenuIcon.svg?url";
import CloseSquareIcon from "@/app/icons/closeSquareIcon.svg?url";
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

import "@/app/css/dashboard-sidebar.css";

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
        setMounted(true);
      }
      if (response.status === 401) {
        router.push("/login");
      }
    });
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  if (!mounted) {
    return <Loading />;
  } else {
    return (
      <>
        <aside className={`main-container ${collapsed ? "collapsed" : ""}`}>
          <div className="contents">
            {!collapsed && <span className="menu-content-text">Contenido</span>}
            <button
              className="toggle-button"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <Image src={MenuIcon} alt="Menú" />
              ) : (
                <Image className="close" src={CloseSquareIcon} alt="Cerrar" />
              )}
            </button>
          </div>

          {/* Menú Empleado */}
          {hasPermission(role, "view:employees") && (
            <div className="option-dashboard">
              <h2
                onClick={() => setShowEmployeeMenu(!showEmployeeMenu)}
                className="menu-title"
              >
                <span className="icon-and-text">
                  <Image
                    src={UserIcon}
                    alt="Icono de empleado"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Empleado"}
                </span>
                {!collapsed && (
                  <span
                    className={`arrow-icon ${showEmployeeMenu ? "open" : ""}`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h2>
            </div>
          )}
          {/* Menú Productos */}
          {hasPermission(role, "view:products") && (
            <div className="option-dashboard">
              <h2
                onClick={() => setShowProductMenu(!showProductMenu)}
                className="menu-title"
              >
                <span className="icon-and-text">
                  <Image
                    src={UserIcon}
                    alt="Icono de producto"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Producto"}
                </span>
                {!collapsed && (
                  <span
                    className={`arrow-icon ${showProductMenu ? "open" : ""}`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h2>
            </div>
          )}
          {/* Menú Inventario */}
          {hasPermission(role, "view:inventory") && (
            <div className="option-dashboard">
              <h2
                onClick={() => setShowInventoryMenu(!showInventoryMenu)}
                className="menu-title"
              >
                <span className="icon-and-text">
                  <Image
                    src={InventoryIcon}
                    alt="Icono de inventario"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Inventario"}
                </span>
                {!collapsed && (
                  <span
                    className={`arrow-icon ${showInventoryMenu ? "open" : ""}`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h2>
            </div>
          )}
          {/* Menú Puntos Fisicos */}
          {hasPermission(role, "view:physical-stores") && (
            <div className="option-dashboard">
              <h2
                onClick={() =>
                  setShowPhysicalPointsMenu(!showPhysicalPointsMenu)
                }
                className="menu-title"
              >
                <span className="icon-and-text">
                  <Image
                    src={ShopIcon}
                    alt="Icono de puntos fisicos"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Puntos Físicos"}
                </span>
                {!collapsed && (
                  <span
                    className={`arrow-icon ${
                      showPhysicalPointsMenu ? "open" : ""
                    }`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h2>
            </div>
          )}
          {/* Menú Reportes */}
          {hasPermission(role, "view:reports") && (
            <div className="option-dashboard">
              <h2
                onClick={() => setShowReportsMenu(!showReportsMenu)}
                className="menu-title"
              >
                <span className="icon-and-text">
                  <Image
                    src={ReportIcon}
                    alt="Icono de reportes"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Reportes"}
                </span>
                {!collapsed && (
                  <span
                    className={`arrow-icon ${showReportsMenu ? "open" : ""}`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h2>
            </div>
          )}
          {/* Menú POS */}
          {hasPermission(role, "view:POS") && (
            <div className="option-dashboard">
              <Link href={"/POS"}>
                <h2
                  onClick={() => setShowReportsMenu(!showReportsMenu)}
                  className="menu-title"
                >
                  <span className="icon-and-text">
                    <Image
                      src={ReportIcon}
                      alt="Icono de reportes"
                      width={24}
                      height={24}
                    />
                    {!collapsed && " POS"}
                  </span>
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
