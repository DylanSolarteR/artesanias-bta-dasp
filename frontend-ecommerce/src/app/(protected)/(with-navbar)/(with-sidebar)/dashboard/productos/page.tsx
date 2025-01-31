"use client";
import { useState, useEffect } from "react";
import { useMainContext } from "@/app/context/MainContext";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/util/RolePermissions";
import { PRODUCT } from "@/types/product.types";
import ConsultProducts from "@/components/TableConsult/consultProducts";
import Loading from "@/components/Loading";
import * as apiProduct from "@/api/product.api";

function Page() {
  const { role } = useMainContext();
  const router = useRouter();

  const [product_table, setProducts_table] = useState<PRODUCT[]>([]);

  useEffect(() => {
      apiProduct
        .getlistProducts({ orderBy: ["price", "desc"] })
        .then((products) => {
            setProducts_table(products);
        })
        .catch((error) => {
          console.error("Error al obtener productos:", error);
        });
    }, []);

  return !role ? (
    <Loading />
  ) : (
    <>
      {!hasPermission(role, "view:products") ? (
        router.push("/POS")
      ) : (
        <>
          <ConsultProducts products_table={product_table} />
        </>
      )}
    </>
  );
}

export default Page;