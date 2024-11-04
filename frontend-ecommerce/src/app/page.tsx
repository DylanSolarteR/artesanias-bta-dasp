'use client';
import Image from "next/image";
import { Suspense, useState } from "react";
import { KeyboardEvent } from "react";
import CircleIcon from '@/app/icons/CircleIcon.svg';
import ArrowDownIcon from '@/app/icons/ArrowDownIcon.svg';

export default function Home() {

  const products = [
    {
      imagen: "next.svg",
      nombre: "Producto 1",
      precio: 10000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 2",
      precio: 20000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 3",
      precio: 30000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 4",
      precio: 40000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 5",
      precio: 50000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 6",
      precio: 60000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 7",
      precio: 70000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 8",
      precio: 80000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 9",
      precio: 90000
    },
    {
      imagen: "next.svg",
      nombre: "Producto 10",
      precio: 100000
    },
  ]

  const [showCategories, setShowCategories] = useState(false);

  const categories = ["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4"];

  const onlyNumberInput = (e: KeyboardEvent) => { if (!/[0-9]|Delete|Backspace|ArrowLeft|ArrowRight/i.test(e.key)) { e.preventDefault() } };

  return (
    <div className="catalog">
      <main className="main">
        <aside className="filter">
          <h1>Filtros</h1>
          <article>
            <h2 onClick={() => setShowCategories(!showCategories)} style={{ cursor: 'pointer' }}>
              <CircleIcon /> Categorías <ArrowDownIcon/>
            </h2>

            {showCategories && (
              <div className="category-options">
                {categories.map((category, index) => (
                  <div key={index}>
                    <input type="radio" id={`cat${index + 1}`} name="categorias" value={category} />
                    <label htmlFor={`cat${index + 1}`}>{category}</label>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="price">
            <h2><CircleIcon />Precio</h2>
            <input type="input" placeholder="Min" onKeyDown={onlyNumberInput} /> <p>a</p>
            <input type="input" placeholder="Max" onKeyDown={onlyNumberInput} />
          </article>

          <article>
            <h2><CircleIcon />Ordenar por</h2>
            <div className="order-by">
              <div className="option">
                <input type="radio" id="cat1" name="ordenar-por" value="Nombre" />
                <label htmlFor="cat1">Nombre</label>
              </div>
              <div className="option">
                <input type="radio" id="cat2" name="ordenar-por" value="Precio" />
                <label htmlFor="cat2">Precio</label>
              </div>
            </div>
            <select>
              <option hidden></option>
              <option>Ascendente</option>
              <option>Descendente</option>
            </select>
          </article>

          <button>Filtrar</button>
        </aside>
        <section className="content">
          <h1>Productos</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="list-product">
              {products.map((product, index) => (
                <article key={index}>
                  <div className="img">
                    <Image src={product.imagen} alt={product.nombre} height={150} width={150} />
                  </div>
                  <div className="details">
                    <h2>{product.nombre}</h2>
                    <p>$ {product.precio}</p>
                    <button>Añadir al carrito</button>
                  </div>
                </article>
              ))
              }
            </div>
          </Suspense>
        </section>
      </main>
    </div>
  );
}
