import "@/app/css/globals.css";
import "@/app/css/dashboard.css";
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
    <div className="h-full">
      <Providers>
        <ProtectedRoute>
          <Navbar />
          <div className="dashboard-main">
            <DashboardSideBar />
            {children}
          </div>
        </ProtectedRoute>
      </Providers>
    </div>
  );
}
