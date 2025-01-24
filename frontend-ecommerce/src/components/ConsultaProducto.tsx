import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import EditIcon from "@/app/icons/EditIcon.svg?url";
import TrashIcon from "@/app/icons/TrashIcon.svg?url";
import Image from "next/image";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { LOW_STOCK_THRESHOLD, noAccents } from "@/util/utils";
import { useState, useEffect } from "react";
function ConsultaProducto({
  products_table,
}: {
  products_table: PRODUCT_FROM_INVENTARY[];
}) {
  const [search, setSearch] = useState("");
  const [products_table_display, setProducts_table_display] = useState<
    PRODUCT_FROM_INVENTARY[]
  >(products_table ?? []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

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
            {/* <th scope="col">Acciones</th> */}
          </tr>
        </thead>

        <tbody>
          {products_table.length !== 0
            ? products_table_display.map((product, index) => (
                <tr
                  className={
                    (LOW_STOCK_THRESHOLD >= product.ecommerceQuantity &&
                      `text-amber-700 font-bold`) + ` text center`
                  }
                  key={index}
                >
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.locationAddress}</td>
                  <td>{product.totalQuantity}</td>
                  {/* <td>
                    <button>
                      <Image
                        src={EditIcon}
                        alt="search"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button>
                      <Image
                        src={TrashIcon}
                        alt="search"
                        width={30}
                        height={30}
                      />
                    </button>
                  </td> */}
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

export default ConsultaProducto;
