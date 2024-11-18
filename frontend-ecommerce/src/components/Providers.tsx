"use client";
import { Toaster } from "react-hot-toast";
import { MainContextProvider } from "@/app/context/MainContext";
import { AuthContextProvider } from "@/app/context/AuthContext";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainContextProvider>
        <AuthContextProvider>
          <Toaster position="bottom-right" />
          {children}
        </AuthContextProvider>
      </MainContextProvider>
    </>
  );
}

export default Providers;
