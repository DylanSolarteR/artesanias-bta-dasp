"use client";
import Image from "next/image";
import UserLogo from "@/app/icons/UserLogo.svg?url";
import LoginForm from "@/components/LoginForm";

function Login() {
  return (
    <div>
      <main>
        <div>
          <h1>Bienvenido a Artesanías Bogotá Ldta.</h1>
          <Image
            alt="Imagen de Usuario"
            src={UserLogo}
            height={200}
            width={200}
          ></Image>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}

export default Login;
