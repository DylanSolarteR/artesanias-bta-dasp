"use client";
import { Role } from "@/util/RolePermissions";
import React, { createContext, useContext, useState } from "react";

type MainContextType = {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
};

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<Role>();

  return (
    <MainContext.Provider
      value={{
        role,
        setRole,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export function useMainContext() {
  return useContext(MainContext);
}
