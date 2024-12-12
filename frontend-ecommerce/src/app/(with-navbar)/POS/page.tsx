"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCT, POS_ADDED_PRODUCT } from "@/types/product.types";
import ProductCardPOS from "@/components/ProductCardPOS";
import product from "../producto/[id]/page";

const products_mock: PRODUCT[] = [
  {
    stock: 85,
    name: "Jarrón Cerámico Azul",
    description: "Jarrón cerámico de color azul.",
    categoryName: "Cerámica y Alfarería",
    categoryId: 1,
    price: 23000,
    img: "jarron_ceramico_azul.png",
    isActive: true,
    _id: 2,
  },
  {
    stock: 20,
    name: "Jarrón Cerámico Verde",
    description: "Jarrón cerámico de color verde.",
    categoryName: "Cerámica y Alfarería",
    categoryId: 1,
    price: 24000,
    img: "jarron_ceramico_verde.png",
    isActive: true,
    _id: 3,
  },
  {
    stock: 70,
    name: "Jarrón Cerámico Rojo",
    description: "Jarrón cerámico de color rojo.",
    categoryName: "Cerámica y Alfarería",
    categoryId: 1,
    price: 22000,
    img: "jarron_ceramico_rojo.png",
    isActive: true,
    _id: 1,
  },
];

function page() {
  const [mounted, setMounted] = useState(false);
  const [product_list, setProduct_list] = useState<PRODUCT[]>([]);
  const [products_added, setProducts_added] = useState<POS_ADDED_PRODUCT[]>([]);
  const [ref_product, setRef_product] = useState<string>("");
  const [pay_method, setPay_method] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setProduct_list(products_mock);
    setProducts_added(
      products_mock.map((product) => ({
        product: product,
        subtotal: product.price,
      }))
    );
    setMounted(true);
  }, []);

  function addToProductsAdded(productPos: POS_ADDED_PRODUCT): void {
    setProducts_added([...products_added, productPos]);
  }
  function removeFromProductsAdded(productPos: POS_ADDED_PRODUCT): void {
    setProducts_added(products_added.filter((prod) => prod !== productPos));
  }

  function changeSubtotalByProductId(
    productId: number,
    subtotal: number
  ): void {
    setProducts_added(
      products_added.map((productPos) =>
        productPos.product._id === productId
          ? { product: productPos.product, subtotal: subtotal }
          : productPos
      )
    );
  }

  useEffect(() => {
    setTotal(
      products_added.reduce((acc, productPos) => acc + productPos.subtotal, 0)
    );
  }, [products_added]);

  return (
    <>
      <main className="flex flex-row m-auto p-36">
        <section className="flex flex-col text-center w-full max-w-[1/3]">
          {/* sidebar */}
          <h1 className="h-36">MÓDULO DE FACTURACIÓN</h1>
          <div>
            <Link href={"/"} className="flex gap-2">
              <Image
                alt="icono"
                src={
                  "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
                }
                width={40}
                height={40}
              />
              <span>Registro productos</span>
            </Link>
            <Link href={"/"} className="flex gap-2">
              <Image
                alt="icono"
                src={
                  "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
                }
                width={40}
                height={40}
              />
              <span>Consulta productos</span>
            </Link>
          </div>
        </section>
        <section className="w-full max-w-[1/3]">
          {/* producto */}
          <div className="flex flex-col gap-2">
            <Image
              alt=""
              src={
                "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
              }
              width={300}
              height={300}
            />
            <input
              type="text"
              name="product_ref"
              placeholder="Referencia:"
              value={ref_product}
              onChange={(e) => setRef_product(e.target.value)}
            />
          </div>
          {/* metodo de pago */}
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Image
                alt=""
                src={
                  "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
                }
                width={50}
                height={50}
              />
              <h2>Método de Pago</h2>
            </div>
            <div className="flex flex-row">
              <Image
                alt=""
                src={
                  "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
                }
                width={50}
                height={50}
              />
              <input type="radio" name="pay_method" id="credit_card" />
              <label htmlFor="credit_card">Tarjeta de Crédito</label>
            </div>
            <div className="flex flex-row">
              <Image
                alt=""
                src={
                  "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
                }
                width={50}
                height={50}
              />
              <input type="radio" name="pay_method" id="debit_card" />
              <label htmlFor="debit_card">Tarjeta de Débito</label>
            </div>
            <div className="flex flex-row">
              <Image
                alt=""
                src={
                  "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
                }
                width={50}
                height={50}
              />
              <input type="radio" name="pay_method" id="cash" />
              <label htmlFor="cash">Efectivo</label>
            </div>
          </div>
        </section>
        <section className="w-full max-w-[1/3] flex flex-col gap-2">
          {/* productos añadidos y total */}
          <div className="flex flex-col h-full max-h-[80%] overflow-y-auto p-10 gap-1">
            {products_added.map((productPos, index) => (
              <ProductCardPOS
                key={productPos.product._id}
                productPos={productPos}
                removeFromProductsAdded={removeFromProductsAdded}
                changeSubtotalByProductId={changeSubtotalByProductId}
              />
            ))}
          </div>
          <div className="flex flex-col h-full max-h-[20%] p-10">
            <p>
              TOTAL: <span>{total}</span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default page;
