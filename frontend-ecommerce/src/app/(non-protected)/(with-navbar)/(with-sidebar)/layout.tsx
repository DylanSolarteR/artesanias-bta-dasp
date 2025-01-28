import "@/app/css/globals.css";
import DashboardSideBar from "@/components/DashboardSideBar";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-simple">
      <Providers>
        <DashboardSideBar />
        <Navbar />
        {children}
      </Providers>
    </div>
  );
}
