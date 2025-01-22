import { PRODUCT } from "@/types/product.types";
import Image from "next/image";
import { useEffect } from "react";

type ProductVariantsProps = {
  current_product: PRODUCT;
  variantsArray: Array<PRODUCT>;
};

function ProductVariants({
  current_product,
  variantsArray,
}: ProductVariantsProps) {
  useEffect(() => {}, []);
  return (
    <div>
      <p className="py-2">Variante: {current_product?.name}</p>
      <div className="flex flex-row w-full overflow-x-auto flex-nowrap max-h-80 gap-2 items-top  justify-center p-2">
        {variantsArray.map((variant, index) => (
          <span key={index} title={variant.name}>
            <Image
              src={"https://placehold.co/36"}
              alt={variant.name}
              width={80}
              height={80}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProductVariants;
