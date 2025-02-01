"use client";
import { useState, useEffect, ChangeEvent } from "react";
//import { loginAuth } from "@/api/auth.api";


function RegisterPhysicalLocationForm() {
  const [direction, setDirection] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");


  return (
    <div className="container-dashboard">
      <div className="main-center">
        <div className="container-inf-step">
          <form className="form-inf-buy" onSubmit={(e) => e.preventDefault()}>
            <h1>Registrar Punto Físico</h1>
            <h2>Datos personales</h2>
            <label htmlFor="direction">Dirección: </label>
            <input
              className="input-standard"
              type="text"
              value={direction}
              name="direction"
              onChange={(e) => setDirection(e.target.value)}
            />
            <label htmlFor="telephone">Teléfono: </label>
            <input
              className="input-standard"
              type="text"
              value={telephone}
              name="telephone"
              onChange={(e) => setTelephone(e.target.value)}
            />
            <button id="button-standard" type="submit">Registrar Punto Físico</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPhysicalLocationForm;
