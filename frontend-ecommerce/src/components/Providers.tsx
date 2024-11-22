"use client";
import { Toaster } from "react-hot-toast";
import { MainContextProvider } from "@/app/context/MainContext";
import { AuthContextProvider } from "@/app/context/AuthContext";
import { CartContextProvider } from "@/app/context/CartContext";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Toaster position="bottom-right" />
            {children}
          </CartContextProvider>
        </AuthContextProvider>
      </MainContextProvider>
    </>
  );
}

export default Providers;
