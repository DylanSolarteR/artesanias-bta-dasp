import { useActionState, useState, useEffect } from "react";
import { loginAuth } from "@/api/auth.api";
import toast from "react-hot-toast";
import { onlyNumberInput } from "@/util/utils";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const { contextValue } = useAuthContext();
  const [message, formAction, isPending] = useActionState(loginAuth, {
    success: false,
    message: "",
    status: 0,
    authToken: "",
  });
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (message.status === 400 || message.status === 401) {
      toast.error(message.message);
    }
    if (message.status === 500) {
      toast.error("Error en el servidor, intente más tarde.");
    }
    if (message.status === 200) {
      contextValue.setAuthToken(message.authToken);
      toast.success(message.message);
      new Promise((r) => setTimeout(r, 1000)).then(() =>
        router.push("/dashboard")
      );
    }
  }, [message]);

  return (
    <form className="form-login" action={formAction}>
      <label htmlFor="user">ID Usuario: </label>
      <input
        type="text"
        value={userId}
        name="userId"
        onChange={(e) => setUserId(e.target.value)}
        onKeyDown={onlyNumberInput}
      />{" "}
      <br />
      <label htmlFor="password">Contraseña: </label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <p>¿Olvidaste tu contraseña?</p>
      <button id="button-standard" type="submit">{isPending ? "Validando..." : "Ingresar"}</button>
    </form>
  );
}

export default LoginForm;
