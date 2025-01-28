import "@/app/css/globals.css";
import Providers from "@/components/Providers";
import ProtectedRoute from "@/components/ProtectedRoute";

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
