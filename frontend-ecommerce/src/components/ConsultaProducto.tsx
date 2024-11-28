import SearchIcon from "@/app/icons/searchIcon.png";
import Image from "next/image";
import { PRODUCTO_INV } from "@/app/(with-navbar)/(with-sidebar)/dashboard/inventario/types";

function ConsultaProducto({
  products_table,
}: {
  products_table: PRODUCTO_INV[];
}) {
  return (
    <div>
      <div>
        <input type="text" placeholder="Buscar producto" />
        <Image src={SearchIcon} alt="search" width={30} height={30} />
      </div>
      <table>
        <th>
          <td>Identificador</td>
          <td>Nombre producto</td>
          <td>Categoría</td>
          <td>Punto Físico</td>
          <td>Cantidad</td>
          <td>Acciones</td>
        </th>
        {products_table ? (
          products_table.map((product) => (
            <tr>
              <td>{product.productId}</td>
              <td>{product.physicalLocationId}</td>
              <td>{product.quantity}</td>
              <td>{product.displayquantity}</td>
              <td>
                <button>
                  <Image src={SearchIcon} alt="search" width={30} height={30} />
                </button>
                <button>
                  <Image src={SearchIcon} alt="search" width={30} height={30} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td></td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default ConsultaProducto;
