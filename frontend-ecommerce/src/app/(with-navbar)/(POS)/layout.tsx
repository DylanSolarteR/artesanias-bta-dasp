import "@/app/css/globals.css";
import Providers from "@/components/Providers";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function POSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-simple">
      <Providers>
        <ProtectedRoute>
          <Navbar />
          {children}
        </ProtectedRoute>
      </Providers>
    </div>
  );
}
