"use client";
import SearchBarMenu from "@/components/SearchBarMenu";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { useState } from "react";
import ImageFb from "../ImageFb";

interface ConsultaPOSProps {
  product_list: PRODUCT_FROM_INVENTARY[];
}

function ConsultaPOS({ product_list }: ConsultaPOSProps) {
  const [product_list_filtered, setProduct_list_filtered] = useState<PRODUCT_FROM_INVENTARY[]>(product_list);
  const [product_selected, setProduct_selected] = useState<PRODUCT_FROM_INVENTARY | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);

  function handleFocus() {
    setIsListVisible(true);
  }

  return (
    <main className="flex flex-col justify-center items-center w-full h-[600px]">
      <section className="container-consult">
        <h1 className="text-3x1 font-bold">Consultar detalles de los productos en el inventario</h1>
        <div className="search-round">
        <SearchBarMenu
          search_name="producto"
          data_array={product_list}
          filter_keys={["productName", "productId"]}
          onFilter={setProduct_list_filtered}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setIsListVisible(false), 200)}
        />
        
        {isListVisible && (
          <div className="relative w-full">
            <ul className="absolute bg-white w-full border border-gray-300 rounded-md max-h-40 overflow-auto mt-2 shadow-md">
              {product_list_filtered.length === 0 && <li>No hay productos</li>}
              {product_list_filtered.map((product) => {
                return (
                  <li
                    key={product.productId}
                    className="p-2 cursor-pointer hover:bg-gray-100 transition-colors"
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
        </div>
      </section>
      {product_selected && (
        <section className="bg-white w-full max-w-3xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {product_selected.productId + ". "} {product_selected.productName}
          </h1>
          <div className="flex flex-col md:flex-row pl-4 pr-4 items-center gap-6">
            <ImageFb
              src={
                product_selected.productImage ??
                "https://placehold.co/600x400/EEE/31343C?font=lato&text=NoImage"
              }
              alt={product_selected.productName}
              width={300}
              height={200}
              className="rounded-lg border border-gray-200 shadow-sm"
            />
            <div className="flex flex-col text-left gap-4">
              <p><strong>Precio:</strong> {product_selected.price}</p>
              <p><strong>Stock Total:</strong> {product_selected.totalQuantity}</p>
              <p><strong>Stock en vitrina:</strong> {product_selected.displayQuantity}</p>
              <p><strong>Stock disponible:</strong> {product_selected.ecommerceQuantity}</p>
              <p><strong>Categoría:</strong> {product_selected.categoryName}</p>
              <p><strong>Tienda:</strong> {product_selected.locationAddress}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default ConsultaPOS;