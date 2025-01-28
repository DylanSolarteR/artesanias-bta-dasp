import type { Metadata } from "next";
import { geistSans, geistMono } from "@/app/fonts/fonts";
import "@/app/css/globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Artesanías Bogotá LTDA",
  description: "Comercio Electrónico de Artesanías",
  icons: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
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
