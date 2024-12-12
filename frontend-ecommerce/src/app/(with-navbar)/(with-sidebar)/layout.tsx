import "@/app/css/globals.css";
import Providers from "@/components/Providers";
import DashboardSideBar from "@/components/DashboardSideBar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <ProtectedRoute>
          <DashboardSideBar />
          {children}
        </ProtectedRoute>
      </Providers>
    </>
  );
}
