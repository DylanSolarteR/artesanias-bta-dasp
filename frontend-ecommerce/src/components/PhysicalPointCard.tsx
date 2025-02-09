import Image from "next/image";
import { useEffect, useState } from "react";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import { listProductsFromInventory } from "@/api/inventory.api";
//For the inventory page
function PhysicalPointCard({
  physicalPoint,
  addToProductsTable,
  deleteFromProductsTable,
  disabledCheck,
}: {
  physicalPoint: PHYSICAL_LOCATION;
  addToProductsTable: (products: PRODUCT_FROM_INVENTARY[]) => void;
  deleteFromProductsTable: (locationId: number) => void;
  disabledCheck: boolean;
}) {
  const [checked, setChecked] = useState(false);
  const [productsPP, setProductsPP] = useState<PRODUCT_FROM_INVENTARY[]>([]);

  async function getProductsFromInventory() {
    return await listProductsFromInventory(physicalPoint._id);
  }

  async function handleCheckboxChange() {
    let result = [];
    if (productsPP.length === 0) {
      result = await getProductsFromInventory();
      setProductsPP(result);
    } else {
      result = productsPP;
    }
    if (!checked) {
      addToProductsTable(result);
    }
    if (checked) {
      deleteFromProductsTable(physicalPoint._id);
    }
    setChecked(!checked);
  }

  useEffect(() => {
    if (!disabledCheck) {
      setChecked(false);
    }
  }, [disabledCheck]);

  return (
    <div className="flex flex-col relative text-center">
      <input
        type="checkbox"
        className="absolute top-2 right-2"
        onChange={handleCheckboxChange}
        checked={checked}
        disabled={disabledCheck}
      />
      <div className="w-[300px] h-[200px] overflow-hidden">
        <Image
          src= {physicalPoint?.image || "https://placehold.co/600x400/EEE/31343C?font=lato&text=NoImage"}
          alt={physicalPoint.address}
          width={100}
          height={70}
          className="w-full h-full object-cover"
        />
      </div>
      <h3>{physicalPoint.address}</h3>
    </div>
  );
}

export default PhysicalPointCard;
