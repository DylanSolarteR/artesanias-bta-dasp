"use client";

import { useState, useEffect } from "react";
import { getRole } from "@/api/auth.api";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";

import Image from "next/image";
import MenuIcon from "@/app/icons/MenuIcon.svg?url";
import CloseSquareIcon from "@/app/icons/CloseSquareIcon.svg?url";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon.png";
import UserIcon from "@/app/icons/UserIcon.svg?url";
import InventoryIcon from "@/app/icons/InventoryIcon.svg?url";
import ShopIcon from "@/app/icons/ShopIcon.svg?url";
import ReportIcon from "@/app/icons/ReportIcon.svg?url";
import ProductAdd from "@/app/icons/ProductAddIcon.svg?url";
import ProductSearch from "@/app/icons/ProductSearchIcon.svg?url";
import UserAdd from "@/app/icons/UserAddIcon.svg?url";
import UserSearch from "@/app/icons/UserIcon.svg?url";
import LocationAdd from "@/app/icons/LocationAddIcon.svg?url";
import LocationSearch from "@/app/icons/LocationSearchIcon.svg?url";
import ReportSales from "@/app/icons/ReportSalesIcon.svg?url";
import ReportAnalysis from "@/app/icons/ReportAnalysisIcon.svg?url";
import HomeIcon from "@/app/icons/HomeIcon.svg?url";
import ProductIcon from "@/app/icons/ProductIcon.svg?url";  

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
      <div className={`container-sidebar ${collapsed ? "collapsed" : ""}`}>
        <aside className="h-full">
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

          {/* Menú Inventario */}

            <div className="option-dashboard">
              <h5 className="menu-title">
              <Link href="../dashboard">
                <span className="icon-and-text">
                
                  <Image
                    src={HomeIcon}
                    alt="Icono del dashboard"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Dashboard"}
                  
                </span>
                </Link>
              </h5>
            </div>

          {/* Menú Inventario */}
          {hasPermission(role, "view:inventory") && (
            <div className="option-dashboard">
              <h5 className="menu-title">
                <span className="icon-and-text">
                  <Image
                    src={InventoryIcon}
                    alt="Icono de inventario"
                    width={24}
                    height={24}
                  />
                  {!collapsed && " Inventario"}
                </span>
              </h5>
            </div>
          )}

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
                    <span className="icon-and-text">
                      <Image
                        src={UserAdd}
                        alt="Icono de agregar empleado"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/empleados/registrar">
                        {!collapsed && " Registrar empleado"}
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span className="icon-and-text">
                      <Image
                        src={UserSearch}
                        alt="Icono de buscar empleado"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/empleados">
                        {!collapsed && " Ver empleado"}
                      </Link>
                    </span>
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
                    src={ProductIcon}
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
              {showProductMenu && (
                <ul className="submenu">
                  <li>
                    <span className="icon-and-text">
                      <Image
                        src={ProductAdd}
                        alt="Icono de agregar producto"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/productos/registrar">
                        {!collapsed && " Registrar producto"}
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span className="icon-and-text">
                      <Image
                        src={ProductSearch}
                        alt="Icono de buscar producto"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/productos">
                        {!collapsed && " Ver productos"}
                      </Link>
                    </span>
                  </li>
                </ul>
              )}
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
                    className={`arrow-icon ${showPhysicalPointsMenu ? "open" : ""
                      }`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
                )}
              </h5>
              {showPhysicalPointsMenu && (
                <ul className="submenu">
                  <li>
                    <span className="icon-and-text">
                      <Image
                        src={LocationAdd}
                        alt="Icono de agregar punto físico"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/puntos-fisicos/registrar">
                        {!collapsed && " Registrar punto físico"}
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span className="icon-and-text">
                      <Image
                        src={LocationSearch}
                        alt="Icono de buscar punto físico"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/puntos-fisicos">
                        {!collapsed && " Consultar punto físico"}
                      </Link>
                    </span>
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
              {showReportsMenu && (
                <ul className="submenu">
                  <li>
                    <span className="icon-and-text">
                      <Image
                        src={ReportSales}
                        alt="Icono de reporte de ventas"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/reporte/ventas">
                        {!collapsed && " Reporte de ventas"}
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span className="icon-and-text">
                      <Image
                        src={ReportAnalysis}
                        alt="Icono de análisis de reportes"
                        width={24}
                        height={24}
                      />
                      <Link href="/dashboard/reporte/analisis">
                        {!collapsed && " Reporte de análisis"}
                      </Link>
                    </span>
                  </li>
                </ul>
              )}
            </div>
          )}
        </aside>
      </div>
    );
  }
}

export default DashboardSideBar;
