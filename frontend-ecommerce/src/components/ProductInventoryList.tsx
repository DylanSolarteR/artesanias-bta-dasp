import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import ChangeStockButton from "./ChangeStockButton";
import Image from "next/image";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { LOW_STOCK_THRESHOLD, noAccents } from "@/util/utils";
import { useState, useEffect } from "react";

function ProductInventoryList({
  products_table,
  productsGeneralInventory,
  setProductsGeneralInventory,
}: {
  products_table: PRODUCT_FROM_INVENTARY[];
  productsGeneralInventory: PRODUCT_FROM_INVENTARY[];
  setProductsGeneralInventory: (products: PRODUCT_FROM_INVENTARY[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [products_table_display, setProducts_table_display] = useState<
    PRODUCT_FROM_INVENTARY[]
  >(products_table ?? []);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleStockChange(
    product: PRODUCT_FROM_INVENTARY,
    stockQuantity: number
  ) {
    products_table.forEach((product_from_list) => {
      if (
        product_from_list.productId === product.productId &&
        product_from_list.locationId === product.locationId
      ) {
        product_from_list.ecommerceQuantity = stockQuantity;
      }
    });
    productsGeneralInventory.forEach((product_from_list) => {
      if (
        product_from_list.productId === product.productId &&
        product_from_list.locationId === product.locationId
      ) {
        product_from_list.ecommerceQuantity = stockQuantity;
      }
    });

    setProducts_table_display([...products_table]);
    setProductsGeneralInventory([...productsGeneralInventory]);
    //Aca iria la llamada a la API para actualizar el stock segun la locationId y productId
  }

  useEffect(() => {
    if (search.length > 0) {
      const filteredProducts = products_table.filter((product) =>
        noAccents(product.productName.toLowerCase()).includes(
          search.toLowerCase()
        )
      );
      setProducts_table_display(filteredProducts);
    } else {
      setProducts_table_display(products_table);
    }
  }, [search]);

  useEffect(() => {
    setProducts_table_display(products_table);
    setSearch("");
  }, [products_table]);

  return products_table ? (
    <div className="flex-column">
      <div className="content-right">
        <div className="search">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar producto"
          />
          <Image src={SearchIcon} alt="search" width={20} height={20} />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Identificador</th>
            <th scope="col">Nombre producto</th>
            <th scope="col">Categoría</th>
            <th scope="col">Punto Físico</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Acciones Stock</th>
          </tr>
        </thead>

        <tbody>
          {products_table.length !== 0
            ? products_table_display.map((product, index) => (
                <tr
                  className={
                    (LOW_STOCK_THRESHOLD >= product.ecommerceQuantity &&
                      `text-amber-700 font-bold`) + ` text center h-full`
                  }
                  key={index}
                >
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.locationAddress}</td>
                  <td>{product.ecommerceQuantity}</td>
                  <td>
                    <ChangeStockButton
                      product={product}
                      handleStockChange={handleStockChange}
                    />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
        <tfoot>
          {products_table.length === 0 ? (
            <tr className="text-center">
              <td colSpan={6}>Añade un producto</td>
            </tr>
          ) : null}
        </tfoot>
      </table>
    </div>
  ) : null;
}

export default ProductInventoryList;
