"use client";
import Image from "next/image";
import UserLogo from "@/app/icons/UserLogo.svg?url";
import LoginForm from "@/components/LoginForm";
import LoginSideImage from "@/app/images/LoginSideImage.png";

function Login() {
  return (
    <div>
      <main>
        <aside>
          <Image alt="Imagen de Usuario" src={LoginSideImage}></Image>
        </aside>
        <section>
          <h1>Bienvenido a Artesanías Bogotá Ltda.</h1>
          <Image
            alt="Imagen de Usuario"
            src={UserLogo}
            height={200}
            width={200}
          ></Image>
          <LoginForm />
        </section>
      </main>
    </div>
  );
}

export default Login;
