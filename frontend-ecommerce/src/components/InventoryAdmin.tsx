"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchIcon from "@/app/icons/searchIcon.png";
import KPICard from "@/components/KPICard";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import ProductCard from "@/components/PhysicalPointCard";
import { listProductsFromAllInventories } from "@/api/inventory.api";
import Loading from "@/components/Loading";
import { listCategories } from "@/api/category.api";
import { listPhysicalLocations } from "@/api/physicalLocation.api";
import ConsultaProducto from "@/components/ConsultaProducto";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
function InventoryAdmin() {
  const [mounted, setMounted] = useState(false);
  const [searchDisabledPoint, setSearchDisabledPoint] = useState(true);
  const [products_table, setProducts_table] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [productsAllInventories, setProductsAllInventories] = useState<
    PRODUCT_FROM_INVENTARY[]
  >([]);
  const [physicalPoints, setPhysicalPoints] = useState<PHYSICAL_LOCATION[]>([]);
  const [categories, setCategories] = useState([]);

  // UseEffect to retrieve the initial data
  useEffect(() => {
    retrieveInitialData();
    // setProducts_table(productsAllInventories);
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

  function getAllPhysicalPoints() {
    listPhysicalLocations().then((data) => {
      setPhysicalPoints(data);
    });
  }

  // Function to reset the products table
  function resetProductsTable() {
    setProducts_table([]);
  }

  // Function to retrieve all the initial data
  function retrieveInitialData() {
    getAllCategories();
    getAllPhysicalPoints();
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
  return mounted ? (
    <div className="m-auto px-36 flex flex-col gap-3">
      <section className="flex flex-col gap-2">
        <h1 className="">Inventario</h1>
        <div className="flex flex-row justify-center">
          <KPICard title={"Puntos físicos"} value={physicalPoints.length} />
          <KPICard title={"Categorías"} value={categories.length} />
          <KPICard title={"Productos"} value={0} />
          <KPICard title={"Productos bajo stock"} value={0} />
        </div>
      </section>
      <section className="flex flex-col">
        <h2>Inventario de cada punto físico</h2>
        <div className="flex flex-row self-end">
          <input
            type="text"
            placeholder="Buscar punto físico"
            disabled={searchDisabledPoint}
          />
          <Image src={SearchIcon} alt="search" width={30} height={30} />
          <input
            type="checkbox"
            name="allPoints"
            defaultChecked={searchDisabledPoint}
            onChange={() => handleCheckboxChange()}
          />
          <label htmlFor="allPoints">Todos los puntos físicos</label>
        </div>
        <div className="flex flex-row justify-center flex-nowrap overflow-x-scroll gap-1">
          {physicalPoints.map((physicalPoint, index) => (
            <ProductCard
              physicalPoint={physicalPoint}
              setProducts_table={setProducts_table}
              key={index}
            />
          ))}
        </div>
      </section>
      <section className="">
        <ConsultaProducto products_table={products_table} />
      </section>
    </div>
  ) : (
    <Loading />
  );
}

export default InventoryAdmin;
