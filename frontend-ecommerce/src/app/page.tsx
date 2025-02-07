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
import { listPhysicalLocations } from "@/api/physicalLocation.api";
import Navbar from "@/components/Navbar";

export interface PRODUCT {
  id: number;
  imagen: string;
  nombre: string;
  precio: number;
}

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const center = { lat: 4.60971, lng: -74.08175 };
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    listPhysicalLocations().then((data) => {
      const transformedMarkers: Marker[] = data.map((location) => ({
        position: {
          lat: Number(location.latitude),
          lng: Number(location.longitude),
        },
        title: `${location.address}`,
      }));

      setMarkers((prevMarkers) => [...prevMarkers, ...transformedMarkers]);
    });
  }, []);

  useEffect(() => {
    apiProduct
      .listProducts({
        orderBy: ["price", "desc"],
        limit: 6,
      })
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

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    apiProduct
      .listProducts({
        orderBy: ["price", "desc"],
        category: selectedCategory,
        limit: 4,
      })
      .then((products) => {
        console.log(products);
        setCategoryProducts(products.slice(1, 4));
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  };

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
              <div
                className="carousel-item"
                key={index}
                onClick={() => handleCategorySelect(category.id)}
                style={{ cursor: "pointer" }}
              >
                <CategCard title={category.name} backImg={DefaultImage} />
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={() => scrollRight()}>
            &#8594;
          </button>
        </div>
      </section>

      {/*{selectedCategory && (
        <section className="category-products-section">
          <h1 className="section-title text-center">
            - Productos de {selectedCategory.name} -
          </h1>
          <p>Estos son los productos de la categoría {selectedCategory.name}.</p>
          <div className="products-grid">
            {categoryProducts.map((product) => (
              <div key={product.id} className="product-card">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}*/}

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
        <div>
          <Map
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            center={center}
            zoom={12}
            markers={markers}
          />
        </div>
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
