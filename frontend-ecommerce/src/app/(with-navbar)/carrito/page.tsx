"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PlusIcon from "@/app/icons/PlusIcon.svg?url";
import MinusIcon from "@/app/icons/MinusIcon.svg?url";
import DeleteIcon from "@/app/icons/closeSquareIcon.svg?url";
import BackwardArrowIcon from "@/app/icons/BackwardArrowIcon.svg?url";
import { onlyNumberInput } from "@/util/utils";
import "@/app/css/Detail-shoppingCart.css";
import { useCart } from "@/app/context/CartContext";
import { getProductById, PRODUCT } from "@/api/product.api";

function Carrito() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [productDetails, setProductDetails] = useState<PRODUCT[]>([]);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = await Promise.all(
        cart.map(async cartItem => {
          const product = await getProductById(cartItem.productId);
          return { ...product, quantity: cartItem.quantity };
        })
      );
      setProductDetails(productDetails);
    };

    fetchProducts();
  }, [cart]);

  useEffect(() => {
    const calculateTotal = async () => {
      const total = cart.reduce((acc, productCart) => {
        const products = productDetails.find(product => product._id === productCart.productId);
        return acc + (products ? products.price * productCart.quantity : 0);
      }, 0);
      setTotal(total);
    };

    calculateTotal();
  }, [cart, productDetails]);

  const eliminarProducto = (productId: number) => {
    removeFromCart(productId);
  };

  const increaseQuantity = (productId: number) => {
    addToCart({ productId, quantity: 1 });
  };

  const decreaseQuantity = (productId: number) => {
    const item = cart.find(cartItem => cartItem.productId === productId);
    if (item && item.quantity > 1) {
      addToCart({ productId, quantity: -1 });
    } else {
      removeFromCart(productId);
    }
  };

  {
    /*Función ejecutada cuando cambia la cantidad, realiza cambios en el array Carrito*/
  }
  const onChangeQuantity = (productId: number, quantity: number) => {
    const newQuantity = quantity < 1 || isNaN(quantity) ? 1 : quantity;

    const item = cart.find(cartItem => cartItem.productId === productId);

    if (item) {
      const difference = newQuantity - item.quantity;

      if (difference > 0) {
        addToCart({ productId, quantity: difference });
      } else if (difference < 0) {
        addToCart({ productId, quantity: difference });
      }
    } else if (newQuantity > 0) {
      addToCart({ productId, quantity: newQuantity });
    }
  };

  return (
    <div className="container">
      <h1>CARRITO</h1>
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
      <main className="main-shoppingcart">
        <section className="content-shoppingcart">
          {/* Aquí va el contenido del carrito*/}
          {/* Verifica si hay productos en el carrito */}
          {
            cart.length === 0 ? (
              <div className="no-products">
                <p>No hay productos en tu carrito</p>
              </div>
            ) : (
              <div className="list-shoppingcart">
                {" "}
                {/* Aquí va la lista de productos del carrito*/}
                {productDetails.map((product) => {
                  const cartItem = cart.find(item => item.productId === product._id);
                  const quantity = cartItem ? cartItem.quantity : 0;
                  return (
                    <div className="product" key={product._id}>
                      <button className="delete" onClick={() => eliminarProducto(product._id)}>
                        <Image src={DeleteIcon} alt="Eliminar producto" width={20} height={20} />
                      </button>
                      {" "}
                      {/* Aquí va la información de cada producto*/}
                      <Image src={"https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"} alt={product.name} width={150} height={150} />
                      <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>$ {product.price}</p>
                        <div className="cantProductCart">
                          <button onClick={() => decreaseQuantity(product._id)}>
                            <Image src={MinusIcon} alt="Disminuir cantidad" width={20} height={20} />
                          </button>
                          {/*Input cantidad*/}
                          <input
                            type="input"
                            onKeyDown={onlyNumberInput}
                            value={quantity}
                            onChange={(e) => {
                              if (e.target.value === "") {
                                return;
                              }
                              // cuando el input es 0, cambia a 1
                              if (parseInt(e.target.value) === 0) {
                                e.target.value = "1";
                                onChangeQuantity(product._id, 1);
                              } else {
                                onChangeQuantity(product._id, parseInt(e.target.value));
                              }
                            }}
                          />
                          <button onClick={() => increaseQuantity(product._id)}>
                            <Image src={PlusIcon} alt="Aumentar cantidad" width={20} height={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </section>
        <section className="content-buys">
          {/* Aquí va los detalles de la compra*/}
          <div className="details-buys">
            <h2>Detalles de la compra</h2>
            <span>Número total de artículos: {cart.length}</span>
            <h3>Detalles</h3>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product) => {
                  const cartItem = cart.find(item => item.productId === product._id);
                  const quantity = cartItem ? cartItem.quantity : 0;
                  return (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{quantity}</td>
                      <td>$ {quantity * product.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h4>Total: $ {total}</h4>
          </div>
          {/*Boton para proceder al pago*/}
          <Link href={"/comprar"}>
            <span className="buttom-buys">Proceder al pago</span>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Carrito;
