import RePerdido from "@/app/images/RePerdido.jpg";
import Navbar from "@/components/Navbar";
import ImageFb from "@/components/ImageFb";
export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <ImageFb
          src={RePerdido}
          alt={"404"}
          width={524}
          height={536}
          className="rounded-lg"
        ></ImageFb>
        <h1 className="font-bold">404 - Página no encontrada</h1>
      </div>
    </div>
  );
}
