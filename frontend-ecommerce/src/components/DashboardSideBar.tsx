"use client";

import { useState, useEffect } from "react";
import { getRole } from "@/api/auth.api";

import Image from "next/image";
import MenuIcon from "@/app/icons/MenuIcon.svg?url";
import CloseSquareIcon from "@/app/icons/CloseSquareIcon.svg?url";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon.png";
import UserIcon from "@/app/icons/UserIcon.svg?url";
import BagIcon from "@/app/icons/BagIcon.svg?url";
import InventoryIcon from "@/app/icons/InventoryIcon.svg?url";
import ShopIcon from "@/app/icons/ShopIcon.svg?url";
import ReportIcon from "@/app/icons/ReportIcon.svg?url";
import { useRouter } from "next/navigation";

import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import Link from "next/link";

import "@/app/css/dashboard.css";

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
    return null;
  } else {
    return (
      <>
        <aside className={`container-sidebar ${collapsed ? "collapsed" : ""}`}>
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
              <h5
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
                  {!collapsed && " Empleados"}
                </span>
                {!collapsed && (
                  <span
                    className={`arrow-icon ${showEmployeeMenu ? "open" : ""}`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h5>
              {showEmployeeMenu && (
                <ul className="submenu">
                  <li>
                    <Link href="/dashboard/empleados/registrar">
                      Registrar empleado
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/empleados">Ver empleados</Link>
                  </li>
                </ul>
              )}
            </div>
          )}
          {/* Menú Productos */}
          {hasPermission(role, "view:products") && (
            <div className="option-dashboard">
              <h5
                onClick={() => setShowProductMenu(!showProductMenu)}
                className="menu-title"
              >
                <span className="icon-and-text">
                  <Image
                    src={BagIcon}
                    alt="Icono de producto"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Productos"}
                </span>
                {!collapsed && (
                  <span
                    className={`arrow-icon ${showProductMenu ? "open" : ""}`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h5>
            </div>
          )}
          {/* Menú Inventario */}
          {hasPermission(role, "view:inventory") && (
            <div className="option-dashboard">
              <h5
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
              </h5>
            </div>
          )}
          {/* Menú Puntos Fisicos */}
          {hasPermission(role, "view:physical-stores") && (
            <div className="option-dashboard">
              <h5
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
              </h5>
              {showPhysicalPointsMenu && (
                <ul className="submenu">
                  <li>
                    <Link href="/dashboard/puntos-fisicos/registrar">
                      Registrar punto físico
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/puntos-fisicos">
                      Consultar punto físico
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
          {/* Menú Reportes */}
          {hasPermission(role, "view:reports") && (
            <div className="option-dashboard">
              <h5
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
              </h5>
            </div>
          )}
        </aside>
      </>
    );
  }
}

export default DashboardSideBar;
