"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
// Definir el tipo de dato para el contexto
type AuthContextType = {
  isTokenExpired: () => boolean;
  clearToken: () => void;
  isLogged: () => boolean;
  authToken: string;
  setAuthToken: (newToken: string) => void;
  logOut: () => void;
};

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor del contexto
export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [authToken, setAuthToken_] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken") || "";
    }
    return "";
  });

  // Agregar aquí las funciones
  const setAuthToken = (newToken: string) => {
    setAuthToken_(newToken);
  };

  const isLogged = () => {
    return authToken !== "";
  };

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  const isTokenExpired = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
        return Date.now() >= jwtPayload.exp * 1000;
      }
    }
  };

  const clearToken = () => {
    if (typeof window !== "undefined") {
      setAuthToken("");
      localStorage.removeItem("authToken");
    }
  };

  const logOut = () => {
    clearToken();
    router.push("/login");
  };

  // Retornar el proveedor del contexto con los valores que se desean compartir
  return (
    <AuthContext.Provider
      value={{
        isTokenExpired,
        clearToken,
        isLogged,
        authToken,
        setAuthToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Exportar el Custom Hook para usar el AuthContext
export function useAuthContext() {
  return useContext(AuthContext);
}
