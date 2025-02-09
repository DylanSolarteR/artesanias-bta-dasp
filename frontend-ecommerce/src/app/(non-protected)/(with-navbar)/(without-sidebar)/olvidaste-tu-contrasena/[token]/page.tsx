"use client";
import CambioContrasenaImage from "@/app/images/CambioContrasenaImage.svg?url";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/util/utils";
import toast from "react-hot-toast";
import { set } from "zod";
import { resetPasswordSchema } from "@/util/validation";
import { resetPassword } from "@/api/auth.api";

function validateToken(token: string) {
  let data
  try {
    data = decodeToken(token);
  } catch (error) {
    return false;
  }
  const { exp, id } = data;
  if (exp < Date.now() / 1000) {
    return false;
  }

  return true;
}

function Page() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  async function handlesubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data)
    const result = resetPasswordSchema.safeParse(Object.fromEntries([
      ["password", data.pw],
      ["confirmPassword", data["confirm-pw"]]
    ]));
    if(!result.success) {
      toast.error(result.error.errors[0].message);
      return
    }
    const { password, confirmPassword } = result.data;
    if(password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return
    }
    const toastId = toast.loading("Cambiando contraseña");
    const response = await resetPassword({ password, token });
    toast.dismiss(toastId);
    if (response.success) {
      toast.success(response.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }
    toast.error(response.message);

  }

  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const valid = validateToken(token)
    if (!valid) {
      toast.error("El token es inválido o ha expirado\nRedireccionando...", { duration: 5000 });
      setTimeout(() => {
        router.push("/olvidaste-tu-contrasena");
      }, 5000);
    }
    setIsValidToken(valid);
  }, [token]);
  return (
    <main className="container">
      <div className="flex flex-col justify-start items-center md:px-48 px-2 h-full pt-24">
        <p className="font-black text-6xl p-10 text-[color:var(--color-main)]">
          Cambia tu contraseña
        </p>
        <section className="flex justify-around items-center gap-2">
          <div className="grow shrink-0">
            <Image
              src={CambioContrasenaImage}
              alt="imagen olvidaste tu contraseña"
            />
          </div>
          { isValidToken ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <h2 className="text-center text-balance font-bold my-4">
                Introduce tu nueva contraseña para completar el proceso de
                restablecimiento.
              </h2>
              <form
                onSubmit={handlesubmit}
                className="flex flex-col gap-4 text-center "
              >
                <label htmlFor="pw">Nueva Contraseña*</label>
                <input type="password" className="input-standard" name="pw" />
                <label htmlFor="confirm-pw">Confirmar Contraseña*</label>
                <input
                  type="password"
                  name="confirm-pw"
                  className="input-standard"
                />
                <button type="submit" id="button-standard">
                  Enviar
                </button>
              </form>
            </div>
          )
          : (<div className="flex flex-col gap-4 justify-center items-center">
            {/* Espacio en blanco del mismo tamaño para que la imagen no salte */}
            <h2 className="text-center text-balance font-bold my-4" style={{color: "white"}}>
                Introduce tu nueva contraseña para completar el proceso de
                restablecimiento.
            </h2>
          </div>)
        }
        </section>
      </div>
    </main>
  );
}

export default Page;
