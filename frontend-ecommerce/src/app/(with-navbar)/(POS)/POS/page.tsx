"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PRODUCT_FROM_INVENTARY,
  POS_ADDED_PRODUCT,
} from "@/types/inventory.types";
import { useAuthContext } from "@/app/context/AuthContext";
import { listProductsFromInventoryByLocationId } from "@/api/inventory.api";
import { decodeToken } from "@/util/utils";
import Bill from "@/app/icons/Bill.svg?url";
import BoxSearch from "@/app/icons/BoxSearch.svg?url";
import toast from "react-hot-toast";
import RegistroPOS from "@/components/POS/RegistroPOS";
import ConsultaPOS from "@/components/POS/ConsultaPOS";

export type PAY_METHOD = "credit_card" | "debit_card" | "cash" | "";

function Page() {
  const [mounted, setMounted] = useState(false);
  const [sidebarPage, setSidebarPage] = useState("register");

  const [product_list, setProduct_list] = useState<PRODUCT_FROM_INVENTARY[]>(
    []
  );
  const [product_list_filtered, setProduct_list_filtered] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [products_added, setProducts_added] = useState<POS_ADDED_PRODUCT[]>([]);
  const [pay_method, setPay_method] = useState<PAY_METHOD>("");
  const [total, setTotal] = useState<number>(0);

  const { authToken } = useAuthContext();
  const user_info = decodeToken(authToken);

  async function initData() {
    const products: PRODUCT_FROM_INVENTARY[] =
      await listProductsFromInventoryByLocationId(user_info.locationId);
    setProduct_list(products);
    setProduct_list_filtered(products);
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
    subtotal: number
  ): void {
    setProducts_added(
      products_added.map((productPos) =>
        productPos.product.productId === productId
          ? { product: productPos.product, subtotal: subtotal }
          : productPos
      )
    );
  }

  function updateTotal() {
    setTotal(
      products_added.reduce((acc, productPos) => acc + productPos.subtotal, 0)
    );
  }

  const handleFocus = () => {
    setIsListVisible(true);
  };
  const handleProductSelect = (product: PRODUCT_FROM_INVENTARY) => {
    console.log("Seleccionaste:", product.productName);
    addToProductsAdded({
      product: product,
      subtotal: product.price,
    });
    setIsListVisible(false); // Oculta la lista al seleccionar un elemento
  };

  const handlePayMethodSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPay_method(e.target.value as PAY_METHOD);
  };

  useEffect(() => {
    updateTotal();
  }, [products_added]);

  useEffect(() => {
    initData();
    setMounted(true);
  }, []);

  return mounted ? (
    <div className="w-screen h-screen">
      <div className="relative flex flex-row w-full h-[54rem] mt-[4.375rem] justify-between text-center items-center">
        <aside className="border-r border-black p-7 flex flex-col gap-20 basis-64 h-full max-w-[25rem]">
          <h1 className="h-fit text-[2.875rem] px-0">MÓDULO DE FACTURACIÓN</h1>
          <div>
            <button
              className="flex items-center gap-2"
              onClick={() => setSidebarPage("register")}
            >
              <Image alt="icono" src={Bill} width={80} height={80} />
              <span className="text-[2.875rem]">Registro productos</span>
            </button>
            <button
              className="flex items-center gap-2"
              onClick={() => setSidebarPage("search")}
            >
              <Image alt="icono" src={BoxSearch} width={80} height={80} />
              <span className="text-[2.875rem]">Consulta productos</span>
            </button>
          </div>
        </aside>
        <main className="basis-128 grow">
          {sidebarPage === "register" && (
            <RegistroPOS
              product_list={product_list}
              product_list_filtered={product_list_filtered}
              setProduct_list_filtered={setProduct_list_filtered}
              isListVisible={isListVisible}
              setIsListVisible={setIsListVisible}
              products_added={products_added}
              total={total}
              handleFocus={handleFocus}
              handleProductSelect={handleProductSelect}
              removeFromProductsAdded={removeFromProductsAdded}
              changeSubtotalByProductId={changeSubtotalByProductId}
              handlePayMethodSelect={handlePayMethodSelect}
            />
          )}
          {sidebarPage === "search" && (
            <ConsultaPOS product_list={product_list} />
          )}
        </main>
      </div>
    </div>
  ) : null;
}

export default Page;
