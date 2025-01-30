"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPermission } from "@/util/RolePermissions";
import { useMainContext } from "@/app/context/MainContext";
import RegisterProduct from "@/components/FormsRegister/RegisterProductForm";
import * as apiProduct from "@/api/product.api";
import Loading from "@/components/Loading";

function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { role } = useMainContext();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      apiProduct.getProductById(Number(id)).then((data) => {
        setProductData(data);
        setLoading(false);
      }).catch(() => {
        router.push("/productos"); 
      });
    }
  }, [id]);

  const handleSubmit = async (data) => {
    await apiProduct.updateProduct(data, id);
    router.push("/productos"); 
  };

  return !role ? (
    <Loading />
  ) : (
    <>
      {!hasPermission(role, "view:products") ? (
        router.push("/POS")
      ) : loading ? (
        <Loading />
      ) : (
        <RegisterProduct onSubmit={handleSubmit} product={productData} />
      )}
    </>
  );
}

export default EditProductPage;
