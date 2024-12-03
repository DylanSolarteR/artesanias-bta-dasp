import SearchIcon from "@/app/icons/searchIcon.png";
import Image from "next/image";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";

function ConsultaProducto({
  products_table,
}: {
  products_table: PRODUCT_FROM_INVENTARY[];
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row self-end">
        <input type="text" placeholder="Buscar producto" />
        <Image src={SearchIcon} alt="search" width={30} height={30} />
      </div>
      <table className="border-slate-950 border-2">
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
            ? products_table.map((product) => (
                <tr className="text-center">
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.locationDirection}</td>
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
