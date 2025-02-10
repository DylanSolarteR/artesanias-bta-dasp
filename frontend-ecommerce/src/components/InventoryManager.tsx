"use client";
import { useState, useEffect, useMemo } from "react";
import KPICard from "@/components/KPICard";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { listProductsFromInventoryByLocationId } from "@/api/inventory.api";
import Loading from "@/components/Loading";
import { listCategories } from "@/api/category.api";
import ConsultaProducto from "@/components/ProductInventoryList";
import { decodeToken, LOW_STOCK_THRESHOLD } from "@/util/utils";
import { useAuthContext } from "@/app/context/AuthContext";

function InventoryManager() {
  const [mounted, setMounted] = useState(false);
  const { authToken } = useAuthContext();
  const { locationId } = decodeToken(authToken);

  const [products_table, setProducts_table] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [productsInventory, setProductsInventory] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [categories, setCategories] = useState([]);

  // Function to get all the products from all the inventories
  function getProducts() {
    listProductsFromInventoryByLocationId(locationId).then((data) => {
      setProductsInventory(data);
      if (!mounted) {
        setProducts_table(data);
      }
    });
  }

  // Function to get all the categories
  function getAllCategories() {
    listCategories().then((data) => {
      setCategories(data);
    });
  }

  // Function to retrieve all the initial data
  function retrieveInitialData() {
    getAllCategories();
    getProducts();
  }
  function changeProductInArrays(product: PRODUCT_FROM_INVENTARY) {
    const newProducts_table = products_table.map((product_from_list) => {
      if (
        product_from_list.productId === product.productId &&
        product_from_list.locationId === product.locationId
      ) {
        return product;
      }
      return product_from_list;
    });
    const newProductsGeneral = productsInventory.map((product_from_list) => {
      if (
        product_from_list.productId === product.productId &&
        product_from_list.locationId === product.locationId
      ) {
        return product;
      }
      return product_from_list;
    });
    setProducts_table(newProducts_table);
    setProductsInventory(newProductsGeneral);
  }

  // UseEffect to execute at the beginning
  useEffect(() => {
    retrieveInitialData();
    setMounted(true);
  }, []);

  // UseEffect to retrieve the initial data
  useEffect(() => {
    retrieveInitialData();
    setMounted(true);
  }, []);

  // UseMemo to know how many products are below the threshold
  const productsBelowThreshold: number = useMemo(() => {
    if (!products_table) return 0;
    return products_table.filter(
      (product) => product.ecommerceQuantity < LOW_STOCK_THRESHOLD
    ).length;
  }, [products_table]);

  return mounted ? (
    <div className="container-dashboard">
      <h1 className="">INVENTARIO</h1>
      <section className="zone-count">
        <KPICard title={"Categorías"} value={categories.length} />
        <KPICard title={"Productos"} value={productsInventory.length} />
        <KPICard title={"Bajo stock"} value={productsBelowThreshold} />
      </section>
      <section className="zone-inventary">
        <ConsultaProducto
          products_table={products_table}
          changeProductInArrays={changeProductInArrays}
        />
      </section>
    </div>
  ) : (
    <Loading />
  );
}

export default InventoryManager;
