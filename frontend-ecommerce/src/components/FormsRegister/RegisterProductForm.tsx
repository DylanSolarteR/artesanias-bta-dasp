"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as apiCategory from "@/api/category.api";
import defaultImage from "@/app/icons/BagsadIcon.png";

function RegisterProductForm() {
  const [productBase, setProductBase] = useState<string>("A");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState<string | null>(null);
  const [active, setActive] = useState<Boolean>(true);
  const [category, setCategory] = useState<string>();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiCategory.listCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setImage(event.target.result); // Guardar la imagen como base64
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-dashboard">
      <div className="main-center">
        <div className="container-inf-step">
          <form className="form-inf-buy" onSubmit={(e) => e.preventDefault()}>
            <h1>Registrar Productos</h1>

            <label htmlFor="productBase">Variable del producto: </label>
            <select
              className="input-standard"
              value={productBase}
              name="productBase"
              onChange={(e) => setProductBase(e.target.value)}
            >
              <option value="A">Ni idea de como funciona esto</option>
            </select>

            <label htmlFor="name">Nombre del producto: </label>
            <input
              className="input-standard"
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="description">Descripción: </label>
            <input
              className="input-standard"
              type="text"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="price">Precio: </label>
            <input
              className="input-standard"
              type="number"
              value={price}
              name="price"
              min="0"
              step="1"
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <label htmlFor="category">Categoría: </label>
            <select
              className="input-standard"
              value={category}
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label htmlFor="active">Estado: </label>
            <select
              className="input-standard"
              value={active ? "true" : "false"}
              name="active"
              onChange={(e) => setActive(e.target.value === "true")}
            >
              <option value="true">Activado</option>
              <option value="false">Desactivado</option>
            </select>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    src={image || defaultImage}
                    alt="Seleccionada"
                    layout="fill"
                    objectFit="cover"
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
                {image && (
                  <p className="mt-4 text-gray-600">
                    Has subido una imagen con éxito. Puedes cambiarla seleccionando otra.
                  </p>
                )}
              </div>
            </div>

            <button id="button-standard" type="submit">Registrar Producto</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterProductForm;