import { useActionState, useState, useEffect, ChangeEvent } from "react";
import { loginAuth } from "@/api/auth.api";
import Image from "next/image";
import StripeLogo from "@/app/icons/StripeLogo.svg?url";
import MercadoPagoLogo from "@/app/icons/MercadoPagoLogo.svg?url";
import toast from "react-hot-toast";

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
  return (
    <form action={formAction}>
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
      <label htmlFor="address">Dirección: </label>
      <input
        type="text"
        value={address}
        name="address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <label htmlFor="phone">Teléfono: </label>
      <input
        type="text"
        value={phone}
        name="phone"
        onChange={(e) => setPhone(e.target.value)}
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
      <h2>Método de pago</h2>
      <div>
        {/* Tenia como idea poner las tarjetas asi https://codepen.io/dromo77/pen/ZEQWyaZ */}
        <label className="card">
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPaymentMethod(e.target.value);
            }}
            style={{ userSelect: "none" }}
            checked={paymentMethod === "stripe"}
            type="radio"
            id="stripe"
            name="paymentMethod"
            value="stripe"
          />
          <Image
            alt="Logo Stripe"
            src={StripeLogo}
            height={200}
            width={200}
          ></Image>
        </label>
        <label className="card">
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPaymentMethod(e.target.value);
            }}
            style={{ userSelect: "none" }}
            checked={paymentMethod === "mercadopago"}
            type="radio"
            id="stripe"
            name="paymentMethod"
            value="mercadopago"
          />
          <Image
            alt="Logo Mercado Pago"
            src={MercadoPagoLogo}
            height={200}
            width={200}
          ></Image>
        </label>
      </div>
      <button type="submit">
        {isPending ? "Validando..." : "Proceder a la pasarela de pagos"}
      </button>
    </form>
  );
}

export default PurchaseDataForm;
