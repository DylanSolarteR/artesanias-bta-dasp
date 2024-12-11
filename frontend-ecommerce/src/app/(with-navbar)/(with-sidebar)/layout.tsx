import type { Metadata } from "next";
import "@/app/css/globals.css";
import Providers from "@/components/Providers";
import DashboardSideBar from "@/components/DashboardSideBar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Artesanías Bogotá LTDA",
  description: "Comercio Electrónico de Artesanías",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-simple">
      <Providers>
        <ProtectedRoute>
          <DashboardSideBar />
          {children}
        </ProtectedRoute>
      </Providers>
    </div>
  );
}
