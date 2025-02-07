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
    await apiProduct.updateProduct(
      Number(id),
      data.baseProductId,
      data.name,
      data.description,
      data.price,
      data.img,
      data.categoryId
    );
    router.push("/dashboard/productos");
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
    <RegisterProduct onSubmit={handleSubmit} product={productData} />
  );
}

export default EditProductPage;
