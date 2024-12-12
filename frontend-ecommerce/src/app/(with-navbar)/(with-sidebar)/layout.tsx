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
