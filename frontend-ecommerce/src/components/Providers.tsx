"use client";
import { Toaster } from "react-hot-toast";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

export default Providers;
