"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
// Definir el tipo de dato para el contexto
type AuthContextType = {
  contextValue: {
    authToken: string;
    setAuthToken: (newToken: string) => void;
  };
  isTokenExpired: () => boolean;
  clearToken: () => void;
  isLogged: () => boolean;
};

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor del contexto
export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken_] = useState<string>("");
  // Agregar aquí las funciones
  const setAuthToken = (newToken: string) => {
    setAuthToken_(newToken);
  };

  const isLogged = () => {
    return authToken !== "";
  };

  useEffect(() => {
    if (authToken) {
      window.localStorage.setItem("authToken", authToken);
    } else {
      window.localStorage.removeItem("authToken");
    }
  }, [authToken]);

  const isTokenExpired = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
      return Date.now() >= jwtPayload.exp * 1000;
    }
  };

  const clearToken = () => {
    if (typeof window !== "undefined") {
      setAuthToken("");
      localStorage.removeItem("authToken");
    }
  };

  const contextValue = useMemo(
    () => ({
      authToken,
      setAuthToken,
    }),
    [authToken]
  );

  // Retornar el proveedor del contexto con los valores que se desean compartir
  return (
    <AuthContext.Provider
      value={{
        contextValue,
        isTokenExpired,
        clearToken,
        isLogged,
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
