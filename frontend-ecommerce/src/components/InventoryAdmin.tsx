"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import KPICard from "@/components/KPICard";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import ProductCard from "@/components/ProductCard";
import { listProductsFromAllInventories } from "@/api/inventory.api";
import Loading from "@/components/Loading";
import { listCategories } from "@/api/category.api";
import ConsultaProducto from "@/components/ConsultaProducto";
function InventoryAdmin() {
  const [mounted, setMounted] = useState(false);
  const [searchDisabledPoint, setSearchDisabledPoint] = useState(true);
  const [products_table, setProducts_table] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [productsAllInventories, setProductsAllInventories] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [physicalPoints, setPhysicalPoints] = useState([]);
  const [categories, setCategories] = useState([]);

  // UseEffect to retrieve the initial data
  useEffect(() => {
    retrieveInitialData();
    setMounted(true);
  }, []);

  // Function to get all the products from all the inventories
  function getAllProducts() {
    listProductsFromAllInventories().then((data) => {
      setProductsAllInventories(data);
    });
  }

  // Function to get all the categories
  function getAllCategories() {
    listCategories().then((data) => {
      setCategories(data);
    });
  }

  // Function to reset the products table
  function resetProductsTable() {
    setProducts_table([]);
  }

  // Function to retrieve all the initial data
  function retrieveInitialData() {
    getAllCategories();
    getAllProducts();
  }
  // Function to handle the checkbox change
  function handleCheckboxChange() {
    setSearchDisabledPoint(!searchDisabledPoint);
    if (!searchDisabledPoint) {
      setProductsAllInventories([]);
      resetProductsTable();
      getAllProducts();
    }
    if (searchDisabledPoint) {
      setProductsAllInventories([]);
      resetProductsTable();
    }
  }

  function addToProductsTable(product: PRODUCT_FROM_INVENTARY) {
    setProducts_table([...products_table, product]);
  }
  function deleteFromProductsTable(product: PRODUCT_FROM_INVENTARY) {
    setProducts_table(products_table.filter((item) => product !== item));
  }
  return mounted ? (
    <div className="container-dashboard">
      <h1 className="">INVENTARIO</h1>
      <section className="zone-count">
          <KPICard title={"Puntos físicos"} value={physicalPoints.length} />
          <KPICard title={"Categorías"} value={categories.length} />
          <KPICard title={"Productos"} value={0} />
          <KPICard title={"Alerta bajo stock"} value={0} />
      </section>
      <section className="flex-column">
        <h2>Inventario de cada punto físico</h2>
        <div className="search-product">
        <div className="search">
          <input
            type="text"
            placeholder="Buscar punto físico"
            disabled={searchDisabledPoint}
          />
          <Image src={SearchIcon} alt="search" width={20} height={20} />
        </div>
        <div className="flex-simple">
          <input
            type="checkbox"
            name="allPoints"
            defaultChecked={searchDisabledPoint}
            onChange={() => handleCheckboxChange()}
          />
          <label htmlFor="allPoints">Todos los puntos físicos</label>
        </div>
        </div>
        <div className="zone-physical">
          {productsAllInventories.map((product, index) => (
            <ProductCard
              product={product}
              addToProductsTable={addToProductsTable}
              deleteFromProductsTable={deleteFromProductsTable}
              key={index}
            />
          ))}
        </div>
      </section>
      <section className="zone-inventary">
        <ConsultaProducto products_table={products_table} />
      </section>
    </div>
  ) : (
    <Loading />
  );
}

export default InventoryAdmin;
