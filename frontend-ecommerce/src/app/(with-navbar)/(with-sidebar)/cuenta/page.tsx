"use client";
import UserIcon from "@/app/icons/UserIcon.svg?url";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { decodeToken } from "@/util/utils";
import { USER_INFO } from "@/types/user.types";
import { getPhysicalLocationById } from "@/api/physicalLocation.api";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import { set } from "zod";
import Image from "next/image";

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

    setUserName(user_info.name);
    setUserDocumentType(user_info.docType);
    setUserDocument(user_info.docNumber);
    setUserEmail("email@test.com");
    setUserPhone(user_info.telephone);
    setUserRole(user_info.role);
    if (!user_info.locationId) setUserLocation("No asignado");
    else {
      const user_location: PHYSICAL_LOCATION = await getPhysicalLocationById(
        String(user_info.locationId)
      );
      setUserLocation(user_location.address);
    }
  }
  useEffect(() => {
    initData();
  }, []);
  return (
    <div>
      <main className="container">
        <section>
          <Image src={UserIcon} alt="Icono de usuario" />
          <h1>{userName}</h1>
          <div>{/* Linea divisora */}</div>
        </section>
        <section>
          {/* Datos personales */}
          <label htmlFor="">
            Tipo de documento:
            <input type="text" value={userDocumentType} disabled />
          </label>
          <label htmlFor="">
            Documento:
            <input type="text" value={userDocument} disabled />
          </label>
          <label htmlFor="">
            Correo:
            <input type="text" value={userEmail} disabled />
          </label>
          <label htmlFor="">
            Teléfono:
            <input type="text" value={userPhone} disabled />
          </label>
          <label htmlFor="">
            Rol:
            <input type="text" value={userRole} disabled />
          </label>
          <label htmlFor="">
            Ubicación:
            <input type="text" value={userLocation} disabled />
          </label>
          <button onClick={handleUpdateUserDataBtn}>Actualizar datos</button>
        </section>
      </main>
    </div>
  );
}

export default Cuenta;
