"use client";
import Link from "next/link";
import Image from "next/image";
import BackwardArrowIcon from "@/app/icons/BackwardArrowIcon.svg?url";
import Example from '@/app/icons/BagsadIcon.png';
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { onlyNumberInput } from "@/app/util/utils";
import PlusIcon from "@/app/icons/PlusIcon.svg?url";
import MinusIcon from "@/app/icons/MinusIcon.svg?url";
import "@/app/css/Detail-product.css";

function producto() {
  const [ready, setReady] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<{
    nombre: string;
    precio: number;
    descripcion: string;
    ref: string;
    categoria: string;
    stock: number;
    imagen: string;
  }>();
  const [cantidad, setCantidad] = useState<any>(0);
  const aumentarCantidad = () => {
    if (producto.stock === 0) return;
    if (cantidad >= producto?.stock) {
      setCantidad(producto?.stock);
      return;
    }
    setCantidad(cantidad + 1);
  };
  const disminuirCantidad = () => {
    if (producto.stock === 0) return;
    if (cantidad <= 1) {
      setCantidad(1);
      return;
    }
    setCantidad(cantidad - 1);
  };

  const mockProducto = {
    id: id,
    nombre: "Producto 1",
    precio: 100,
    descripcion: "Descripcion del producto 1",
    imagen: "../next.svg",
    ref: "REF-001",
    categoria: "Categoria 1",
    stock: 20,
  };
  useEffect(() => {
    //Añadir el fetch aca
    setProducto(mockProducto);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      producto.stock > 0 ? setCantidad(1) : setCantidad(0);
    }
  }, [ready]);

  return (
    ready && (
      <div className="container">
        <main className="main-detail">
          <div className="return">
            <Link href={"/"}>
              <Image src={BackwardArrowIcon} alt={"ArrowReturn"} height={30} width={30} />
            </Link>
            <Link href={"/"}>Seguir mirando productos</Link>
          </div>
          <section className="details-product">
            <div className="image-product">
            <Image src={Example} alt={""} height={500} width={500} />
              {/*
              <Image
                src={producto?.imagen ?? ""}
                alt={producto?.nombre ?? ""}
                height={1000}
                width={700}
              />*/}
            </div>
            <div className="detail-product">
              <h1>{producto?.nombre ?? "Por asignar "}</h1>
              <h2>{"Precio: $" + producto?.precio ?? "Por asignar"}</h2>
              <h3>Descripción del producto</h3>
              <p>{producto?.descripcion ?? "Por asignar"}</p>
              <p>{"Referencia: " + producto?.ref ?? "Por asignar"}</p>
              <p>{"Categoría: " + producto?.categoria ?? "Por asignar"}</p>
              <p>{"Cantidad disponible: " + producto?.stock ?? "Por asignar"}</p>
            </div>
          </section>
          <div className="cantProduct">
            {/* Aquí va la cantidad de productos, con posibilidad de aumentar y disminuir*/}
            {/*Boton más*/}
            <button onClick={() => aumentarCantidad()}>
              <Image
                src={PlusIcon}
                alt="Aumentar cantidad del producto"
                width={20}
                height={20}
              />
            </button>
            {/*Input cantidad*/}
            <input
              type="input"
              onKeyDown={onlyNumberInput}
              disabled={producto?.stock === 0}
              value={cantidad}
              onBlur={() => {
                if (cantidad === "") {
                  setCantidad(1);
                }
              }}
              onChange={(e) => {
                if (e.target.value === "") {
                  setCantidad("");
                  return;
                }
                if (parseInt(e.target.value) <= 0) {
                  // cuando el input es 0, cambia a 1
                  setCantidad(1);
                  return;
                }

                if (parseInt(e.target.value) > producto?.stock) {
                  setCantidad(producto?.stock);
                  return;
                }
                setCantidad(parseInt(e.target.value));
              }}
            />
            {/*Boton menos*/}
            <button onClick={() => disminuirCantidad()}>
              <Image
                src={MinusIcon}
                alt="Disminuir cantidad del producto"
                width={20}
                height={20}
              />
            </button>
          </div>
          <button className="buttonCart">Añadir al carrito</button>
        </main>
      </div>
    )
  );
}

export default producto;
