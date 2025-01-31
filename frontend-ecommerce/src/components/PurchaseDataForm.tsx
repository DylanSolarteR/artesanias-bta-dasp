"use client";
import "@/app/css/Buy.css";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import StripeLogo from "@/app/icons/StripeLogo.svg?url";
import MercadoPagoLogo from "@/app/icons/MercadoPagoLogo.svg?url";
import CardIcon from "@/app/icons/CardIcon.svg";
import GroupIcon from "@/app/icons/GroupIcon.svg";
import UserIcon from "@/app/icons/UserIcon.svg";
import CheckIcon from "@/app/icons/TickcircleIcon.svg";
import toast from "react-hot-toast";
import { PurchaseDataScheme } from "@/util/validation";
import { docTypes } from "@/types/purchase.types";
import { noAccents, onlyNumberInput } from "@/util/utils";
import { useCart } from "@/app/context/CartContext";
import { completePurchase, initializePurchase } from "@/api/purchase.api";
import { useRouter } from "next/navigation";

const steps = [
  { Icon: <UserIcon />, step: 1 },
  { Icon: <GroupIcon />, step: 2 },
  { Icon: <CardIcon />, step: 3 },
];

function PurchaseDataForm() {
  const { cart, flushCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [documentType, setDocumentType] = useState<docTypes>(docTypes.cc);
  const [documentNum, setDocumentNum] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("mercadopago");

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 3; // Número total de pasos
  const nextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const progressPercentage = ((activeStep - 1) / (totalSteps - 1)) * 100;

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (activeStep !== 3) return;

    const basicUserData = {
      email,
      name: noAccents(name),
      docType: documentType,
      identification: documentNum,
      telephone: phone,
    };
    const addressData = {
      departmentId: 1,
      deliveryAddress: address,
      zipCode: zip,
    };

    const productList = cart.map((product) => {
      return {
        id: product.productId,
        quantity: product.quantity,
      };
    });

    const dataFields = {
      name: noAccents(name),
      email,
      documentType,
      documentNum,
      address,
      phone,
      department,
      city,
      zip,
      paymentMethod,
    };

    const data = { basicUserData, addressData, productList };

    const result = PurchaseDataScheme.safeParse(dataFields);
    if (paymentMethod === "") {
      toast.error("Seleccione un método de pago");
      return;
    }
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    const purchaseId = await initializePurchase(data);
    await completePurchase(purchaseId);
    toast.success("Compra realizada correctamente, redirigiendo...");
    flushCart();
    setTimeout(() => {
      router.push("/catalogo");
    }, 1500);
  }

  return (
    <div className="main-container-buy">
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
        <form className="form-inf-buy" onSubmit={handleSubmit}>
          {/* Paso 1: Datos personales */}
          {activeStep === 1 && (
            <>
              <h2>Datos personales</h2>
              <label htmlFor="name">Nombre: </label>
              <input
                className="input-standard"
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Correo electrónico: </label>
              <input
                className="input-standard"
                type="text"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="documentType">Tipo de Documento: </label>
              <select
                name="documentType"
                id="input-standard"
                defaultValue={documentType}
                onChange={(e) => {
                  setDocumentType(e.target.value as docTypes);
                }}
              >
                {Object.values(docTypes).map((docType) => (
                  <option key={docType} value={docType}>
                    {docType}
                  </option>
                ))}
              </select>
              <label htmlFor="documentNum">Número de Documento: </label>
              <input
                className="input-standard"
                type="text"
                value={documentNum}
                name="documentNum"
                onChange={(e) => setDocumentNum(e.target.value)}
                onKeyDown={onlyNumberInput}
              />
              <label htmlFor="phone">Teléfono: </label>
              <input
                className="input-standard"
                type="text"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={onlyNumberInput}
              />
            </>
          )}

          {/* Paso 2: Datos de envío*/}
          {activeStep === 2 && (
            <>
              <h2>Datos de envío</h2>
              <label htmlFor="address">Dirección: </label>
              <input
                className="input-standard"
                type="text"
                value={address}
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor="department">Departamento: </label>
              <input
                className="input-standard"
                type="text"
                value={department}
                name="department"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label htmlFor="city">Ciudad: </label>
              <input
                className="input-standard"
                type="text"
                value={city}
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="zip">Codigo Postal: </label>
              <input
                className="input-standard"
                type="text"
                value={zip}
                name="zip"
                onChange={(e) => setZip(e.target.value)}
                onKeyDown={onlyNumberInput}
              />
            </>
          )}
          {activeStep === 3 && (
            <>
              {/* Paso 3: Datos de pago */}
              <h2>Método de pago</h2>
              <div className="flex-grid">
                {/* <label className="card">
                  <input
                    className="radio"
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPaymentMethod(e.target.value)
                    }
                    checked={paymentMethod === "stripe"}
                  />
                  <div className="plan-details">
                    <Image alt="Logo Stripe" src={StripeLogo} />
                  </div>
                </label> */}

                <label className="card">
                  <input
                    className="radio"
                    type="radio"
                    name="paymentMethod"
                    value="mercadopago"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPaymentMethod(e.target.value)
                    }
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
          <div className="flex-space-between">
            {/* Mostrar "Anterior" solo si no estamos en el primer paso */}
            <button
              id="button-standard"
              type="button"
              onClick={prevStep}
              disabled={activeStep === 1}
            >
              Anterior
            </button>

            {/* Mostrar "Siguiente" en los pasos intermedios y "Proceder a la pasarela de pagos" en el último paso */}
            {activeStep !== 3 ? (
              <button
                id="button-standard"
                type="button"
                onClick={nextStep}
                disabled={activeStep === totalSteps}
              >
                Siguiente
              </button>
            ) : null}
            {activeStep === 3 && (
              <button id="button-standard" type="submit">
                Proceder a la pasarela de pagos
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PurchaseDataForm;
