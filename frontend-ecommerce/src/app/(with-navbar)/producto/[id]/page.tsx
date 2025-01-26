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
import { getProductById, getProductsByBaseId } from "@/api/product.api";
import { useCart } from "@/app/context/CartContext";
import { PRODUCT } from "@/types/product.types";
import ProductVariants from "@/components/ProductVariants";

function Product() {
  const { addToCart } = useCart();
  const [ready, setReady] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<PRODUCT>({
    _id: 0,
    name: "Por asignar",
    description: "Por asignar",
    categoryName: "Por asignar",
    price: 0,
    stock: 0,
    img: "",
    isActive: false,
    categoryId: 0,
    baseProductId: 0,
  });
  const [productVariants, setProductVariants] = useState<PRODUCT[]>([]);
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
  //Product is fetched when the page is loaded
  useEffect(() => {
    getProductById(parseInt(id)).then((data) => {
      setProduct(data);
      setReady(true);
    });
  }, []);
  //Product Variants are fetched when the product is loaded
  useEffect(() => {
    if (!productVariants.length && product.baseProductId) {
      getProductsByBaseId(product.baseProductId).then((data) => {
        setProductVariants(data);
      });
    }
  }, [product]);

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
          <Link href={"/catalogo"}>
            <Image
              src={BackwardArrowIcon}
              alt={"ArrowReturn"}
              height={30}
              width={30}
            />
          </Link>
          <Link href={"/catalogo"}>Seguir mirando productos</Link>
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
            {productVariants.length > 1 ? (
              <ProductVariants
                current_product={product}
                variantsArray={productVariants}
              />
            ) : null}
          </div>
          <div className="flex-column">
            <h4>{product?.name}</h4>
            <h4>{"Precio: $" + product?.price || "Por asignar"} </h4>
            <p>{"Cantidad disponible: " + product?.stock}</p>
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
              />
              {/*Boton más*/}
              <button onClick={() => aumentarCantidad()}>
                <Image
                  src={PlusIcon}
                  alt="Aumentar cantidad del producto"
                  width={30}
                  height={30}
                />
              </button>
            </div>
            <button
              id="button-standard"
              onClick={() => handleAddToCart(product._id)}
            >
              Añadir al carrito
            </button>
          </div>
        </section>
        <h3>Descripción del producto</h3>
        <p>{product?.description}</p>
        <p>{"Categoría: " + product?.categoryName}</p>
      </main>
    </div>
  );
}

export default Product;
