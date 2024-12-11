import Image from "next/image";
import { useState } from "react";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
//For the inventory page
function ProductCard({
  product,
  addToProductsTable,
  deleteFromProductsTable,
}: {
  product: PRODUCT_FROM_INVENTARY;
  addToProductsTable: (product: PRODUCT_FROM_INVENTARY) => void;
  deleteFromProductsTable: (product: PRODUCT_FROM_INVENTARY) => void;
}) {
  const [checked, setChecked] = useState(false);
  function handleCheckboxChange() {
    if (!checked) {
      addToProductsTable(product);
    }
    if (checked) {
      deleteFromProductsTable(product);
    }
    setChecked(!checked);
  }
  return (
    <div className="flex flex-col relative text-center">
      <input
        type="checkbox"
        className="absolute top-2 right-2"
        onChange={handleCheckboxChange}
        defaultChecked={checked}
      />
      <Image
        src={
          product.product_image ??
          "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
        }
        alt={product.productName}
        width={180}
        height={150}
        className="w-full"
      />
      <h3>{product.productName}</h3>
      <h3>{product.locationDirection}</h3>
      <p>Stock: {product.totalQuantity}</p>
    </div>
  );
}

export default ProductCard;
