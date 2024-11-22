"use client";
import Image from "next/image";
import UserLogo from "@/app/icons/UserLogo.svg?url";
import LoginForm from "@/components/LoginForm";
import LoginSideImage from "@/app/images/LoginSideImage2.jpg";
import '@/app/css/Login.css'

function Login() {
  return (
    <div className="container">
      <main className="main-container">
        <aside className="image-major">
          <Image alt="Imagen de Usuario" src={LoginSideImage}></Image>
        </aside>
        <section className="title-container">
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
