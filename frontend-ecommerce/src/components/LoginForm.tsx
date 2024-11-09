import { useActionState, useState, useEffect } from "react";
import { loginAuth } from "@/api/auth.api";
import toast from "react-hot-toast";
function LoginForm() {
  const [message, formAction, isPending] = useActionState(loginAuth, {
    success: false,
    message: "",
    status: 0,
  });
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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
      <label htmlFor="user">Usuario: </label>
      <input
        type="text"
        value={user}
        name="user"
        onChange={(e) => setUser(e.target.value)}
      />
      <label htmlFor="password">Contraseña: </label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isPending ? "Validando..." : "Ingresar"}</button>
    </form>
  );
}

export default LoginForm;
