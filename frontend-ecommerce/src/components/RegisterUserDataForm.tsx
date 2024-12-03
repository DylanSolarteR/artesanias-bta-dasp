import { useState, useEffect, ChangeEvent } from "react";
import { loginAuth } from "@/api/auth.api";
//import Image from "next/image";
//import "@/app/css/Buy.css";


function RegisterUserDataForm() {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [docType, setDocType] = useState<string>("");
  const [docNumber, setDocNumber] = useState<string>("");
  
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 3; // Número total de pasos
  const nextStep = () => setActiveStep(activeStep + 1);
  const prevStep = () => setActiveStep(activeStep - 1);
  const progressPercentage = ((activeStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="main-container">
      
      <div className="container-inf-step">
        <form className="form-reg-user" onSubmit={(e) => e.preventDefault()}>
            <>
              <h2>Datos personales</h2>
              {/*Aqui debe ser un select*/}
              <label htmlFor="docType">Tipo de documento: </label>
              <input
                type="text"
                value={docType}
                name="docType"
                onChange={(e) => setDocType(e.target.value)}
              />
              <label htmlFor="docNumber">Número de documento: </label>
              <input
                type="text"
                value={docNumber}
                name="docNumber"
                onChange={(e) => setDocNumber(e.target.value)}
              />
              <label htmlFor="name">Nombres: </label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="lastName">Apellidos: </label>
              <input
                type="text"
                value={lastname}
                name="lastname"
                onChange={(e) => setLastname(e.target.value)}
              />
              <label htmlFor="telephone">Teléfono: </label>
              <input
                type="text"
                value={telephone}
                name="telephone"
                onChange={(e) => setTelephone(e.target.value)}
              />
              {/*Aqui debe ser un select*/}
              <label htmlFor="role">Rol: </label>
              <input
                type="text"
                value={role}
                name="role"
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="locationId">Número de tienda: </label>
              <input
                type="text"
                value={locationId}
                name="locationId"
                onChange={(e) => setLocationId(e.target.value)}
              />
            </>
          <div className="buttons-container">
              <button type="submit">Registrar Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUserDataForm;
