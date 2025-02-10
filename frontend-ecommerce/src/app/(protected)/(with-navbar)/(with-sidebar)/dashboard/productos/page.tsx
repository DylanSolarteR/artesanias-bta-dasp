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

  function deleteProduct(id: number) {
    apiProduct.deleteProduct(String(id));
    const newProducts = product_table.filter((product) => product._id !== id);
    setProducts_table(newProducts);
  }

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

  useEffect(() => {
    if (role && !hasPermission(role, "view:products")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : (
    <>
      {hasPermission(role, "view:products") && (
        <ConsultProducts
          products_table={product_table}
          deleteProduct={deleteProduct}
        />
      )}
    </>
  );
}

export default Page;
