"use client";
import { useState } from "react";

function RegisterUserDataForm() {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [role, setRole] = useState<string>("A"); // Valor inicial
  const [locationId, setLocationId] = useState<string>("");
  const [docType, setDocType] = useState<string>("CC"); // Valor inicial
  const [docNumber, setDocNumber] = useState<string>("");

  return (
    <div className="container-dashboard">
      <div className="main-center">
        <div className="container-inf-step">
          <form className="form-inf-buy" onSubmit={(e) => e.preventDefault()}>
            <h1>Registrar Empleado</h1>
            {/* Sección de Datos Personales */}
            <h2>Datos personales</h2>

            <label htmlFor="docType">Tipo de documento: </label>
            <select
              className="input-standard"
              value={docType}
              name="docType"
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="TI">Tarjeta de Identidad</option>
            </select>

            <label htmlFor="docNumber">Número de documento: </label>
            <input
              className="input-standard"
              type="text"
              value={docNumber}
              name="docNumber"
              onChange={(e) => setDocNumber(e.target.value)}
            />

            <label htmlFor="name">Nombres: </label>
            <input
              className="input-standard"
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="lastName">Apellidos: </label>
            <input
              className="input-standard"
              type="text"
              value={lastname}
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
            />

            <label htmlFor="telephone">Teléfono: </label>
            <input
              className="input-standard"
              type="text"
              value={telephone}
              name="telephone"
              onChange={(e) => setTelephone(e.target.value)}
            />

            {/*Datos Empresariales */}
            <h2>Datos empresariales</h2>

            <label htmlFor="role">Rol: </label>
            <select
              className="input-standard"
              value={role}
              name="role"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="A">Administrador</option>
              <option value="S">Supervisor</option>
              <option value="C">Cliente</option>
            </select>

            <label htmlFor="locationId">Número de tienda: </label>
            <input
              className="input-standard"
              type="text"
              value={locationId}
              name="locationId"
              onChange={(e) => setLocationId(e.target.value)}
            />

            <button id="button-standard" type="submit">Registrar Usuario</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUserDataForm;
