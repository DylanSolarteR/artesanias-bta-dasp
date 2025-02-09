"use client";
import { useState, useEffect, useMemo } from "react";
import KPICard from "@/components/KPICard";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { listProductsFromAllInventories } from "@/api/inventory.api";
import Loading from "@/components/Loading";
import { listCategories } from "@/api/category.api";
import { listPhysicalLocations } from "@/api/physicalLocation.api";
import ConsultaProducto from "@/components/ProductInventoryList";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import PhysicalPointCard from "@/components/PhysicalPointCard";
import { LOW_STOCK_THRESHOLD } from "@/util/utils";
function InventoryAdmin() {
  const [mounted, setMounted] = useState(false);
  const [searchCheckedPoint, setSearchCheckedPoint] = useState(true);
  const [products_table, setProducts_table] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [productsAllInventories, setProductsAllInventories] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [physicalPoints, setPhysicalPoints] = useState<PHYSICAL_LOCATION[]>([]);
  const [categories, setCategories] = useState([]);

  // Function to get all the products from all the inventories
  function getAllProducts() {
    listProductsFromAllInventories().then((data) => {
      setProductsAllInventories(data);
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

  function getAllPhysicalPoints() {
    listPhysicalLocations().then((data) => {
      setPhysicalPoints(data);
    });
  }

  // Function to reset the products table
  function resetProductsTable() {
    setProducts_table(productsAllInventories);
  }

  function clearProductsTable() {
    setProducts_table([]);
  }

  function addToProductsTable(products: PRODUCT_FROM_INVENTARY[]) {
    setProducts_table([...products_table, ...products]);
  }

  function deleteFromProductsTable(locationId: number) {
    setProducts_table(
      products_table.filter((product) => product.locationId !== locationId)
    );
  }

  // Function to retrieve all the initial data
  function retrieveInitialData() {
    getAllCategories();
    getAllPhysicalPoints();
    getAllProducts();
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
    const newProductsGeneral = productsAllInventories.map(
      (product_from_list) => {
        if (
          product_from_list.productId === product.productId &&
          product_from_list.locationId === product.locationId
        ) {
          return product;
        }
        return product_from_list;
      }
    );
    setProducts_table(newProducts_table);
    setProductsAllInventories(newProductsGeneral);
  }

  // UseEffect to execute at the beginning
  useEffect(() => {
    retrieveInitialData();
    setMounted(true);
  }, []);

  // Function to handle the checkbox change
  function handleCheckboxChange() {
    if (searchCheckedPoint) {
      clearProductsTable();
    }
    if (!searchCheckedPoint) {
      resetProductsTable();
    }
    setSearchCheckedPoint(!searchCheckedPoint);
  }

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
        <KPICard title={"Puntos físicos"} value={physicalPoints.length} />
        <KPICard title={"Categorías"} value={categories.length} />
        <KPICard
          title={"Productos"}
          value={
            searchCheckedPoint
              ? productsAllInventories.length
              : products_table.length
          }
        />
        <KPICard title={"Bajo stock"} value={productsBelowThreshold} />
      </section>
      <section className="flex-column">
        <h2>Inventario de cada punto físico</h2>
        <div className="search-product">
          <div className="search"></div>
          <div className="flex-simple">
            <input
              type="checkbox"
              name="allPoints"
              defaultChecked={searchCheckedPoint}
              onChange={() => handleCheckboxChange()}
            />
            <label htmlFor="allPoints">Todos los puntos físicos</label>
          </div>
        </div>
        <div className="zone-physical">
          {physicalPoints.map((physicalPoint, index) => (
            <PhysicalPointCard
              physicalPoint={physicalPoint}
              addToProductsTable={addToProductsTable}
              deleteFromProductsTable={deleteFromProductsTable}
              disabledCheck={searchCheckedPoint}
              key={index}
            />
          ))}
        </div>
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

export default InventoryAdmin;
