"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";
import { PRODUCT } from "@/types/product.types";
import * as apiProduct from "@/api/product.api";
import Product from "@/app/(non-protected)/(with-navbar)/(without-sidebar)/producto/[id]/page";

function ConsultProducts({ products_table }: { products_table: PRODUCT[] }) {
  const router = useRouter();

  const handleDelete = (id: number, product: PRODUCT) => {
    apiProduct.deleteProduct(String(id), product);
  };

  const handleUpdate = (id: number) => {
    router.push(`productos/editar/${id}`);
  };

  return (
    <div className="container-dashboard">
      <div className="flex-column">
        <h1>PRODUCTOS</h1>
        <div className="content-right">
          <div className="search">
            <input type="text" placeholder="Buscar productos" />
            <Image src={SearchIcon} alt="search" width={20} height={20} />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">ID base</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio</th>
              <th scope="col">Categoría</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products_table.length !== 0 ? (
              products_table.map((product) => (
                <tr key={product._id} className="text-center">
                  <td>{product._id}</td>
                  <td>{product.baseProductId}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.categoryName}</td>
                  <td>
                    <button onClick={() => handleUpdate(product._id)}>
                      <Image
                        src={UpdateIcom}
                        alt="update"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button onClick={() => handleDelete(product._id, product)}>
                      <Image
                        src={DeleteIcon}
                        alt="delete"
                        width={30}
                        height={30}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={7}>No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultProducts;
