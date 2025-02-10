"use client";
import SearchBarMenu from "@/components/SearchBarMenu";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { useState } from "react";
import ImageFb from "../ImageFb";

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
      <section className="flex flex-col justify-start items-center max-h-20 pt-10 pb-20">
        <SearchBarMenu
          search_name="producto"
          data_array={product_list}
          filter_keys={["productName", "productId"]}
          onFilter={setProduct_list_filtered}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setIsListVisible(false), 200)}
        />
        {isListVisible && (
          <div className="relative z-10">
            <ul className="absolute z-10 bg-white w-96 top-0 -left-52 border border-gray-300 rounded-md h-24 overflow-auto">
              {product_list_filtered.length === 0 && <li>No hay productos</li>}
              {product_list_filtered.map((product) => {
                return (
                  <li
                    key={product.productId}
                    className="hover:bg-[--color-main-soft] overflow-x-clip"
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
          </div>
        )}
      </section>
      <section className="flex grow flex-col justify-start w-full p-20">
        {product_selected !== null && (
          <div
            key={product_selected.productId}
            className="flex flex-col gap-4 items-start justify-center"
          >
            <h1 className="px-0">
              {product_selected.productId + ". "} {product_selected.productName}
            </h1>
            <div className="flex flex-row w-full justify-center gap-4">
              <div>
                <ImageFb
                  src={
                    product_selected.productImage ??
                    "https://placehold.co/600x400/EEE/31343C?font=lato&text=NoImage"
                  }
                  alt={product_selected.productName}
                  width={600}
                  height={400}
                  className="self-center rounded-lg"
                />
              </div>
              <div className="flex flex-row w-full justify-center items-center">
                <div className="flex flex-col items-start w-full ">
                  <p className="text-4xl font-bold">
                    Precio:{" "}
                    <span className="font-normal">
                      {product_selected.price}
                    </span>
                  </p>
                  <p className="text-4xl font-bold">
                    Stock Total:{" "}
                    <span className="font-normal">
                      {product_selected.totalQuantity}
                    </span>
                  </p>
                  <p className="text-4xl font-bold">
                    Stock en vitrina:{" "}
                    <span className="font-normal">
                      {product_selected.displayQuantity}
                    </span>
                  </p>
                  <p className="text-4xl font-bold">
                    Stock disponible:{" "}
                    <span className="font-normal">
                      {product_selected.ecommerceQuantity}
                    </span>
                  </p>
                  <p className="text-4xl font-bold">
                    Categoria:{" "}
                    <span className="font-normal">
                      {product_selected.categoryName}
                    </span>
                  </p>
                  <p className="text-4xl font-bold">
                    Tienda:{" "}
                    <span className="font-normal">
                      {product_selected.locationAddress}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default ConsultaPOS;
