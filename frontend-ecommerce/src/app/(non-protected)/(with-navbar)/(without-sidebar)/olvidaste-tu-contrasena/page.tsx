"use client";

import Image from "next/image";
import OlvidasteContrasenaImage from "@/app/images/OlvidasteContrasenaImage.svg?url";
import { onlyNumberInput } from "@/util/utils";
import { recoveryDataSchema } from "@/util/validation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { forgotPassword } from "@/api/auth.api";

function Page() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const userData = Object.fromEntries(formData);
    const result = recoveryDataSchema.safeParse({
      employeeId: parseInt(userData.employeeId as string),
      email: userData.email,
    });
    if (result.success) {
      console.log(result.data);
      let { employeeId, email } = result.data;
      const response = await forgotPassword({ id: employeeId, email });
      if (response.success) {
        toast.success(response.message, {duration: 5000});
        return;
      }
      toast.error(response.message);
    } else {
      toast.error(result.error.errors[0].message);
    }
  }
  return (
    <main className="container">
      <div className="flex flex-col justify-start items-center md:px-48 px-2 h-full pt-24">
        <p className="font-black text-6xl p-10 text-[color:var(--color-main)]">
          ¿Olvidaste tu contraseña?
        </p>
        <section className="flex justify-around items-center gap-2">
          <div className="grow shrink-0">
            <Image
              src={OlvidasteContrasenaImage}
              alt="imagen olvidaste tu contraseña"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-center text-balance font-bold my-4">
              Introduce tu identificación de usuario y correo electrónico
              asociado a tu cuenta, y te enviaremos un enlace para restablecer
              tu contraseña.
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-center "
            >
              <label htmlFor="employeeId">Identificación de Usuario*</label>
              <input
                type="text"
                className="input-standard"
                name="employeeId"
                onKeyDown={onlyNumberInput}
              />
              <label htmlFor="email">Correo Eléctronico*</label>
              <input type="text" name="email" className="input-standard" />
              <button type="submit" id="button-standard">
                Enviar
              </button>
            </form>
            <p>
              Si el correo electrónico existe en nuestra base de datos,
              recibirás un enlace en tu bandeja de entrada.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Page;
