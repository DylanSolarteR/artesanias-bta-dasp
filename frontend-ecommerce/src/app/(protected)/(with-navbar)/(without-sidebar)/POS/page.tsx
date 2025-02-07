"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { useAuthContext } from "@/app/context/AuthContext";
import { listProductsFromInventoryByLocationId } from "@/api/inventory.api";
import { decodeToken } from "@/util/utils";
import Bill from "@/app/icons/Bill.svg?url";
import BoxSearch from "@/app/icons/BoxSearchIcon.svg?url";
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

  const { authToken } = useAuthContext();
  const user_info = decodeToken(authToken);

  async function initData() {
    if (!user_info.locationId) return;
    const products: PRODUCT_FROM_INVENTARY[] =
      await listProductsFromInventoryByLocationId(user_info.locationId);
    // await listProductsFromInventoryByLocationId(2);
    setProduct_list(products);
  }

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
              location_id={user_info.locationId}
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
