"use client";
import Image from "next/image";
import { ChangeEvent, Suspense, useEffect, useRef, useState } from "react";
import Grid3Icon from "@/app/icons/Grid3x3.png";
import Grid4Icon from "@/app/icons/Grid4x4.png";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon.png";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import { onlyNumberInput } from "@/util/utils";
import * as apiProduct from "@/api/product.api";
import * as apiCategory from "@/api/category.api";
import "@/app/css/Catalog-product.css";
import Loading from "@/components/Loading";
import { useMainContext } from "@/app/context/MainContext";
import Catalog from "@/components/Catalog";

export interface PRODUCT {
  id: number;
  imagen: string;
  nombre: string;
  precio: number;
}

export default function Home() {
  const { gridClass, setGridClass } = useMainContext();

  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState<PRODUCT[]>([]);

  useEffect(() => {
    apiProduct
      .listProducts({ orderBy: ["price", "desc"] })
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  useEffect(() => {
    apiCategory.listCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const [showCategories, setShowCategories] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState("Precio");

  const handleCategoryChange = (e) => {
    if (selectedCategory === e.target.value) {
      e.target.checked = false;
      setSelectedCategory(null);
    } else {
      setSelectedCategory(e.target.value);
    }
  };
  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(e.target.value);
  };

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const orderTypeRef = useRef(null);
  const nameProdRef = useRef(null);

  const filterhandle = () => {
    // console.log("filtrando");
    apiProduct
      .listProducts({
        orderBy: [
          selectedOrder === "Precio" ? "price" : "name",
          orderTypeRef.current.selectedOptions[0].value,
        ],
        category: selectedCategory,
        minPrice: minPriceRef.current.value || null,
        maxPrice: maxPriceRef.current.value || null,
        nameProd: nameProdRef.current.value || null,
      })
      .then((p) => setProducts(p));
  };

  const [maxHeight, setMaxHeight] = useState("0px"); // Estado para manejar max-height dinámico
  const categoryOptionsRef = useRef(null); // Referencia al contenedor del menú

  useEffect(() => {
    // Función que calcula la altura del contenedor de opciones
    if (categoryOptionsRef.current) {
      setMaxHeight(
        showCategories ? `${categoryOptionsRef.current.scrollHeight}px` : "0px"
      );
    }
  }, [showCategories]); // Se ejecuta cuando `showCategories` cambia

  return (
    <div className="container">
      <main className="flex-simple">
        <aside className="filter">
          <h2>Filtros</h2>
          <article className="category">
            <h2
              className="flex-space-between"
              onClick={() => setShowCategories(!showCategories)}
              style={{ cursor: "pointer" }}
            >
              Categorías
              <span
                className={`arrow-icon ${showCategories ? "open" : "close"}`}
              >
                <Image src={ArrowDownIcon} alt="Arrow" />
              </span>
            </h2>

            <div
              ref={categoryOptionsRef} // Asigna la referencia al contenedor de opciones
              className={`category-options ${
                showCategories ? "open" : "close"
              }`}
              style={{
                maxHeight: maxHeight, // Aplica el maxHeight calculado
              }}
            >
              {showCategories &&
                categories.map((category, index) => (
                  <div key={index}>
                    <input
                      onClick={handleCategoryChange}
                      type="radio"
                      id={`cat${index + 1}`}
                      name="categorias"
                      value={category.id}
                    />
                    <label
                      htmlFor={`cat${index + 1}`}
                      style={{ userSelect: "none" }}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
            </div>
          </article>

          <article className="price">
            <h2>Precio</h2>
            <input
              className="input-standard"
              type="input"
              placeholder="Min"
              ref={minPriceRef}
              onKeyDown={onlyNumberInput}
            />{" "}
            <p>a</p>
            <input
              className="input-standard"
              type="input"
              placeholder="Max"
              ref={maxPriceRef}
              onKeyDown={onlyNumberInput}
            />
          </article>

          <article className="order">
            <h2>Ordenar por</h2>
            <div className="order-by">
              <div className="option">
                <input
                  onChange={handleOrderChange}
                  style={{ userSelect: "none" }}
                  checked={selectedOrder === "Precio"}
                  type="radio"
                  id="cat2"
                  name="ordenar-por"
                  value="Precio"
                />
                <label htmlFor="cat2">Precio</label>
              </div>
              <div className="option">
                <input
                  onChange={handleOrderChange}
                  style={{ userSelect: "none" }}
                  checked={selectedOrder === "Nombre"}
                  type="radio"
                  id="cat1"
                  name="ordenar-por"
                  value="Nombre"
                />
                <label htmlFor="cat1">Nombre</label>
              </div>
            </div>
            <select ref={orderTypeRef} defaultValue={"desc"}>
              <option hidden></option>
              <option value={"asc"}>Ascendente</option>
              <option value={"desc"}>Descendente</option>
            </select>
          </article>

          <button id="button-standard" onClick={filterhandle}>
            Filtrar
          </button>
        </aside>

        <section className="content">
          <h1>PRODUCTOS</h1>
          <div className="search-product">
            <div className="view">
              <Image
                src={Grid3Icon}
                alt="Grid3"
                width={48}
                height={48}
                onClick={() => setGridClass("grid-3")}
                className={gridClass === "grid-3" ? "icon active" : "icon"}
                style={{
                  cursor: "pointer",
                  maxWidth: "40px",
                  maxHeight: "40px",
                  objectFit: "contain",
                }}
              />
              <Image
                src={Grid4Icon}
                alt="Grid4"
                width={48}
                height={48}
                onClick={() => setGridClass("grid-4")}
                className={gridClass === "grid-4" ? "icon active" : "icon"}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="search">
              <input type="input" placeholder="Buscar" ref={nameProdRef} />
              <Image
                src={SearchIcon}
                alt="Search"
                width={20}
                height={20}
                onClick={filterhandle}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <Suspense fallback={<Loading />}>
            {<Catalog products={products} />}
          </Suspense>
        </section>
      </main>
    </div>
  );
}
