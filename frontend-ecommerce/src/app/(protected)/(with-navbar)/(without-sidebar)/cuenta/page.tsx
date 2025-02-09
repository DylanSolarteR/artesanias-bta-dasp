"use client";
import UserManagerIcon from "@/app/icons/UserManagerIcon.svg?url";
import UserCashierIcon from "@/app/icons/UserCashierIcon.svg?url";
import UserAdminIcon from "@/app/icons/UserAdminIcon.svg?url";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { decodeBadEncodeStrings, decodeToken } from "@/util/utils";
import { USER_INFO } from "@/types/user.types";
import { getPhysicalLocationById } from "@/api/physicalLocation.api";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import Image from "next/image";

const ROLES = {
  cashier: "Cajero",
  administrator: "Administrador",
  manager: "Gerente",
};

function Cuenta() {
  const { authToken } = useAuthContext();

  const user_info: USER_INFO = decodeToken(authToken);
  const [userName, setUserName] = useState("");
  const [userDocumentType, setUserDocumentType] = useState("");
  const [userDocument, setUserDocument] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userLocation, setUserLocation] = useState("");

  function handleUpdateUserDataBtn() {}

  async function initData() {
    if (!user_info) return;

    setUserName(
      decodeBadEncodeStrings(user_info.name + " " + user_info.lastName)
    );
    setUserDocumentType(user_info.docType);
    setUserDocument(user_info.docNumber);
    setUserEmail("email@test.com");
    setUserPhone(user_info.telephone);
    setUserRole(user_info.role);
    if (!user_info.locationId) {
      setUserLocation("No asignado");
    } else {
      const user_location: PHYSICAL_LOCATION = await getPhysicalLocationById(
        user_info.locationId
      );
      setUserLocation(user_location.address);
    }
  }
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="w-full pt-[87px]">
      <main className="container w-full h-full flex flex-col items-center justify-center">
        <section className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-[#e47b3a] items-center justify-center flex">
          <Image
            src={
              userRole === "administrator"
                ? UserAdminIcon
                : userRole === "cashier"
                ? UserCashierIcon
                : UserManagerIcon
            }
            alt="Icono de usuario"
            width={100}
            height={100}
          />
          </div>
          <h1>{userName}</h1>
          <div>{/* Linea divisora */}</div>
        </section>
        <section className="flex flex-col items-center justify-center w-full gap-6 min-w-fit">
          {/* Datos personales */}
          <div className="flex flex-col gap-4 min-w-fit">
            <div className="flex flex-row w-full min-w-fit">
              <label
                htmlFor="userDocumentType"
                className="self-start min-w-56 w-full"
              >
                Tipo de documento:
              </label>
              <input
                id="userDocumentType"
                className="input-standard text-center min-w-fit "
                type="text"
                value={userDocumentType}
                disabled
              />
            </div>
            <div className="flex flex-row">
              <label
                htmlFor="userDocument"
                className="self-start min-w-56 w-full"
              >
                Documento:
              </label>
              <input
                id="userDocument"
                className="input-standard text-center min-w-fit"
                type="text"
                value={userDocument}
                disabled
              />
            </div>
            <div className="flex flex-row">
              <label htmlFor="userEmail" className="self-start min-w-56 w-full">
                Correo:
              </label>
              <input
                id="userEmail"
                className="input-standard text-center min-w-fit"
                type="text"
                value={userEmail}
                disabled
              />
            </div>
            <div className="flex flex-row">
              <label htmlFor="userPhone" className="self-start min-w-56 w-full">
                Teléfono:
              </label>
              <input
                id="userPhone"
                className="input-standard text-center min-w-fit"
                type="text"
                value={userPhone}
                disabled
              />
            </div>
            <div className="flex flex-row">
              <label htmlFor="userRole" className="self-start min-w-56 w-full">
                Rol:
              </label>
              <input
                id="userRole"
                className="input-standard text-center min-w-fit"
                type="text"
                value={ROLES[userRole]}
                disabled
              />
            </div>
            <div className="flex flex-row">
              <label
                htmlFor="userLocation"
                className="self-start min-w-56 w-full"
              >
                Ubicación:
              </label>
              <input
                id="userLocation"
                className="input-standard text-center min-w-fit"
                type="text"
                value={userLocation}
                disabled
              />
            </div>
          </div>

          <button
            id="button-standard"
            className="max-w-lg"
            onClick={handleUpdateUserDataBtn}
          >
            Actualizar datos
          </button>
        </section>
      </main>
    </div>
  );
}

export default Cuenta;
