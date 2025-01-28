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
  handlePayMethodSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  changeSubtotalByProductId,
}: RegistroPOSProps) {
  return (
    <>
      <main className="flex justify-around items-center h-full">
        <section>
          {/* producto */}
          <div className="">
            <Image
              className=""
              alt=""
              src={
                "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
              }
              width={300}
              height={300}
            />
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
              <ul>
                {product_list_filtered.length > 0 ? (
                  product_list_filtered.map((product) => (
                    <li key={product.productId}>
                      <button onClick={() => handleProductSelect(product)}>
                        {product.productName + " - ID " + product.productId}
                      </button>
                    </li>
                  ))
                ) : (
                  <span>No hay productos disponibles</span>
                )}
              </ul>
            )}
          </div>
          {/* metodo de pago */}
          <div className="">
            <div className="">
              <Image alt="" src={CardCoin} width={46} height={46} />
              <h2>Método de Pago</h2>
            </div>
            <div className="">
              <Image alt="" src={Card} width={50} height={50} />
              <input
                type="radio"
                name="pay_method"
                id="credit_card"
                onChange={handlePayMethodSelect}
                value={"credit_card"}
              />
              <label htmlFor="credit_card">Tarjeta de Crédito</label>
            </div>
            <div className="">
              <Image alt="" src={CardTick} width={50} height={50} />
              <input
                type="radio"
                name="pay_method"
                id="debit_card"
                onChange={handlePayMethodSelect}
                value={"debit_card"}
              />
              <label htmlFor="debit_card">Tarjeta de Débito</label>
            </div>
            <div className="">
              <Image alt="" src={Coin} width={50} height={50} />
              <input
                type="radio"
                name="pay_method"
                id="cash"
                onChange={handlePayMethodSelect}
                value={"cash"}
              />
              <label htmlFor="cash">Efectivo</label>
            </div>
          </div>
        </section>
        <section className="">
          {/* productos añadidos y total */}
          <div className="list-shoppingcart">
            {products_added.map((productPos, index) => (
              <ProductCardPOS
                key={productPos.product.productId}
                productPos={productPos}
                removeFromProductsAdded={removeFromProductsAdded}
                changeSubtotalByProductId={changeSubtotalByProductId}
              />
            ))}
          </div>
          <div className="">
            <span> TOTAL: {total}</span>
          </div>

          <button id="button-standard">
            <Link href={"/"}>Continuar con la Compra</Link>
          </button>
        </section>
      </main>
    </>
  );
}

export default RegistroPOS;
