import { PRODUCT } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductVariantsProps = {
  current_product: PRODUCT;
  variantsArray: Array<PRODUCT>;
};

const mockVariants: Array<PRODUCT> = [
  {
    _id: 1,
    name: "Producto 1",
    description: "Descripción del producto 1",
    categoryName: "Categoría 1",
    price: 100,
    stock: 10,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 1,
    baseProductId: 1,
  },
  {
    _id: 2,
    name: "Producto 2",
    description: "Descripción del producto 2",
    categoryName: "Categoría 2",
    price: 200,
    stock: 20,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 2,
    baseProductId: 2,
  },
  {
    _id: 3,
    name: "Producto 3",
    description: "Descripción del producto 3",
    categoryName: "Categoría 3",
    price: 300,
    stock: 30,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 3,
    baseProductId: 3,
  },
  //another ten variants
  {
    _id: 4,
    name: "Producto 4",
    description: "Descripción del producto 4",
    categoryName: "Categoría 4",
    price: 400,
    stock: 40,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 4,
    baseProductId: 4,
  },
  {
    _id: 5,
    name: "Producto 5",
    description: "Descripción del producto 5",
    categoryName: "Categoría 5",
    price: 500,
    stock: 50,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 5,
    baseProductId: 5,
  },
  {
    _id: 6,
    name: "Producto 6",
    description: "Descripción del producto 6",
    categoryName: "Categoría 6",
    price: 600,
    stock: 60,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 6,
    baseProductId: 6,
  },
  {
    _id: 7,
    name: "Producto 7",
    description: "Descripción del producto 7",
    categoryName: "Categoría 7",
    price: 700,
    stock: 70,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 7,
    baseProductId: 7,
  },
  {
    _id: 8,
    name: "Producto 8",
    description: "Descripción del producto 8",
    categoryName: "Categoría 8",
    price: 800,
    stock: 80,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 8,
    baseProductId: 8,
  },
  {
    _id: 9,
    name: "Producto 9",
    description: "Descripción del producto 9",
    categoryName: "Categoría 9",
    price: 900,
    stock: 90,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 9,
    baseProductId: 9,
  },
  {
    _id: 10,
    name: "Producto 10",
    description: "Descripción del producto 10",
    categoryName: "Categoría 10",
    price: 1000,
    stock: 100,
    img: "https://placehold.co/36",
    isActive: true,
    categoryId: 10,
    baseProductId: 10,
  },
];

function ProductVariants({
  current_product,
  variantsArray,
}: ProductVariantsProps) {
  const [productName, setProductName] = useState<string>(current_product?.name);

  return (
    <div className="w-full">
      <p className="p-2 pt-4">Variante: {productName}</p>
      <div className="flex flex-row w-full overflow-x-auto h-full max-h-fit gap-4 items-center justify-start px-2 py-1">
        {mockVariants.map((variant, index) =>
          variant._id !== current_product._id ? (
            <span
              key={index}
              title={variant.name}
              onMouseOver={() => setProductName(variant.name)}
              onMouseLeave={() => setProductName(current_product?.name)}
              className="shrink-0"
            >
              <Link href={`/producto/${variant._id}`}>
                <Image
                  src={
                    "https://placehold.co/80x80/EEE/31343C?font=lato&text=NoImage"
                  }
                  className="rounded-lg hover:border-2 hover:border-[--color-main] hover:shadow-md "
                  alt={variant.name}
                  width={80}
                  height={80}
                />
              </Link>
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ProductVariants;
