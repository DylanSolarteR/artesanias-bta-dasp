"use client";
import { POS_ADDED_PRODUCT } from "@/types/inventory.types";
import Image from "next/image";
import DeleteIcon from "@/app/icons/CloseSquareIcon.svg?url";
import { onlyNumberInput } from "@/util/utils";
import { useEffect, useState } from "react";

interface ProductCardPOSProps {
  productPos: POS_ADDED_PRODUCT;
  removeFromProductsAdded: (productPos: POS_ADDED_PRODUCT) => void;
  changeSubtotalByProductId: (
    productId: number,
    quantity: number,
    subtotal: number
  ) => void;
}

function ProductCardPOS({
  productPos,
  removeFromProductsAdded,
  changeSubtotalByProductId,
}: ProductCardPOSProps) {
  const [quantity, setQuantity] = useState<string>("1");
  const [subtotal, setSubtotal_] = useState<number>(productPos.product.price);

  function setSubtotal(subtotal: number) {
    setSubtotal_(subtotal);
    changeSubtotalByProductId(
      productPos.product.productId,
      parseInt(quantity),
      subtotal
    );
  }

  useEffect(() => {
    setSubtotal(
      quantity === ""
        ? productPos.product.price
        : parseInt(quantity) * productPos.product.price
    );
  }, [quantity]);

  function confirmQuantity(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      setQuantity("1");
    }
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) > productPos.product.ecommerceQuantity) {
      setQuantity(String(productPos.product.ecommerceQuantity));
      return;
    }
    if (parseInt(e.target.value) < 1) {
      setQuantity("1");
      return;
    }
    setQuantity(e.target.value);
  }

  return (
    <div className="relative border p-3 pt-8">
      <button
        className="delete absolute top-2 right-2"
        onClick={() => removeFromProductsAdded(productPos)}
      >
        <Image
          src={DeleteIcon}
          alt="Eliminar producto"
          width={20}
          height={20}
        />
      </button>
      <div className="header-product">
        <span id="title_badge">
          {productPos.product.productName ?? "Artesanía"}
        </span>
        <span>{"C/U: $ " + productPos.product.price}</span>
      </div>
      <div className="details-product">
        <div>
          <label htmlFor="quantity">Cantidad: </label>
          <input
            type="text"
            id="quantity"
            onKeyDown={onlyNumberInput}
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={confirmQuantity}
          />
        </div>
        <p>
          Precio: <span>{subtotal}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductCardPOS;
