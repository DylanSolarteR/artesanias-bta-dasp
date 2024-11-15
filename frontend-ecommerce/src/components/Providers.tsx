"use client";
import { Toaster } from "react-hot-toast";
import { MainContextProvider } from "@/app/context";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainContextProvider>
        <Toaster />
        {children}
      </MainContextProvider>
    </>
  );
}

export default Providers;
