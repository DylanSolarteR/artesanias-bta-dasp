import { useActionState, useState, useEffect, ChangeEvent } from "react";
import { loginAuth } from "@/api/auth.api";
import Image from "next/image";
import StripeLogo from "@/app/icons/StripeLogo.svg?url";
import MercadoPagoLogo from "@/app/icons/MercadoPagoLogo.svg?url";
import CardIcon from "@/app/icons/cardIcon.svg";
import GroupIcon from "@/app/icons/groupIcon.svg";
import UserIcon from "@/app/icons/UserIcon.svg";
import CheckIcon from "@/app/icons/tickcircleIcon.svg";
import toast from "react-hot-toast";
import "@/app/css/Buy.css";

const steps = [
  { Icon: <UserIcon />, step: 1 },
  { Icon: <GroupIcon />, step: 2 },
  { Icon: <CardIcon />, step: 3 },
];

function RegisterPhysicalLocationForm() {
  const [direction, setDirection] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
 
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 3; // Número total de pasos
  const nextStep = () => setActiveStep(activeStep + 1);
  const prevStep = () => setActiveStep(activeStep - 1);
  const progressPercentage = ((activeStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="main-container">
      <div className="step-container">
        {/* Barra de progreso */}
        <div className="progress-bar-background"></div>
        <div
          className="progress-bar-foreground"
          style={{ height: `${progressPercentage}%` }} // Se ajusta el porcentaje de la barra
        ></div>

        {steps.map(({ step, Icon }) => (
          <div key={step} className="step-wrapper">
            <div
              className={`step-circle ${
                activeStep >= step ? "completed" : "incomplete"
              }`}
            >
              {activeStep > step ? (
                <span>
                  <CheckIcon />
                </span>
              ) : (
                <span>{Icon}</span>
              )}
            </div>
          </div>
        ))}
      </div>

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
