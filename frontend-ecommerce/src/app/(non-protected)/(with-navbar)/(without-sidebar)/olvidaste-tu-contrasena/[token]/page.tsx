"use client";
import CambioContrasenaImage from "@/app/images/CambioContrasenaImage.svg?url";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function validateToken(token: string) {
  return true;
}

function Page() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  function handleFormAction(formData: FormData) {
    const userData = Object.fromEntries(formData);

    console.log(userData);
  }

  useEffect(() => {
    if (!validateToken(token)) {
      console.log("Token invalido");
      router.push("/");
    }
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
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-center text-balance font-bold my-4">
              Introduce tu nueva contraseña para completar el proceso de
              restablecimiento.
            </h2>
            <form
              action={handleFormAction}
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
        </section>
      </div>
    </main>
  );
}

export default Page;
