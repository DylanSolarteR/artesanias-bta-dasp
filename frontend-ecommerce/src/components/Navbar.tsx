"use client";
import React, { useEffect, useState } from "react";
import CarritoIcon from "@/app/icons/c1.png";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon.png";
import Link from "next/link";
import Image from "next/image";
import "@/app/css/Navbar.css";
import UserIcon from "@/app/icons/UserIcon.svg?url";
import { useAuthContext } from "@/app/context/AuthContext";
import { decodeBadEncodeStrings } from "@/util/utils";
import { decodeToken } from "@/util/utils";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEmployee, setIsOpenEmployee] = useState(false);
  const { isLogged, clearToken } = useAuthContext();
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    if (isLogged()) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const jwtPayload = decodeToken(token);
      let correctedName = decodeBadEncodeStrings(
        jwtPayload.name + " " + jwtPayload.lastName
      );
      setEmployeeName(correctedName);
    }
  }, []);

  // Alterna el estado de apertura del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="Navbar">
      <div className="title">
        <Link href="/">
          <strong>
            Artesanías
            <br /> Bogotá LTDA
          </strong>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <div className="products">
              <button className="buttom-products" onClick={toggleMenu}>
                Productos
                {/* Flecha que cambia de dirección según el estado */}
                <span className={`arrow-icon ${isOpen ? "open" : ""}`}>
                  <Image
                    src={ArrowDownIcon}
                    alt="ArrowDownIcon"
                    width={10}
                    height={10}
                  />
                </span>
              </button>
            </div>
          </li>
          <li>
            {/*<h1>1</h1> por si se quiere mostrar el número de productos en el carrito*/}
            <div className="shopping-cart">
              <button className="count">
                <Link href="/carrito">
                  <Image
                    src={CarritoIcon}
                    alt="Icono de carrito"
                    width={25}
                    height={25}
                  />
                </Link>
              </button>
            </div>
          </li>
          {isLogged() && (
            <li>
              <div className="employeeMenu">
                <button
                  className="employeeNameButton"
                  onClick={() => {
                    setIsOpenEmployee(!isOpenEmployee);
                  }}
                >
                  <Image src={UserIcon} alt="Icono de usuario" />
                  <span>{employeeName}</span>
                </button>
                <ul className={`${isOpenEmployee ? "" : "invisible"}`}>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        clearToken();
                      }}
                    >
                      <Link href="/login">Cerrar sesión</Link>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
