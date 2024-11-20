import type { Metadata } from "next";
import { geistSans, geistMono } from "@/app/fonts/fonts";
import Providers from "@/components/Providers";
import "@/app/css/globals.css";

export const metadata: Metadata = {
  title: "Artesanías Bogotá LTDA",
  description: "Aplicación web para empleados de Artesanías Bogotá LTDA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
