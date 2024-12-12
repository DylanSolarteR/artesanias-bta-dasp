import Image from "next/image";
import { useState, useMemo } from "react";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import { listProductsFromInventory } from "@/api/inventory.api";
//For the inventory page
function PhysicalPointCard({
  physicalPoint,
  setProducts_table,
}: {
  physicalPoint: PHYSICAL_LOCATION;
  setProducts_table: React.Dispatch<
    React.SetStateAction<PRODUCT_FROM_INVENTARY[]>
  >;
}) {
  const [checked, setChecked] = useState(false);
  const [productsPP, setProductsPP] = useState<PRODUCT_FROM_INVENTARY[]>([]);
  function handleCheckboxChange() {
    if (!checked) {
      setProducts_table([]);
    }
    if (checked) {
      setProducts_table([]);
    }
    setChecked(!checked);
  }
  return (
    <div className="flex flex-col relative text-center">
      <input
        type="checkbox"
        className="absolute top-2 right-2"
        onChange={handleCheckboxChange}
        defaultChecked={checked}
      />
      <Image
        src={
          "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
        }
        alt={physicalPoint.address}
        width={180}
        height={150}
        className="w-full"
      />
      <h3>{physicalPoint.address}</h3>
    </div>
  );
}

export default PhysicalPointCard;
