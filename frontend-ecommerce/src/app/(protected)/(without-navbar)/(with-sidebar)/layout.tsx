import "@/app/css/globals.css";
import DashboardSideBar from "@/components/DashboardSideBar";
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
          <DashboardSideBar />
          {children}
        </ProtectedRoute>
      </Providers>
    </div>
  );
}
