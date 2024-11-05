'use client';
import Image from "next/image";
import { ChangeEvent, MouseEvent, MouseEventHandler, Suspense, useEffect, useRef, useState } from "react";
import CircleIcon from '@/app/icons/CircleIcon.svg';
import ArrowDownIcon from '@/app/icons/ArrowDownIcon.svg';
import { onlyNumberInput } from "@/app/util/utils";
import Link from "next/link";
import * as apiProduct from "@/app/api/product.api";
import * as apiCategory from "@/app/api/category.api";

export default function Home() {

  // const products = [
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 1",
  //     precio: 10000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 2",
  //     precio: 20000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 3",
  //     precio: 30000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 4",
  //     precio: 40000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 5",
  //     precio: 50000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 6",
  //     precio: 60000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 7",
  //     precio: 70000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 8",
  //     precio: 80000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 9",
  //     precio: 90000
  //   },
  //   {
  //     imagen: "next.svg",
  //     nombre: "Producto 10",
  //     precio: 100000
  //   },
  // ]

  const [categories, setCategories] = useState([
    {name: "Categoría 1", id: 1},
    {name: "Categoría 2", id: 2},
    {name: "Categoría 3", id: 3},
    {name: "Categoría 4", id: 4}]);

  const [products, setProducts] = useState<{
        imagen: string,
        nombre: string,
        precio: number
      }[]>([])

  useEffect(() =>{
    apiProduct.listProducts({orderBy: ['price', 'desc'], })
      .then(products => {
        setProducts(products)
      })
  }, [])

  useEffect(() =>{
    apiCategory.listCategories()
      .then(categories => {
        setCategories(categories)
      })
  }, [])

  const [showCategories, setShowCategories] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState('Precio')

  const handleCategoryChange = (e) =>{
    if(selectedCategory === e.target.value){
      e.target.checked = false;
      setSelectedCategory(null)
    }
    else{
      setSelectedCategory(e.target.value)
    }
  }
  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setSelectedOrder(e.target.value)
  }
  
  const minPriceRef = useRef(null)
  const maxPriceRef = useRef(null)
  const orderTypeRef = useRef(null)
  
  const filterhandle = () =>{
    console.log({
      orderBy: [
        selectedOrder === 'Precio' ? 'price' : 'name',
        orderTypeRef.current.selectedOptions[0].value
      ],
      category: selectedCategory,
      minPrice: minPriceRef.current.value || null,
      maxPrice: maxPriceRef.current.value || null
    })
    apiProduct.listProducts({
      orderBy: [
        selectedOrder === 'Precio' ? 'price' : 'name',
        orderTypeRef.current.selectedOptions[0].value
      ],
      category: selectedCategory,
      minPrice: minPriceRef.current.value || null,
      maxPrice: maxPriceRef.current.value || null
    }).then( p => setProducts(p))
  }


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
                    <input onClick={handleCategoryChange} type="radio" id={`cat${index + 1}`} name="categorias" value={category.id} />
                    <label htmlFor={`cat${index + 1}`} style={{userSelect: 'none'}}>{category.name}</label>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="price">
            <h2><CircleIcon />Precio</h2>
            <input type="input" placeholder="Min" ref={minPriceRef} onKeyDown={onlyNumberInput} /> <p>a</p>
            <input type="input" placeholder="Max" ref={maxPriceRef} onKeyDown={onlyNumberInput} />
          </article>

          <article>
            <h2><CircleIcon />Ordenar por</h2>
            <div className="order-by">
              <div className="option">
                <input onChange={handleOrderChange} style={{userSelect: 'none'}} checked={selectedOrder === 'Precio'} type="radio" id="cat2" name="ordenar-por" value="Precio" />
                <label htmlFor="cat2">Precio</label>
              </div>
              <div className="option">
                <input onChange={handleOrderChange} style={{userSelect: 'none'}} checked={selectedOrder === 'Nombre'}  type="radio" id="cat1" name="ordenar-por" value="Nombre" />
                <label  htmlFor="cat1">Nombre</label>
              </div>
            </div>
            <select ref={orderTypeRef}>
              <option hidden></option>
              <option value={'asc'}>Ascendente</option>
              <option value={'desc'} selected>Descendente</option>
            </select>
          </article>

          <button onClick={filterhandle}>Filtrar</button>
        </aside>
        <section className="content">
          <h1>Productos</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="list-product">
              {products.map((product, index) => (
                <article key={index}>
                  <div className="img">
                  <Link href={`/producto/${index}`}><Image src={product.imagen} alt={product.nombre} height={150} width={150} /></Link>
                  </div>
                  <div className="details">
                    <Link href={`/producto/${index}`}><h2>{product.nombre}</h2></Link>
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
