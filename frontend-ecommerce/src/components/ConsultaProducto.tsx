import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import Image from "next/image";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";

function ConsultaProducto({
  products_table,
}: {
  products_table: PRODUCT_FROM_INVENTARY[];
}) {
  return (
    <div className="flex-column">
      <div className="content-right">
        <div className="search">
          <input type="text" placeholder="Buscar producto" />
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
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products_table.length !== 0
            ? products_table.map((product, index) => (
                <tr className="text-center" key={index}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.locationAddress}</td>
                  <td>{product.totalQuantity}</td>
                  <td>
                    <button>
                      <Image
                        src={SearchIcon}
                        alt="search"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button>
                      <Image
                        src={SearchIcon}
                        alt="search"
                        width={30}
                        height={30}
                      />
                    </button>
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
  );
}

export default ConsultaProducto;
