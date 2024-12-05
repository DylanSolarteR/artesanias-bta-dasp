"use client";
import { Role } from "@/util/RolePermissions";
import React, { createContext, useContext, useState } from "react";

type MainContextType = {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  gridClass: string;
  setGridClass: React.Dispatch<React.SetStateAction<string>>;
};

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<Role>();
  const [gridClass, setGridClass] = useState("grid-3");
  return (
    <MainContext.Provider
      value={{
        role,
        setRole,
        gridClass,
        setGridClass,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export function useMainContext() {
  return useContext(MainContext);
}
