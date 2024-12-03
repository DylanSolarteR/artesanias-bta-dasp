import { useState, useEffect, ChangeEvent } from "react";
//import { loginAuth } from "@/api/auth.api";
//import "@/app/css/Buy.css";


function RegisterPhysicalLocationForm() {
  const [direction, setDirection] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
 
 
  return (
    <div className="main-container">
      <div className="container-inf-step">
        <form className="form-reg-user" onSubmit={(e) => e.preventDefault()}>
            <>
              <h2>Datos personales</h2>
              <label htmlFor="direction">Dirección: </label>
              <input
                type="text"
                value={direction}
                name="direction"
                onChange={(e) => setDirection(e.target.value)}
              />
              <label htmlFor="telephone">Teléfono: </label>
              <input
                type="text"
                value={telephone}
                name="telephone"
                onChange={(e) => setTelephone(e.target.value)}
              />
            </>
          <div className="buttons-container">
              <button type="submit">Registrar Punto Físico</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPhysicalLocationForm;
