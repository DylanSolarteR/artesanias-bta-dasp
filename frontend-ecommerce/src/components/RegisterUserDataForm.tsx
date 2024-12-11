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
    <div className="main-container">
      <div className="container-inf-step">
        <form className="form-reg-user" onSubmit={(e) => e.preventDefault()}>
          {/* Sección de Datos Personales */}
          <div className="personal-data-section">
            <h2>Datos personales</h2>

            <label htmlFor="docType">Tipo de documento: </label>
            <select
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
          </div>

          {/*Datos Empresariales */}
          <div className="divider">
            <h2>Datos empresariales</h2>
          </div>

          <div className="business-data-section">
            <label htmlFor="role">Rol: </label>
            <select
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
              type="text"
              value={locationId}
              name="locationId"
              onChange={(e) => setLocationId(e.target.value)}
            />
          </div>

          <div className="buttons-container">
            <button type="submit">Registrar Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUserDataForm;
