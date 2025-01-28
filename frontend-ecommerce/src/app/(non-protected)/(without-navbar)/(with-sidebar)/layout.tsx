import "@/app/css/globals.css";
import DashboardSideBar from "@/components/DashboardSideBar";
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
        {children}
      </Providers>
    </div>
  );
}
