import "@/app/css/globals.css";
import DashboardSideBar from "@/components/DashboardSideBar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Providers from "@/components/Providers";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-simple">
      <Providers>
        <ProtectedRoute>
          <Navbar />
          <DashboardSideBar />
          {children}
        </ProtectedRoute>
      </Providers>
    </div>
  );
}
