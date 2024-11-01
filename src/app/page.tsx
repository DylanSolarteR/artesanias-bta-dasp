'use client';
import Image from "next/image";
import { Suspense } from "react";
import { KeyboardEvent } from "react";

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

  const onlyNumberInput = (e: KeyboardEvent) => {if(!/[0-9]|Delete|Backspace|ArrowLeft|ArrowRight/i.test(e.key)){e.preventDefault()}};

  return (
    <div className="next.svg">
      <main className="next.svg">
        <aside>
          <h1>Filtros</h1>
          <article>
            <h2>Categorias</h2>
            <input type="radio" id="cat1" name="categorias" placeholder="Categoria 1" value={"Categoria 1"} />
            <label htmlFor="cat1">Categoria 1</label>
            <input type="radio" id="cat2" name="categorias" placeholder="Categoria 2" value={"Categoria 2"} />
            <label htmlFor="cat2">Categoria 2</label>
            <input type="radio" id="cat3" name="categorias" placeholder="Categoria 3" value={"Categoria 3"} />
            <label htmlFor="cat3">Categoria 3</label>
            <input type="radio" id="cat4" name="categorias" placeholder="Categoria 4" value={"Categoria 4"} />
            <label htmlFor="cat4">Categoria 4</label>
          </article>

          <article>
            <h2>Precio</h2>
            <input type="input" placeholder="Min" onKeyDown={onlyNumberInput}/> <p>-</p>
            <input type="input" placeholder="Max" onKeyDown={onlyNumberInput}/>
          </article>

          <article>
            <h2>Ordenar por</h2>
            <input type="radio" id="cat1" name="ordenar-por" placeholder="Nombre" value={"Nombre"} />
            <label htmlFor="cat1">Nombre</label>
            <input type="radio" id="cat2" name="ordenar-por" placeholder="Precio" value={"Precio"} />
            <label htmlFor="cat2">Precio</label>
            <select>
              <option hidden></option>
              <option>Ascendente</option>
              <option>Descendente</option>
            </select>
          </article>

          <button>Filtrar</button>
        </aside>
        <section>
          <h1>Productos</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <div>
              {products.map((product, index) => (
                <article key={index}>
                  <Image src={product.imagen} alt={product.nombre} height={150} width={150} />
                  <h2>{product.nombre}</h2>
                  <p>{product.precio}</p>
                  <button>Añadir al carrito</button>
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
