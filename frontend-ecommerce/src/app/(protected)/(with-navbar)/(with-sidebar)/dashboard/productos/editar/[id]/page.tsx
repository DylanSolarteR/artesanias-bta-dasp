"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import RegisterProduct from "@/components/FormsRegister/RegisterProductForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import * as apiProduct from "@/api/product.api";
import Loading from "@/components/Loading";

function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { role } = useMainContext();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      apiProduct
        .getProductById(Number(id))
        .then((data) => {
          setProductData(data);
          setLoading(false);
        })
        .catch(() => {
          router.push("/dashboard/productos");
        });
    }
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      const result = await apiProduct.updateProduct(
        Number(id),
        data.baseProductId,
        data.name,
        data.description,
        data.price,
        data.imgFile,
        data.categoryId
      );
      if (result.success) {
        setMessage("Producto creado con éxito.");
      } else {
        setMessage(`${result.message}`);
      }
    } catch (error) {
      setMessage("Error inesperado al crear un producto.");
    } finally {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (role && !hasPermission(role, "update:products")) {
      router.push("/POS");
    }
  }, [role, router]);

  return !role ? (
    <Loading />
  ) : loading ? (
    <Loading />
  ) : (
    <><RegisterProduct onSubmit={handleSubmit} product={productData} /><ConfirmationDialog
      message={message}
      open={open}
      setOpen={setOpen}
      showCancel={false}
      confirmText="Aceptar" /></>
  );
}

export default EditProductPage;
