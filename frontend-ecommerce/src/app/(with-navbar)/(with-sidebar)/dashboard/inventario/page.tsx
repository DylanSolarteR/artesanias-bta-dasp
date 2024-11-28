"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchIcon from "@/app/icons/searchIcon.png";
import KPICard from "@/components/KPICard";
import { PRODUCTO_INV } from "@/app/(with-navbar)/(with-sidebar)/dashboard/inventario/types";
import ProductCard from "@/components/ProductCard";
function page() {
  const [mounted, setMounted] = useState(false);
  const [searchDisabledPoint, setSearchDisabledPoint] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <h1>Inventario</h1>
      <section>
        <KPICard title={"Puntos físicos"} value={0} />
        <KPICard title={"Categorías"} value={0} />
        <KPICard title={"Productos"} value={0} />
        <KPICard title={"Productos bajo stock"} value={0} />
      </section>
      <section>
        <h2>Inventario de cada punto físico</h2>
        <div>
          <input
            type="text"
            placeholder="Buscar punto físico"
            disabled={searchDisabledPoint}
          />
          <Image src={SearchIcon} alt="search" width={30} height={30} />
          <input
            type="checkbox"
            name="allPoints"
            onChange={() => setSearchDisabledPoint(!searchDisabledPoint)}
          />
          <label htmlFor="allPoints">Todos los puntos físicos</label>
        </div>
        <div>
          {/* <ProductCard title={} stock={} image={}/> */}
          <button>{">"}</button>
        </div>
      </section>
      <section>{/* <ConsultaProducto products_table={}/> */}</section>
    </div>
  );
}

export default page;
