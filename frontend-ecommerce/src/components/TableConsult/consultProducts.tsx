"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCT } from "@/types/product.types";
import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";
import SearchBarMenu from "../SearchBarMenu";
import { useState } from "react";

interface ConsultProductsProps {
  products_table: PRODUCT[];
  deleteProduct: (id: number) => void;
}

function ConsultProducts({
  products_table,
  deleteProduct,
}: ConsultProductsProps) {
  const router = useRouter();

  const [product_list_filtered, setProduct_list_filtered] =
      useState<PRODUCT[]>(products_table);
    const [product_selected, setProduct_selected] =
      useState<PRODUCT | null>(null);
    const [isListVisible, setIsListVisible] = useState(false);

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  const handleUpdate = (id: number) => {
    router.push(`productos/editar/${id}`);
  };

  function handleFocus() {
    setIsListVisible(true);
  }

  return (
    <div className="container-dashboard">
      <div className="flex-column">
        <h1>PRODUCTOS</h1>
        <div className="content-right">
          <section className="flex flex-col justify-start items-center max-h-20 pt-10 pb-20">
            <SearchBarMenu
              search_name="producto"
              data_array={products_table}
              filter_keys={["name", "_id"]}
              onFilter={setProduct_list_filtered}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setIsListVisible(false), 200)}
            />
            {isListVisible && (
              <div className="relative z-10">
                <ul className="absolute z-10 bg-white w-96 top-0 -left-52 border border-gray-300 rounded-md h-24 overflow-auto">
                  {product_list_filtered.length === 0 && <li>No hay productos</li>}
                  {product_list_filtered.map((product) => {
                    return (
                      <li
                        key={product._id}
                        className="hover:bg-[--color-main-soft] overflow-x-clip"
                        onClick={() => {
                          setProduct_selected(product);
                          setIsListVisible(false);
                        }}
                      >
                        {product.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>
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
              products_table.map((product) =>
                product.isActive ? (
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
                      <button onClick={() => handleDelete(product._id)}>
                        <Image
                          src={DeleteIcon}
                          alt="delete"
                          width={30}
                          height={30}
                        />
                      </button>
                    </td>
                  </tr>
                ) : null
              )
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
