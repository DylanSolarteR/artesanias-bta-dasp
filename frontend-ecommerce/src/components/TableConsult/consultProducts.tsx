"use client";
import { useRouter } from "next/navigation";
import { PRODUCT } from "@/types/product.types";
import DeleteIcon from "@/app/icons/TrashIcon.svg?url";
import UpdateIcom from "@/app/icons/EditIcon.svg?url";
import ConfirmationDialog from "@/components/ConfirmationDialog"
import SearchBarMenu from "../SearchBarMenu";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import ImageFb from "../ImageFb";

interface ConsultProductsProps {
  products_table: PRODUCT[];
  deleteProduct: (id: number) => void;
}

function ConsultProducts({
  products_table,
  deleteProduct,
}: ConsultProductsProps) {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [product_list_filtered, setProduct_list_filtered] = useState<PRODUCT[]>(
    []
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setselectedProductId] = useState<number | null>(null);

  const handleOpenDeleteDialog = (id: number) => {
    setselectedProductId(id);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  const handleUpdate = (id: number) => {
    router.push(`productos/editar/${id}`);
  };

  useEffect(() => {
    setProduct_list_filtered(products_table);
    setShowLoader(false);
  }, [products_table]);

  return (
    <div className="container-dashboard">
      <div className="flex-column">
        <h1>PRODUCTOS</h1>
        <div className="content-right">
          <section className="flex flex-col justify-start items-center max-h-20">
            <SearchBarMenu
              search_name="producto"
              data_array={products_table}
              filter_keys={["name", "_id"]}
              onFilter={setProduct_list_filtered}
            />
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
            {showLoader ? (
              <td colSpan={7} className="text-center">
                <Loading />
              </td>
            ) : product_list_filtered.length !== 0 ? (
              product_list_filtered.map((product) =>
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
                        <ImageFb
                          src={UpdateIcom}
                          alt="update"
                          width={30}
                          height={30}
                        />
                      </button>
                      <button onClick={() => handleOpenDeleteDialog(product._id)}>
                        <ImageFb
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
        {openDialog && selectedProductId !== null && (
          <ConfirmationDialog
            open={openDialog}
            setOpen={setOpenDialog}
            action={() => handleDelete(selectedProductId)}
            message="¿Estás seguro de que deseas eliminar este producto?"
          />
        )}
      </div>
    </div>
  );
}

export default ConsultProducts;
