import type { Metadata } from "next";
import { geistSans, geistMono } from "@/app/fonts/fonts";
import "@/app/css/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Artesanías Bogotá LTDA",
  description: "Comercio Electrónico de Artesanías",
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
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
