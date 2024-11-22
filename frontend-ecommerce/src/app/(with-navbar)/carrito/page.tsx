"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PlusIcon from "@/app/icons/PlusIcon.svg?url";
import MinusIcon from "@/app/icons/MinusIcon.svg?url";
import DeleteIcon from "@/app/icons/DeleteIcon.svg?url";
import BackwardArrowIcon from "@/app/icons/BackwardArrowIcon.svg?url";
import { onlyNumberInput } from "@/util/utils";
import "@/app/css/Detail-shoppingCart.css";

function Carrito() {
  const [carrito, setCarrito] = useState([
    {
      nombre: "Producto 1",
      imagen:
        "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder",
      precio: 100,
      cantidad: 1,
    },
    {
      nombre: "Producto 2",
      imagen:
        "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder",
      precio: 200,
      cantidad: 2,
    },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = carrito.reduce(
      (acc, producto) => acc + producto.cantidad * producto.precio,
      0
    );
    setTotal(total);
  }, [carrito]);

  const eliminarProducto = (index: number) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };
  const aumentarCantidad = (index: number) => {
    let newCarrito = [...carrito];
    newCarrito[index].cantidad++;
    setCarrito(newCarrito);
  };

  const disminuirCantidad = (index: number) => {
    if (carrito[index].cantidad === 1) {
      return 1;
    }
    let newCarrito = [...carrito];
    newCarrito[index].cantidad--;
    setCarrito(newCarrito);
  };

  {
    /*Función ejecutada cuando cambia la cantidad, realiza cambios en el array Carrito*/
  }
  const onChangeCantidad = (index: number, cantidad: number) => {
    if (cantidad < 1 || isNaN(cantidad)) {
      cantidad = 1;
    }
    let newCarrito = [...carrito];
    newCarrito[index].cantidad = cantidad;
    setCarrito(newCarrito);
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
          {
            <div className="list-shoppingcart">
              {" "}
              {/* Aquí va la lista de productos del carrito*/}
              {carrito.map((producto, index) => (
                <div className="product" key={index}>
                  <button
                    className="delete"
                    onClick={() => eliminarProducto(index)}
                  >
                    <Image
                      src={DeleteIcon}
                      alt="Eliminar producto"
                      width={20}
                      height={20}
                    />
                  </button>{" "}
                  {/* Aquí va la información de cada producto*/}
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={150}
                    height={150}
                  />
                  <div className="product-info">
                    <h2>{producto.nombre}</h2>
                    <p>$ {producto.precio}</p>
                    <div className="cantProduct">
                      <button onClick={() => disminuirCantidad(index)}>
                        <Image
                          src={MinusIcon}
                          alt="Disminuir cantidad"
                          width={20}
                          height={20}
                        />
                      </button>
                      {/*Input cantidad*/}
                      <input
                        type="input"
                        onKeyDown={onlyNumberInput}
                        value={producto.cantidad}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            return;
                          }
                          // cuando el input es 0, cambia a 1
                          if (parseInt(e.target.value) === 0) {
                            e.target.value = "1";
                            onChangeCantidad(index, 1);
                          } else {
                            onChangeCantidad(index, parseInt(e.target.value));
                          }
                        }}
                      />
                      <button onClick={() => aumentarCantidad(index)}>
                        <Image
                          src={PlusIcon}
                          alt="Aumentar cantidad"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </section>
        <section className="content-buys">
          {/* Aquí va los detalles de la compra*/}
          <div className="details-buys">
            <h2>Detalles de la compra</h2>
            <span>Número total de artículos: {carrito.length}</span>
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
                {carrito.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>$ {producto.cantidad * producto.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>Total: $ {total}</h4>
          </div>
          {/*Boton para proceder al pago*/}
          <Link href={"/"}>
            <span className="buttom-buys">Proceder al pago</span>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Carrito;
