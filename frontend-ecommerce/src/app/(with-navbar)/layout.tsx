import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/css/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
        <Navbar></Navbar>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
