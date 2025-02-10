"use client";
import { useState } from "react";
import defaultImage from "@/app/icons/BagsadIcon.png";
import Map from "@/components/Map";
import ImageFb from "../ImageFb";

function RegisterPhysicalLocationForm({
  physicalLocation,
  onSubmit,
}: {
  physicalLocation?: any;
  onSubmit: (data: any) => void;
}) {
  const [address, setAddress] = useState<string>(
    physicalLocation?.address || ""
  );
  const [telephone, setTelephone] = useState<string>(
    physicalLocation?.telephone || ""
  );
  const [img, setImage] = useState<string>(physicalLocation?.image || "");
  const [imgFile, setImageFile] = useState<File>();
  const [longitude, setLongitude] = useState<number>(
    physicalLocation?.longitude || 0
  );
  const [latitude, setLatitude] = useState<number>(
    physicalLocation?.latitude || 0
  );

  const center = { lat: 4.60971, lng: -74.08175 };

  // Para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, telephone, latitude, longitude, imgFile });
  };

  const handleLocationSelect = (location: {
    address: string;
    lat: number;
    lng: number;
  }) => {
    setAddress(location.address);
    setLatitude(Number(location.lat.toFixed(6)));
    setLongitude(Number(location.lng.toFixed(6)));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 500000;
      if (file.size > maxSize) {
        alert(
          `El tamaño de la imagen no puede ser mayor a ${maxSize / 1000} KB.`
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setImage(event.target.result); // Guardar la imagen como base64
        }
      };
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
            <p>
              Para usar el mapa, escribe una dirección en el campo de búsqueda y
              haz clic en &quot;Buscar&quot;. El mapa se centrará en esa
              ubicación y colocará un marcador en ella (debe ser precisa).
              También puedes hacer clic directamente en cualquier área del mapa
              para seleccionar una ubicación y agregar un marcador.
            </p>
            <div>
              <Map
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                center={center}
                zoom={12}
                markers={[]}
                allowSelection={true}
                onLocationSelect={handleLocationSelect}
              />
            </div>
            <label htmlFor="address">Dirección: </label>
            <input
              className="input-standard"
              type="text"
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              readOnly
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
                  <ImageFb
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
                <label
                  htmlFor="imageUpload"
                  className="block text-gray-700 mb-4"
                >
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
                    Has subido una imagen con éxito. Puedes cambiarla
                    seleccionando otra.
                  </p>
                )}
              </div>
            </div>
            <button id="button-standard" type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPhysicalLocationForm;
