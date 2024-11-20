import { useActionState, useState, useEffect, ChangeEvent } from "react";
import { loginAuth } from "@/api/auth.api";
import Image from "next/image";
import StripeLogo from "@/app/icons/StripeLogo.svg?url";
import MercadoPagoLogo from "@/app/icons/MercadoPagoLogo.svg?url";
import CardIcon from "@/app/icons/cardIcon.svg"
import GroupIcon from "@/app/icons/groupIcon.svg"
import UserIcon from "@/app/icons/UserIcon.svg"
import CheckIcon from "@/app/icons/tickcircleIcon.svg"
import toast from "react-hot-toast";
import "@/app/css/Buy.css"

const steps = [
  { Icon: <UserIcon />, step: 1 },
  { Icon: <GroupIcon />, step: 2 },
  { Icon: <CardIcon />, step: 3 },
];

function PurchaseDataForm() {
  const [message, formAction, isPending] = useActionState(loginAuth, {
    success: false,
    message: "",
    status: 0,
  }); //Ignorar esto por ahora, no hay la parte de la api
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");
  const [documentNum, setDocumentNum] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  useEffect(() => {
    if (message.status === 400) {
      toast.error(message.message);
    }
    if (message.status === 200) {
      toast.success(message.message);
    }
  }, [message]);

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 3; // Número total de pasos
  const nextStep = () => setActiveStep(activeStep + 1);
  const prevStep = () => setActiveStep(activeStep - 1);
  const progressPercentage = ((activeStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="main-container">
      <div className="step-container">

        {/* Barra de progreso */}
        <div
          className="progress-bar-background"
        ></div>
        <div
          className="progress-bar-foreground"
          style={{ height: `${progressPercentage}%` }} // Se ajusta el porcentaje de la barra
        ></div>

        {steps.map(({ step, Icon }) => (
          <div key={step} className="step-wrapper">
            <div className={`step-circle ${activeStep >= step ? 'completed' : 'incomplete'}`}>
              {activeStep > step ? (
                <span><CheckIcon /></span>
              ) : (
                <span>{Icon}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="container-inf-step">

        <form className="form-inf-buy" action={formAction}>
          {/* Paso 1: Datos personales */}
          {activeStep === 1 && (
            <>
              <h2>Datos personales</h2>
              <label htmlFor="name">Nombre: </label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              /> 
              <label htmlFor="email">Correo electrónico: </label>
              <input
                type="text"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              /> 
              <label htmlFor="documentType">Tipo de Documento: </label>
              <input
                type="text"
                value={documentType}
                name="documentType"
                onChange={(e) => setDocumentType(e.target.value)}
              />
              <label htmlFor="documentNum">Número de Documento: </label>
              <input
                type="text"
                value={documentNum}
                name="documentNum"
                onChange={(e) => setDocumentNum(e.target.value)}
              /> 
              <label htmlFor="phone">Teléfono: </label>
              <input
                type="text"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              /> 
            </>
          )}

          {/* Paso 2: Datos de envío*/}
          {activeStep === 2 && (
            <>
              <h2>Datos de envío</h2>
              <label htmlFor="address">Dirección: </label>
              <input
                type="text"
                value={address}
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor="department">Departamento: </label>
              <input
                type="text"
                value={department}
                name="department"
                onChange={(e) => setDepartment(e.target.value)}
              /> 
              <label htmlFor="city">Ciudad: </label>
              <input
                type="text"
                value={city}
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="zip">Codigo Postal: </label>
              <input
                type="text"
                value={zip}
                name="zip"
                onChange={(e) => setZip(e.target.value)}
              />
            </>
          )}
          {activeStep === 3 && (
            <>
              {/* Paso 3: Datos de pago */}
              <h2>Método de pago</h2>
              <div className="grid">
                <label className="card">
                  <input
                    className="radio"
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "stripe"}
                  />
                  <div className="plan-details">
                    <Image
                      alt="Logo Stripe"
                      src={StripeLogo}
                    />
                  </div>
                </label>

                <label className="card">
                  <input
                    className="radio"
                    type="radio"
                    name="paymentMethod"
                    value="mercadopago"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "mercadopago"}
                  />
                  <div className="plan-details">
                    <Image
                      alt="Logo Mercado Pago"
                      src={MercadoPagoLogo}
                      className="mercadopago"
                    />
                  </div>
                </label>
              </div>
            </>
          )}
          <div className="buttons-container">
            {/* Mostrar "Anterior" solo si no estamos en el primer paso */}
            <button type="button" onClick={prevStep} disabled={activeStep === 1}>Anterior</button>

            {/* Mostrar "Siguiente" en los pasos intermedios y "Proceder a la pasarela de pagos" en el último paso */}
            {activeStep !== 3 ? (
              <button type="button" onClick={nextStep} disabled={activeStep === totalSteps}>Siguiente</button>
            ) : (
              <button type="submit">
                {isPending ? "Validando..." : "Proceder a la pasarela de pagos"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PurchaseDataForm;
