"use client";
import { useState, useEffect } from "react";
import { onlyNumberInput } from "@/util/utils";

function RegisterUserDataForm({ user, onSubmit }: { user?: any; onSubmit: (data: any) => void }) {
  const [name, setName] = useState<string>(user?.name || "");
  const [lastName, setLastname] = useState<string>(user?.lastName || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [telephone, setTelephone] = useState<string>(user?.telephone || "");
  const [role, setRole] = useState<string>(user?.role || "Cashier");
  const [locationId, setLocationId] = useState<string>(user?.locationId || "");
  const [docType, setDocType] = useState<string>(user?.docType || "CC");
  const [docNumber, setDocNumber] = useState<string>(user?.docNumber || "");

  // Para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ name, lastName, email, telephone, role, locationId, docType, docNumber });
  };

  return (
    <div className="container-dashboard">
      <div className="main-center">
        <div className="container-inf-step">
          <form className="form-inf-buy"  onSubmit={handleSubmit}>
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
              onKeyDown={onlyNumberInput}
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
              value={lastName}
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
            />

            <label htmlFor="email">Correo electrónico: </label>
            <input
              className="input-standard"
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="telephone">Teléfono: </label>
            <input
              className="input-standard"
              type="text"
              value={telephone}
              name="telephone"
              onKeyDown={onlyNumberInput}
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
              <option value="administrator">Administrador</option>
              <option value="manager">Gerente</option>
              <option value="cashier">Cajero</option>
            </select>

            <label htmlFor="locationId">Número de tienda: </label>
            <input
              className="input-standard"
              type="text"
              value={locationId}
              name="locationId"
              onKeyDown={onlyNumberInput}
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
