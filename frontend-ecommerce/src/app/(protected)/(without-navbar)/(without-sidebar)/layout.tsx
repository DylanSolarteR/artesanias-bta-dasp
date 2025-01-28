import "@/app/css/globals.css";
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
        <ProtectedRoute>{children}</ProtectedRoute>
      </Providers>
    </div>
  );
}
