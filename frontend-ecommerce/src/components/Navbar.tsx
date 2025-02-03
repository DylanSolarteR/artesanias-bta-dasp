"use client";
import React, { useEffect, useState } from "react";
import CarritoIcon from "@/app/icons/ShoppingCartIcon.png";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon.png";
import Link from "next/link";
import Image from "next/image";
import "@/app/css/Navbar.css";
import UserIcon from "@/app/icons/UserIcon.svg?url";
import HomeIcon from "@/app/icons/HomeIcon.svg?url";
import ProfileIcon from "@/app/icons/ProfileIcon.svg?url";
import LogoutIcon from "@/app/icons/LogoutIcon.svg?url";
import { useAuthContext } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { decodeBadEncodeStrings } from "@/util/utils";
import { decodeToken } from "@/util/utils";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEmployee, setIsOpenEmployee] = useState(false);
  const { isLogged, clearToken } = useAuthContext();
  const [employeeName, setEmployeeName] = useState("");
  const { cart } = useCart();

  useEffect(() => {
    if (isLogged() && typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const jwtPayload = decodeToken(token);
      const correctedName = decodeBadEncodeStrings(
        jwtPayload.name + " " + jwtPayload.lastName
      );
      setEmployeeName(correctedName);
    }
  }, []);

  return (
    <nav className="Navbar">
      <div className="title">
        <Link href="/">
          <strong>Artesanías<br />Bogotá LTDA</strong>
        </Link>
      </div>

      {/* Botón del menú hamburguesa */}
      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbarUl ${isOpen ? "active" : ""}`}>
        <li className="topButton">
          <div className="products">
            <button
              className="buttom-products"
              onClick={() => (window.location.href = "/")}
            >
              Inicio
            </button>
          </div>
        </li>
        <li className="topButton">
          <div className="products">
            <button
              className="buttom-products"
              onClick={() => (window.location.href = "/catalogo")}
            >
              Catálogo
            </button>
          </div>
        </li>
        <li className="topButton">
          <div className="shopping-cart">
            <button 
              className="count"
              onClick={() => (window.location.href = "/carrito")}
            >
                <Image
                  src={CarritoIcon}
                  alt="Icono de carrito"
                  width={25}
                  height={25}
                />
                <span className="counter">{cart.length}</span>
            </button>
          </div>
        </li>

        {isLogged() && (
          <li className="topButton">
            <div className={`employeeMenu ${isOpenEmployee ? "active" : ""}`}>
              <button
                className="employeeNameButton"
                onClick={() => {
                  setIsOpenEmployee(!isOpenEmployee);
                }}
              >
                <Image className="foto" src={UserIcon} alt="Icono de usuario" />
                <span>{employeeName}</span>
                <span
                    className={`arrow-icon ${isOpenEmployee ? "open" : ""}`}
                  >
                    <Image src={ArrowDownIcon} alt="Flecha despliegue" />
                  </span>
              </button>
              <ul className={isOpenEmployee ? "" : "invisible"}>
                <li className="account-item">
                  <Image src={HomeIcon} alt="Icono de dashboard" />
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className="account-item">
                  <Image src={ProfileIcon} alt="Icono de cuenta" />
                  <Link href="/cuenta">Cuenta</Link>
                </li>
                <li className="account-item">
                  <button
                    className="flex"
                    onClick={() => {
                      clearToken();
                    }}
                  >
                    <Image src={LogoutIcon} alt="Icono de cerrar sesión" />
                    <Link href="/login">Cerrar sesión</Link>
                  </button>
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;