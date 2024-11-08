'use client';
import Image from "next/image";
import { ChangeEvent, MouseEvent, MouseEventHandler, Suspense, useEffect, useRef, useState } from "react";
import Grid3Icon from '@/app/icons/Grid3x3Icon.png';
import Grid4Icon from '@/app/icons/Grid4x4Icon.png';
import ArrowDownIcon from '@/app/icons/ArrowDownIcon.png';
import SearchIcon from '@/app/icons/searchIcon.png';
import BagsadIcon from '@/app/icons/BagsadIcon.png'
import { onlyNumberInput } from "@/app/util/utils";
import Link from "next/link";
import * as apiProduct from "@/app/api/product.api";
import * as apiCategory from "@/app/api/category.api";
import "@/app/css/catalog-product.css";


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

  const [gridClass, setGridClass] = useState('grid-3');

  const [categories, setCategories] = useState([
    { name: "Categoría 1", id: 1 },
    { name: "Categoría 2", id: 2 },
    { name: "Categoría 3", id: 3 },
    { name: "Categoría 4", id: 4 }]);

  const [products, setProducts] = useState<{
    imagen: string,
    nombre: string,
    precio: number
  }[]>([])

  useEffect(() => {
    apiProduct.listProducts({ orderBy: ['price', 'desc'], })
      .then(products => {
        setProducts(products)
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
      });
  }, [])

  useEffect(() => {
    apiCategory.listCategories()
      .then(categories => {
        setCategories(categories)

      })
  }, [])

  const [showCategories, setShowCategories] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState('Precio')

  const handleCategoryChange = (e) => {
    if (selectedCategory === e.target.value) {
      e.target.checked = false;
      setSelectedCategory(null)
    }
    else {
      setSelectedCategory(e.target.value)
    }
  }
  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(e.target.value)
  }

  const minPriceRef = useRef(null)
  const maxPriceRef = useRef(null)
  const orderTypeRef = useRef(null)
  const nameProdRef = useRef(null)

  const filterhandle = () => {
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
      maxPrice: maxPriceRef.current.value || null,
      nameProd: nameProdRef.current.value || null
    }).then(p => setProducts(p))
  }

  const [maxHeight, setMaxHeight] = useState('0px'); // Estado para manejar max-height dinámico
  const categoryOptionsRef = useRef(null); // Referencia al contenedor del menú

  useEffect(() => {
    // Función que calcula la altura del contenedor de opciones
    if (categoryOptionsRef.current) {
      setMaxHeight(showCategories ? `${categoryOptionsRef.current.scrollHeight}px` : '0px');
    }
  }, [showCategories]); // Se ejecuta cuando `showCategories` cambia

  return (
    <div className="catalog">
      <main className="main">
        <aside className="filter">
          <h1>Filtros</h1>
          <article className="category">
            <h2 onClick={() => setShowCategories(!showCategories)} style={{ cursor: 'pointer' }}>
              Categorías
              <span className={`arrow-icon ${showCategories ? 'open' : ''}`}>
                <Image src={ArrowDownIcon} alt='Arrow' width={10} height={10} />
              </span>
            </h2>

            <div ref={categoryOptionsRef} // Asigna la referencia al contenedor de opciones
              className={`category-options ${showCategories ? 'open' : ''}`}
              style={{
                maxHeight: maxHeight, // Aplica el maxHeight calculado
              }}>
              {showCategories && categories.map((category, index) => (
                <div key={index}>
                  <input onClick={handleCategoryChange} type="radio" id={`cat${index + 1}`} name="categorias" value={category.id} />
                  <label htmlFor={`cat${index + 1}`} style={{ userSelect: 'none' }}>{category.name}</label>
                </div>
              ))}
            </div>
          </article>

          <article className="price">
            <h2>Precio</h2>
            <input type="input" placeholder="Min" ref={minPriceRef} onKeyDown={onlyNumberInput} /> <p>a</p>
            <input type="input" placeholder="Max" ref={maxPriceRef} onKeyDown={onlyNumberInput} />
          </article>

          <article className="order">
            <h2>Ordenar por</h2>
            <div className="order-by">
              <div className="option">
                <input onChange={handleOrderChange} style={{ userSelect: 'none' }} checked={selectedOrder === 'Precio'} type="radio" id="cat2" name="ordenar-por" value="Precio" />
                <label htmlFor="cat2">Precio</label>
              </div>
              <div className="option">
                <input onChange={handleOrderChange} style={{ userSelect: 'none' }} checked={selectedOrder === 'Nombre'} type="radio" id="cat1" name="ordenar-por" value="Nombre" />
                <label htmlFor="cat1">Nombre</label>
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
          <h1>PRODUCTOS</h1>
          <div className="search">
            <div className="view">
              <Image src={Grid3Icon} alt='Grid3' width={35} height={35} onClick={() => setGridClass('grid-3')}
                style={{ cursor: 'pointer' }} />
              <Image src={Grid4Icon} alt='Grid4' width={35} height={35} onClick={() => setGridClass('grid-4')}
                style={{ cursor: 'pointer' }} />
            </div>
            <div className="search-product">
              <input type="input" placeholder="Buscar" ref={nameProdRef} />
              <Image src={SearchIcon} alt='Search' width={30} height={25} onClick={() => filterhandle}
                style={{ cursor: 'pointer' }} />
            </div>
          </div>


          <Suspense fallback={<div>Loading...</div>}>
            {products.length === 0 ? (
              <div className="empty-message">
                <Image src={BagsadIcon} alt="Nothing" width={100} height={100} />
                <p>Lo sentimos, no se encuentra ese producto en este momento.</p>
              </div>
            ) : (
              <div className={`list-product ${gridClass}`}>
                {products.map((product, index) => (
                  <article key={index}>
                    <div className="img">
                      <Link href={`/producto/${index}`}>
                        <Image src={product.imagen} alt={product.nombre} height={150} width={150} />
                      </Link>
                    </div>
                    <div className="details">
                      <h2>{product.nombre}</h2>
                      <p>${product.precio}</p>
                    </div>
                    <Link href={`/producto/${index}`} passHref>
                      <div className="overlay">- Ver detalles -</div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </Suspense>
        </section>
      </main>
    </div>
  );
}
