import Image from "next/image";
import RePerdido from "@/app/images/RePerdido.jpg";
import Navbar from "@/components/Navbar";
export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <Image
          src={RePerdido}
          alt={"404"}
          width={524}
          height={536}
          className="rounded-lg"
        ></Image>
        <h1 className="font-bold">404 - Página no encontrada</h1>
      </div>
    </div>
  );
}
