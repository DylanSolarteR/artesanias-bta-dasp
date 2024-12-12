"use client";
import { POS_ADDED_PRODUCT } from "@/types/product.types";
import Image from "next/image";
import DeleteIcon from "@/app/icons/closeSquareIcon.svg?url";
import { onlyNumberInput } from "@/util/utils";
import { useEffect, useState } from "react";

interface ProductCardPOSProps {
  productPos: POS_ADDED_PRODUCT;
  removeFromProductsAdded: (productPos: POS_ADDED_PRODUCT) => void;
  changeSubtotalByProductId: (productId: number, subtotal: number) => void;
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
    changeSubtotalByProductId(productPos.product._id, subtotal);
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
    if (parseInt(e.target.value) > productPos.product.stock) {
      setQuantity(String(productPos.product.stock));
      return;
    }
    if (parseInt(e.target.value) < 1) {
      setQuantity("1");
      return;
    }
    setQuantity(e.target.value);
  }

  return (
    <div className="relative border p-10">
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
      <div className="flex flex-row justify-between">
        <span id="title_badge">{productPos.product.name ?? "Artesanía"}</span>
        <span>{"C/U: $ " + productPos.product.price}</span>
      </div>
      <div className="flex flex-col">
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
          Subtotal: <span>{subtotal}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductCardPOS;
