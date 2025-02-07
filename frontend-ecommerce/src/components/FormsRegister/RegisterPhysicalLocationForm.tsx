"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import defaultImage from "@/app/icons/BagsadIcon.png";


function RegisterPhysicalLocationForm({ physicalLocation, onSubmit }: { physicalLocation?: any; onSubmit: (data: any) => void }) {
  const [address, setDirection] = useState<string>(physicalLocation?.address || "");
  const [telephone, setTelephone] = useState<string>(physicalLocation?.telephone || "");
  const [img, setImage] = useState<string>(physicalLocation?.img || "");
  const [longitude, setLongitude] = useState<number>(physicalLocation?.longitude || 0);
  const [latitude, setLatitude] = useState<number>(physicalLocation?.latitude || 0);
  const [imgFile, setImageFile] = useState<File>();

  // Para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, telephone, imgFile, longitude, latitude });
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('sisa')
      const maxSize = 500000;
      if (file.size > maxSize) {
        alert(`El tamaño de la imagen no puede ser mayor a ${maxSize / 1000} KB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setImage(event.target.result); // Guardar la imagen como base64
        }
      };
      console.log(file)
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="container-dashboard">
      <div className="main-center">
        <div className="container-inf-step">
          <form className="form-inf-buy" onSubmit={handleSubmit}>
            <h1>Registrar Punto Físico</h1>
            <h2>Datos personales</h2>
            <label htmlFor="address">Dirección: </label>
            <input
              className="input-standard"
              type="text"
              value={address}
              name="address"
              onChange={(e) => setDirection(e.target.value)}
            />
            <label htmlFor="telephone">Teléfono: </label>
            <input
              className="input-standard"
              type="text"
              value={telephone}
              name="telephone"
              onChange={(e) => setTelephone(e.target.value)}
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    src={img || defaultImage}
                    alt="Seleccionada"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: "cover" }}
                    className="rounded-lg border-2 border-gray-300 shadow-md"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center">
                <label htmlFor="imageUpload" className="block text-gray-700 mb-4">
                  Selecciona una imagen
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  id="button-standard"
                  className="px-4 py-2 cursor-pointer transition duration-300"
                >
                  Subir imagen
                </label>
                {img && (
                  <p className="mt-4 text-gray-600">
                    Has subido una imagen con éxito. Puedes cambiarla seleccionando otra.
                  </p>
                )}
              </div>
            </div>
            <button id="button-standard" type="submit">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPhysicalLocationForm;
