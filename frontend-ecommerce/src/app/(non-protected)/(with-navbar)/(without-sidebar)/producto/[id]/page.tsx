"use client";
import Link from "next/link";
import BackwardArrowIcon from "@/app/icons/BackwardArrowIcon.svg?url";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { onlyNumberInput } from "@/util/utils";
import PlusIcon from "@/app/icons/PlusIcon.png";
import MinusIcon from "@/app/icons/MinusIcon.png";
import Loading from "@/components/Loading";
import {
  getProductById,
  getProductsByBaseId,
  listProducts,
} from "@/api/product.api";
import { useCart } from "@/app/context/CartContext";
import { PRODUCT } from "@/types/product.types";
import ProductVariants from "@/components/ProductVariants";
import toast from "react-hot-toast";
import { shuffle } from "@/util/utils";
import ImageFb from "@/components/ImageFb";

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

  const [recommendations, setRecommendations] = useState<
    {
      imagen: string;
      nombre: string;
      precio: number;
      id: number;
    }[]
  >([]);

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
      toast.success("Producto añadido al carrito");
    }
  };
  //Product is fetched when the page is loaded
  useEffect(() => {
    getProductById(parseInt(id)).then((data) => {
      setProduct(data);
      setReady(true);
    });
  }, []);

  //Product Variants & recommendations are fetched when the product is loaded
  useEffect(() => {
    if (!productVariants.length && product.baseProductId) {
      getProductsByBaseId(product.baseProductId).then((data) => {
        setProductVariants(data);
      });
    }
    if (!recommendations.length && product.categoryId) {
      listProducts({
        orderBy: ["price", "desc"],
        category: product.categoryId,
      }).then((data) => {
        shuffle(data);
        setRecommendations(data.slice(0, 10));
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
      <main className="main-center justify-center items-start flex flex-col md:px-48 pt-5">
        <div className="return">
          <Link href={"/catalogo"}>
            <ImageFb
              src={BackwardArrowIcon}
              alt={"ArrowReturn"}
              height={30}
              width={30}
            />
          </Link>
          <Link href={"/catalogo"}>Seguir mirando productos</Link>
        </div>
        <section className="flex gap-[20px] max-w-full w-full self-center pt-2 md:flex-row flex-col">
          <div className="image-product flex flex-col justify-center items-center">
            <ImageFb
              src={
                product?.img ||
                "https://placehold.co/500x500/EEE/31343C?font=lato&text=NoImage"
              }
              alt={"Imagen " + product?.name}
              height={480}
              width={480}
              className="rounded-lg border-radius: 8px;"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "1px 2px 5px rgba(0,0,0,0.2)",
              }}
            />
            {productVariants.length > 1 ? (
              <ProductVariants
                current_product={product}
                variantsArray={productVariants}
              />
            ) : null}
          </div>
          <div className="flex-column min-w-[20rem] max-w-[30rem]">
            <h4 className="font-bold">{product?.name}</h4>
            <h4>{"Precio: $" + product?.price || "Por asignar"} </h4>
            <h3>Descripción del producto</h3>
            <p>{product?.description}</p>
            <p>{"Categoría: " + product?.categoryName}</p>
            <p>{"Cantidad disponible: " + product?.stock}</p>
            <div className="cantProduct">
              {/* Aquí va la quantity de productos, con posibilidad de aumentar y disminuir*/}
              {/*Boton menos*/}
              <button onClick={() => disminuirCantidad()}>
                <ImageFb
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
                <ImageFb
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
        <section className="py-10 w-full">
          <h3 className="mb-2">Recomendaciones</h3>
          <div className="grid grid-cols-2 items-center justify-center">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-2">
                <Link href={"/producto/" + rec.id}>
                  <ImageFb
                    src={rec.imagen}
                    alt={"Imagen " + rec.nombre}
                    height={200}
                    width={300}
                    className="rounded-lg"
                  />
                  <h4 className="text-ellipsis">{rec.nombre}</h4>
                  <p>{"Precio: $" + rec.precio}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Product;
