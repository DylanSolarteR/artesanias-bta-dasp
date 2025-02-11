"use client";
import { useState, useEffect } from "react";
import { onlyNumberInput } from "@/util/utils";
import defaultImage from "@/app/icons/BagsadIcon.png";
import * as apiCategory from "@/api/category.api";
import ImageFb from "../ImageFb";

function RegisterProductForm({
  product,
  onSubmit,
}: {
  product?: any;
  onSubmit: (data: any) => void;
}) {
  const [baseProductId, setProductBase] = useState<string>(
    product?.baseProductId || ""
  );
  const [name, setName] = useState<string>(product?.name || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [price, setPrice] = useState<number>(product?.price || "");
  const [img, setImage] = useState<string>(product?.img || "");
  const [imgFile, setImageFile] = useState<File>();
  const [isOwnBase, setOwnBase] = useState<boolean>();
  const [categoryId, setCategoryId] = useState<string>(
    product?.categoryId || ""
  );
  const [category, setCategory] = useState<string>(product?.categoryName || "");
  const [categories, setCategories] = useState([]);

  // Para listar las categorías
  useEffect(() => {
    apiCategory.listCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  // Para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const newOwnBase = baseProductId === "" ? true : false;
    const newBaseProductId = newOwnBase ? null : baseProductId;

    setOwnBase(newOwnBase);

    onSubmit({
      name,
      description,
      price,
      imgFile,
      categoryId,
      baseProductId: newBaseProductId,
      isOwnBase: newOwnBase,
    });
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
            <h1>Registrar Productos</h1>

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
              onKeyDown={onlyNumberInput}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <label htmlFor="category">Categoría: </label>
            <select
              className="input-standard"
              value={categoryId}
              name="category"
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (cat) => cat.id == e.target.value
                );
                if (selectedCategory) {
                  setCategoryId(selectedCategory.id);
                  setCategory(selectedCategory.name);
                }
              }}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label htmlFor="productBase">Variante del producto: </label>
            <input
              className="input-standard"
              type="number"
              value={baseProductId}
              name="productBase"
              onKeyDown={onlyNumberInput}
              onChange={(e) => setProductBase(e.target.value)}
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

export default RegisterProductForm;
