"use client";
import Image from "next/image";
import Link from "next/link";

import SearchBarMenu from "@/components/SearchBarMenu";

import Card from "@/app/icons/Card.svg?url";
import CardCoin from "@/app/icons/CardCoin.svg?url";
import CardTick from "@/app/icons/CardTick.svg?url";
import Coin from "@/app/icons/Coin.svg?url";
import ProductCardPOS from "../ProductCardPOS";

import {
  POS_ADDED_PRODUCT,
  PRODUCT_FROM_INVENTARY,
} from "@/types/inventory.types";

interface RegistroPOSProps {
  product_list: PRODUCT_FROM_INVENTARY[];
  product_list_filtered: PRODUCT_FROM_INVENTARY[];
  setProduct_list_filtered: React.Dispatch<
    React.SetStateAction<PRODUCT_FROM_INVENTARY[]>
  >;
  isListVisible: boolean;
  setIsListVisible: React.Dispatch<React.SetStateAction<boolean>>;
  products_added: POS_ADDED_PRODUCT[];
  total: number;
  handleFocus: () => void;
  handleProductSelect: (product: PRODUCT_FROM_INVENTARY) => void;
  removeFromProductsAdded: (productPos: POS_ADDED_PRODUCT) => void;
  changeSubtotalByProductId: (productId: number, subtotal: number) => void;
  payMethod: string;
  handlePayMethodSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageSource: string;
}
function RegistroPOS({
  product_list,
  product_list_filtered,
  setProduct_list_filtered,
  isListVisible,
  setIsListVisible,
  products_added,
  total,
  handleFocus,
  handleProductSelect,
  handlePayMethodSelect,
  removeFromProductsAdded,
  payMethod,
  changeSubtotalByProductId,
  imageSource,
}: RegistroPOSProps) {
  return (
    <main className="flex justify-around h-[54rem] px-2">
      <section className="flex flex-col h-full grow justify-center items-center">
        {/* metodo de pago */}
        <div className="flex flex-col justify-center gap-2 h-[33%]">
          <div className="flex gap-1">
            <Image alt="" src={CardCoin} width={46} height={46} />
            <h1 className="py-0">Método de Pago</h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Image alt="" src={Card} width={50} height={50} />
              <input
                type="radio"
                name="pay_method"
                id="credit_card"
                onChange={handlePayMethodSelect}
                value={"credit_card"}
                className="appearance-none"
              />
              <label
                id="label-paymethod-credit"
                htmlFor="credit_card"
                className={`${
                  payMethod === "credit_card" && "font-bold underline"
                }`}
              >
                Tarjeta de Crédito
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <Image alt="" src={CardTick} width={50} height={50} />
              <input
                type="radio"
                name="pay_method"
                id="debit_card"
                onChange={handlePayMethodSelect}
                value={"debit_card"}
                className="appearance-none"
              />
              <label
                id="label-paymethod-debit"
                htmlFor="debit_card"
                className={`${
                  payMethod === "debit_card" && "font-bold underline"
                }`}
              >
                Tarjeta de Débito
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <Image alt="" src={Coin} width={50} height={50} />
              <input
                type="radio"
                name="pay_method"
                id="cash"
                onChange={handlePayMethodSelect}
                value={"cash"}
                className="appearance-none"
              />
              <label
                id="label-paymethod-cash"
                htmlFor="cash"
                className={`${payMethod === "cash" && "font-bold underline"}`}
              >
                Efectivo
              </label>
            </div>
          </div>
        </div>
        {/* producto */}
        <div className="flex flex-col w-full justify-start h-[66%] border-t border-gray-300 pt-6">
          <div className="flex justify-center">
            <Image
              className="self-center"
              alt=""
              src={
                imageSource ??
                "https://placehold.co/450x300/EEE/31343C?font=lato&text=Producto"
              }
              width={450}
              height={300}
            />
          </div>
          <div className="relative flex flex-col items-center gap-2">
            <SearchBarMenu
              search_name="producto"
              data_array={product_list}
              filter_keys={["productName", "productId"]}
              onFilter={setProduct_list_filtered}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setIsListVisible(false), 200)}
            />

            {/* ACA ESTA LA LISTA DESPLEGABLE DE LOS PRODUCTOS, TOCA CAMBIAR EL CSS PARA QUE NO SEA RELATIVA SINO ABSOLUTA Y MOSTRARLA POR ENCIMA */}
            {isListVisible && (
              <div className="relative z-10 ">
                <ul className="absolute z-10 bg-white w-96 top-0 -left-48 border border-gray-300 rounded-md h-32 overflow-auto">
                  {product_list_filtered.length > 0 ? (
                    product_list_filtered.map((product) => (
                      <li
                        key={product.productId}
                        className="hover:bg-[--color-main-soft] overflow-x-clip"
                      >
                        <button onClick={() => handleProductSelect(product)}>
                          {product.productName + " - ID " + product.productId}
                        </button>
                      </li>
                    ))
                  ) : (
                    <span>No hay productos disponibles</span>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-col h-full justify-center grow px-2">
        {/* productos añadidos y total */}
        <div className="flex flex-col justify-center gap-2">
          <div className="border border-gray-300 rounded-md h-[40rem] min-w-96 overflow-auto gap-0 justify-start items-start">
            {products_added.map((productPos, index) => (
              <ProductCardPOS
                key={productPos.product.productId}
                productPos={productPos}
                removeFromProductsAdded={removeFromProductsAdded}
                changeSubtotalByProductId={changeSubtotalByProductId}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 items-end justify-center px-2">
            <span> Subtotal: {total - total * 0.19}</span>
            <span> IVA: {total * 0.19}</span>
            <span> Total: {total}</span>
          </div>
        </div>

        <button id="button-standard">
          <Link href={"/"}>Continuar con la Compra</Link>
        </button>
      </section>
    </main>
  );
}

export default RegistroPOS;
