"use client";
import Link from "next/link";
import Image from "next/image";
import BackwardArrowIcon from "@/app/icons/BackwardArrowIcon.svg?url";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { onlyNumberInput } from "@/util/utils";
import PlusIcon from "@/app/icons/PlusIcon.png";
import MinusIcon from "@/app/icons/MinusIcon.png";
import Loading from "@/components/Loading";
import { getProductById, PRODUCT } from "@/api/product.api";
import { useCart } from "@/app/context/CartContext";

function product() {
  const { addToCart } = useCart();
  const [ready, setReady] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<PRODUCT>();
  const [quantity, setQuantity] = useState<any>(0);
  const aumentarCantidad = () => {
    if (product.stock === 0) return;
    if (quantity >= product?.stock) {
      setQuantity(product?.stock);
      return;
    }
    setQuantity(quantity + 1);
  };
  const disminuirCantidad = () => {
    if (product.stock === 0) return;
    if (quantity <= 1) {
      setQuantity(1);
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleAddToCart = (productId: number) => {
    if (quantity > 0) {
      const newItem = { productId, quantity: quantity };
      addToCart(newItem);
    }
  };

  useEffect(() => {
    getProductById(parseInt(id)).then((data) => {
      setProduct(data);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      product?.stock > 0 ? setQuantity(1) : setQuantity(0);
    }
  }, [ready]);

  return !ready ? (
    <Loading />
  ) : (
    <div className="container">
      <main className="main-center">
        <div className="return">
          <Link href={"/"}>
            <Image
              src={BackwardArrowIcon}
              alt={"ArrowReturn"}
              height={30}
              width={30}
            />
          </Link>
          <Link href={"/"}>Seguir mirando productos</Link>
        </div>
        <section className="flex-simple">
          <div className="image-product">
            <Image
              src={
                "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
              }
              alt={"Imagen " + product?.name}
              height={500}
              width={500}
            />
            <div className="cantProduct">
              {/* Aquí va la quantity de productos, con posibilidad de aumentar y disminuir*/}
              {/*Boton menos*/}
              <button onClick={() => disminuirCantidad()}>
                <Image
                  src={MinusIcon}
                  alt="Disminuir cantidad del producto"
                  width={30}
                  height={30}
                />
              </button>
              {/*Input quantity*/}
              <input
                className="input-standard"
                type="input"
                onKeyDown={onlyNumberInput}
                disabled={product?.stock === 0}
                value={quantity}
                onBlur={() => {
                  if (quantity === "") {
                    setQuantity(1);
                  }
                }}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setQuantity("");
                    return;
                  }
                  if (parseInt(e.target.value) <= 0) {
                    // cuando el input es 0, cambia a 1
                    setQuantity(1);
                    return;
                  }

                  if (parseInt(e.target.value) > product?.stock) {
                    setQuantity(product?.stock);
                    return;
                  }
                  setQuantity(parseInt(e.target.value));
                }}
              />{/*Boton más*/}
              <button onClick={() => aumentarCantidad()}>
                <Image
                  src={PlusIcon}
                  alt="Aumentar cantidad del producto"
                  width={30}
                  height={30}
                />
              </button>
            </div>
            <button id="button-standard" onClick={() => handleAddToCart(product._id)}>
              Añadir al carrito
            </button>
          </div>
          <div className="flex-column">
            <h4>{product?.name ?? "Por asignar "}</h4>
            <h4>{"Precio: $" + product?.price ?? "Por asignar"}</h4>
            <h3>Descripción del producto</h3>
            <p>{product?.description ?? "Por asignar"}</p>
            <p>{"Categoría: " + product?.categoryName ?? "Por asignar"}</p>
            <p>{"Cantidad disponible: " + product?.stock ?? "Por asignar"}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default product;
