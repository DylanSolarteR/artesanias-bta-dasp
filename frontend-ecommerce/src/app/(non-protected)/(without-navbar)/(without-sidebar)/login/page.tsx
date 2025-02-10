"use client";
import UserLogo from "@/app/icons/UserLogo.svg?url";
import LoginForm from "@/components/LoginForm";
import LoginSideImage from "@/app/images/LoginSideImage2.jpg";
import "@/app/css/Login.css";
import ImageFb from "@/components/ImageFb";

function Login() {
  return (
    <div className="container-login">
      <main className="flex-simple">
        <aside className="image-major">
          <ImageFb alt="Imagen de Usuario" src={LoginSideImage} />
        </aside>
        <section className="title-container">
          <h1>Bienvenido a Artesanías Bogotá Ltda.</h1>
          <ImageFb
            alt="Imagen de Usuario"
            src={UserLogo}
            height={200}
            width={200}
          />
          <LoginForm />
        </section>
      </main>
    </div>
  );
}

export default Login;
