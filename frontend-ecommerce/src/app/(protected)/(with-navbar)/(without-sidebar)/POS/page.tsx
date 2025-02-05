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
import BoxSearch from "@/app/icons/BoxSearchIcon.svg?url";
import toast from "react-hot-toast";
import RegistroPOS from "@/components/POS/RegisterPOS";
import ConsultaPOS from "@/components/POS/ConsultPOS";
import "@/app/css/POS.css";

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

  const [imageSource, setImageSource] = useState<string>(
    "https://placehold.co/450x300/EEE/31343C?font=lato&text=NoImage"
  );

  const { authToken } = useAuthContext();
  const user_info = decodeToken(authToken);

  async function initData() {
    if (!user_info.locationId) return;
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
    setImageSource(product.product_image);
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
    <div className="container">
      <div className="container-pos">
        <aside className="filter">
          <h1 className="h-fit text-[2.875rem] px-0">MÓDULO DE FACTURACIÓN</h1>
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center gap-4"
              onClick={() => setSidebarPage("register")}
            >
              <Image alt="icono" src={Bill} width={80} height={80} />
              <span className="text-[2.875rem]">Registrar productos</span>
            </button>
            <button
              className="flex items-center gap-4"
              onClick={() => setSidebarPage("search")}
            >
              <Image alt="icono" src={BoxSearch} width={80} height={80} />
              <span className="text-[2.875rem]">Consulta productos</span>
            </button>
          </div>
        </aside>
        <main className="basis-128 grow min-h-[54rem] h-full">
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
              payMethod={pay_method}
              handlePayMethodSelect={handlePayMethodSelect}
              imageSource={imageSource}
            />
          )}
          {sidebarPage === "search" && (
            <div className="h-[54rem]">
              <ConsultaPOS product_list={product_list} />
            </div>
          )}
        </main>
      </div>
    </div>
  ) : null;
}

export default Page;
