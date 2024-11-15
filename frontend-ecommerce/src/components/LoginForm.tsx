import { useActionState, useState, useEffect } from "react";
import { loginAuth } from "@/api/auth.api";
import toast from "react-hot-toast";
import { onlyNumberInput } from "@/util/utils";
import { useRouter } from "next/navigation";
function LoginForm() {
  const router = useRouter();
  const [message, formAction, isPending] = useActionState(loginAuth, {
    success: false,
    message: "",
    status: 0,
  });
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (message.status === 400 || message.status === 401) {
      toast.error(message.message);
    }
    if (message.status === 200) {
      toast.success(message.message);
      router.push("/dashboard");
    }
  }, [message]);

  return (
    <form action={formAction}>
      <label htmlFor="user">ID Usuario: </label>
      <input
        type="text"
        value={userId}
        name="userId"
        onChange={(e) => setUserId(e.target.value)}
        onKeyDown={onlyNumberInput}
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
