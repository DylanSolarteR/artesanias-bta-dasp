"use client";
import SearchBarMenu from "@/components/SearchBarMenu";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import Image from "next/image";
import { useState } from "react";

interface ConsultaPOSProps {
  product_list: PRODUCT_FROM_INVENTARY[];
}
function ConsultaPOS({ product_list }: ConsultaPOSProps) {
  const [product_list_filtered, setProduct_list_filtered] =
    useState<PRODUCT_FROM_INVENTARY[]>(product_list);
  const [product_selected, setProduct_selected] =
    useState<PRODUCT_FROM_INVENTARY | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);

  function handleFocus() {
    setIsListVisible(true);
  }

  return (
    <main className="flex flex-col justify-start items-center h-full">
      <section className="flex flex-col justify-start items-center max-h-20 py-2">
        <SearchBarMenu
          search_name="producto"
          data_array={product_list}
          filter_keys={["productName", "productId"]}
          onFilter={setProduct_list_filtered}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setIsListVisible(false), 200)}
        />
        {isListVisible && (
          <ul className="z-10">
            {product_list_filtered.length === 0 && <li>No hay productos</li>}
            {product_list_filtered.map((product) => {
              return (
                <li
                  key={product.productId}
                  onClick={() => {
                    setProduct_selected(product);
                    setIsListVisible(false);
                  }}
                >
                  {product.productName}
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <section className="flex grow">
        {product_selected !== null && (
          <div key={product_selected.productId}>
            {/* <h1>{product_selected.productId}</h1> */}
            <h1>{product_selected.productName}</h1>
            <p>{product_selected.price}</p>
            <Image
              src={
                product_selected.product_image ??
                "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
              }
              alt={product_selected.productName}
              width={300}
              height={300}
            />
            <p>{product_selected.totalQuantity}</p>
            <p>{product_selected.displayQuantity}</p>
            <p>{product_selected.ecommerceQuantity}</p>
            <p>{product_selected.categoryName}</p>
            <p>{product_selected.locationAddress}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default ConsultaPOS;
