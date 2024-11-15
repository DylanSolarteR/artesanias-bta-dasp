"use client";
import React, { createContext, useContext, useState } from "react";
import { AxiosInstance } from "@/api/axios";
// Definir el tipo de dato para el contexto
type MainContextType = {
  AxiosInstance: any;
};

// Crear el contexto
export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

// Crear el proveedor del contexto
export const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Definir los estados y funciones

  // Agregar aquí las funciones

  // Retornar el proveedor del contexto con los valores que se desean compartir
  return (
    <MainContext.Provider value={{ AxiosInstance }}>
      {children}
    </MainContext.Provider>
  );
};

//Exportar el Custom Hook para usar el MainContext
export function useMainContext() {
  return useContext(MainContext);
}
