"use client";
import Image from "next/image";
import { useEffect, Suspense, useState } from "react";
import CeramicsImage from "@/app/Images/Ceramics.png";
import DefaultImage from "@/app/Images/Default.jpg";
import * as apiProduct from "@/api/product.api";
import * as apiCategory from "@/api/category.api";

import "@/app/css/Landing-page.css";
import CategCard from "@/components/CategCard";

import Loading from "@/components/Loading";
import Catalog from "@/components/Catalog";
import Map from "@/components/Map";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import Navbar from "@/components/Navbar";

export interface PRODUCT {
  id: number;
  imagen: string;
  nombre: string;
  precio: number;
}

function scrollLeft() {
  const track = document.getElementById("track");
  track.scrollBy({ left: -track.offsetWidth, behavior: "smooth" });
}

function scrollRight() {
  const track = document.getElementById("track");
  track.scrollBy({ left: track.offsetWidth, behavior: "smooth" });
}

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState<PRODUCT[]>([]);
  const [reveal, setReveal] = useState(false);
  const render = (status: Status) => <h1>{status}</h1>;

  useEffect(() => {
    apiProduct
      .listProducts({ orderBy: ["price", "desc"] })
      .then((products) => {
        setProducts(products.slice(1, 7));
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  useEffect(() => {
    // Activa la animación después de montar el componente
    setTimeout(() => setReveal(true), 1000);
  }, []);

  useEffect(() => {
    apiCategory.listCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div className="flex-column">
      <Navbar />
      <header className="header">
        <div className="overlay-f">
          <h1 className="title">ARTESANÍAS BOGOTÁ LDTA</h1>
          <h1 className="subtitle">Tradición colombiana en cada detalle</h1>
        </div>
        <div className="shape">
          <svg viewBox="0 0 1500 200">
            <path d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
          </svg>
        </div>
      </header>

      <section className="section-presentation">
        <Image
          src={CeramicsImage}
          alt="Icono de carrito"
          width={70}
          height={70}
        />
        <p className="mb-0">
          Empresa dedicada a la comercialización de productos artesanales
          colombianos, destacando la riqueza cultural y las tradiciones de las
          diferentes regiones del país.
        </p>
      </section>

      <section className="section-categories">
        <h1 className="section-title text-center">Categorías</h1>
        <p className="mb-0">
          Empresa dedicada a la comercialización de productos artesanales
          colombianos, destacando la riqueza cultural y las tradiciones de las
          diferentes regiones del país.
        </p>
        <div className="carousel">
          <button className="arrow left" onClick={() => scrollLeft()}>
            &#8592;
          </button>
          <div className="carousel-track" id="track">
            {categories.map((category, index) => (
              <div className="carousel-item" key={index}>
                <CategCard
                  title={category.name}
                  backImg={DefaultImage}
                  link={`/catalogo`}
                />
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={() => scrollRight()}>
            &#8594;
          </button>
        </div>
      </section>

      <section className="section-products">
        <h1 className="section-title text-center">- Productos Populares -</h1>
        <p className="mb-0">
          Empresa dedicada a la comercialización de productos artesanales
          colombianos, destacando la riqueza cultural y las tradiciones de las
          diferentes regiones del país.
        </p>
        <Suspense fallback={<Loading />}>
          {<Catalog products={products} />}
        </Suspense>
        <button id="button-standard">Mira todo nuestro catálogo</button>
      </section>

      <section className="section-maps">
        <h1 className="section-title text-center">
          - Conoce nuestras tiendas -
        </h1>
        <p className="mb-0">
          Empresa dedicada a la comercialización de productos artesanales
          colombianos, destacando la riqueza cultural y las tradiciones de las
          diferentes regiones del país.
        </p>
        <Suspense fallback={<Loading />}>
          <section className="mapa">
            <div id="gmap">
              <Wrapper apiKey={"API_KEY"} render={render}>
                <Map />
              </Wrapper>
            </div>
          </section>
        </Suspense>
      </section>

      <section id="contact" className="section has-img-bg pb-0">
        <div className="container-f">
          <div className="row align-items-center">
            <div className="col-md-5 my-3">
              <h6 className="mb-0">Teléfono</h6>
              <p className="mb-4">+57 123</p>

              <h6 className="mb-0">Dirección</h6>
              <p className="mb-4">Carrera 8 # 40 - 62</p>

              <h6 className="mb-0">Correo Electrónico</h6>
              <p className="mb-0">info@artesaniasbogota.shop</p>
              <p></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
