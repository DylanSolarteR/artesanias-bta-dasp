"use client";
import Image from "next/image";

import SearchBarMenu from "@/components/SearchBarMenu";
import ProductCardPOS from "../ProductCardPOS";

import {
  POS_ADDED_PRODUCT,
  PRODUCT_FROM_INVENTARY,
} from "@/types/inventory.types";
import CustomerDataFormDialog from "./CustomerDataFormDialog";
import { basicUserDataSchema, productSchema } from "@/types/purchase.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { completePosPurchase } from "@/api/purchase.api";

interface RegistroPOSProps {
  product_list: PRODUCT_FROM_INVENTARY[];
  location_id: number;
}
function RegistroPOS({ product_list, location_id }: RegistroPOSProps) {
  const [product_list_filtered, setProduct_list_filtered] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);

  const [total, setTotal] = useState<number>(0);
  const [imageSource, setImageSource] = useState<string>(
    "https://placehold.co/450x300/EEE/31343C?font=lato&text=NoImage"
  );

  const [products_added, setProducts_added] = useState<POS_ADDED_PRODUCT[]>([]);

  async function confirmPurchase(userData: basicUserDataSchema) {
    const productsArray: productSchema[] = products_added.map((productPos) => ({
      id: productPos.product.productId,
      quantity: productPos.quantity,
    }));

    const purchaseData = await completePosPurchase({
      basicUserData: userData,
      productList: productsArray,
      locationId: location_id,
    });

    // console.log(purchaseData);

    if (purchaseData.status === 401) {
      toast.error("Ocurrio un error, vuelva a iniciar sesión.");
      return;
    }
    if (purchaseData.status === 500) {
      toast.error(purchaseData.data);
      return;
    }
    if (purchaseData.status !== 200) {
      toast.error("Ocurrio un error con la compra.");
      return;
    }

    clearProductsAdded();
    toast.success("Compra realizada con éxito.");
  }

  function addToProductsAdded(productPos: POS_ADDED_PRODUCT): void {
    const exists = products_added.some(
      (item) => item.product.productId === productPos.product.productId
    );
    if (!exists) {
      setProducts_added([...products_added, productPos]);
    } else {
      toast.error("El item ya ha sido agregado.");
    }
  }
  function removeFromProductsAdded(productPos: POS_ADDED_PRODUCT): void {
    setProducts_added(products_added.filter((prod) => prod !== productPos));
  }

  function changeSubtotalByProductId(
    productId: number,
    quantity: number,
    subtotal: number
  ): void {
    setProducts_added(
      products_added.map((productPos) =>
        productPos.product.productId === productId
          ? {
              product: productPos.product,
              quantity: quantity,
              subtotal: subtotal,
            }
          : productPos
      )
    );
  }

  function updateTotal() {
    setTotal(
      products_added.reduce((acc, productPos) => acc + productPos.subtotal, 0)
    );
  }

  function clearProductsAdded() {
    setProducts_added([]);
  }

  const handleProductSelect = (product: PRODUCT_FROM_INVENTARY) => {
    addToProductsAdded({
      product: product,
      quantity: 1,
      subtotal: product.price,
    });
    setImageSource(product.productImage);
  };

  useEffect(() => {
    updateTotal();
  }, [products_added]);

  useEffect(() => {
    setProduct_list_filtered(product_list);
  }, [product_list]);
  return (
    <main className="flex justify-around h-[54rem] px-2">
      <section className="flex flex-col h-full grow justify-start items-center py-8">
        {/* producto */}
        <div className="flex flex-col w-full justify-start h-[66%]">
          <div className="flex justify-center">
            <Image
              className="self-center rounded-md"
              alt=""
              src={
                imageSource ??
                "https://placehold.co/450x300/EEE/31343C?font=lato&text=Producto"
              }
              width={450}
              height={300}
            />
          </div>
          <div className="relative flex flex-col items-center gap-2">
            <SearchBarMenu
              search_name="producto"
              data_array={product_list}
              filter_keys={["productName", "productId"]}
              onFilter={setProduct_list_filtered}
            />
            <div className="min-h-full w-full px-10 flex flex-col items-center h-64">
              <ul className="bg-white w-[32rem] border border-gray-300 rounded-md h-full overflow-auto flex flex-col">
                {product_list_filtered.length > 0 ? (
                  product_list_filtered.map((product) => (
                    <li
                      key={product.productId}
                      className="hover:bg-[--color-main-soft] overflow-x-clip w-full"
                    >
                      <button
                        className="w-full"
                        onClick={() => handleProductSelect(product)}
                      >
                        <ProductCardSelect product={product} />
                      </button>
                    </li>
                  ))
                ) : (
                  <span>No hay productos disponibles</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col h-full justify-center grow px-2">
        {/* productos añadidos y total */}
        <div className="flex flex-col justify-center gap-2">
          <div className="border border-gray-300 rounded-md h-[40rem] min-w-96 overflow-auto gap-0 justify-start items-start">
            {products_added.map((productPos) => (
              <ProductCardPOS
                key={productPos.product.productId}
                productPos={productPos}
                removeFromProductsAdded={removeFromProductsAdded}
                changeSubtotalByProductId={changeSubtotalByProductId}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 items-end justify-center px-2">
            <span> Subtotal: {total - total * 0.19}</span>
            <span> IVA: {total * 0.19}</span>
            <span> Total: {total}</span>
          </div>
        </div>
        <CustomerDataFormDialog
          confirmPurchase={confirmPurchase}
          productsAddedLength={products_added.length}
        />
      </section>
    </main>
  );
}

export default RegistroPOS;

function ProductCardSelect({ product }: { product: PRODUCT_FROM_INVENTARY }) {
  return (
    <div className="flex gap-2 justify-around items-center p-4 w-full">
      <div className="">
        <Image
          src={
            product.productImage
          }
          alt={product.productName}
          width={200}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>{product.productName}</span>
        <span>Precio: {product.price}</span>
      </div>
    </div>
  );
}
