import { PRODUCT } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductVariantsProps = {
  current_product: PRODUCT;
  variantsArray: Array<PRODUCT>;
};

function ProductVariants({
  current_product,
  variantsArray,
}: ProductVariantsProps) {
  const [productName, setProductName] = useState<string>(current_product?.name);

  return (
    <div className="w-full">
      <p className="p-2 pt-4">Variante: {productName}</p>
      <div className="flex flex-row w-full overflow-x-auto h-full max-h-fit gap-4 items-center justify-start px-2 py-1">
        {variantsArray.map((variant, index) =>
          variant._id !== current_product._id ? (
            <span
              key={index}
              title={variant.name}
              onMouseOver={() => setProductName(variant.name)}
              onMouseLeave={() => setProductName(current_product?.name)}
              className="shrink-0"
            >
              <Link href={`/producto/${variant._id}`}>
                <Image
                  src={
                    "https://placehold.co/80x80/EEE/31343C?font=lato&text=NoImage"
                  }
                  className="rounded-lg hover:border-2 hover:border-[--color-main] hover:shadow-md "
                  alt={variant.name}
                  width={80}
                  height={80}
                />
              </Link>
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ProductVariants;
