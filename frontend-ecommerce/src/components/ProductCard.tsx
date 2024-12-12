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
    <div className="card">
      <input
        type="checkbox"
        className="radio"
        onChange={handleCheckboxChange}
        defaultChecked={checked}
      />
      <div className="plan-details">
        <Image
          src={
            product.product_image ??
            "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
          }
          alt={product.productName}
          width={180}
          height={150}
        />
        <h5>{product.productName}</h5>
        <h5>{product.locationDirection}</h5>
        <p>Stock: {product.totalQuantity}</p>
      </div>
    </div>
  );
}

export default ProductCard;
