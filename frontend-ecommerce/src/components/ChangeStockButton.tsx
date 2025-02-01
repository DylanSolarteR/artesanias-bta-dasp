import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PRODUCT_FROM_INVENTARY } from "@/types/inventory.types";
import { Boxes, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface ChangeStockButtonProps {
  product: PRODUCT_FROM_INVENTARY;
  handleStockChange: (
    product: PRODUCT_FROM_INVENTARY,
    stockQuantity: number
  ) => void;
}

function ChangeStockButton({
  product,
  handleStockChange,
}: ChangeStockButtonProps) {
  const [stockQuantity, setStockQuantity] = useState(product.ecommerceQuantity);
  function handleDecreaseStock() {
    setStockQuantity(stockQuantity - 1);
  }
  function handleIncreaseStock() {
    setStockQuantity(stockQuantity + 1);
  }
  return (
    <div className="flex justify-center">
      <span title="Gestionar Stock" className="h-full">
        <Popover>
          <PopoverTrigger className="flex cursor-pointer">
            <Boxes />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center">
            <p>Cambiar la cantidad de stock</p>
            <div className="flex justify-center items-center">
              <button
                className="btn btn-primary"
                title="Disminuir stock"
                onClick={handleDecreaseStock}
              >
                <Minus className="text-[--color-main-opaque] font-bold" />
              </button>
              <span className="mx-2">{stockQuantity}</span>
              <button
                className="btn btn-primary"
                title="Aumentar stock"
                onClick={handleIncreaseStock}
              >
                <Plus className="text-[--color-main-opaque] font-bold" />
              </button>
            </div>
            <button
              id="button-standard"
              className="max-w-44"
              onClick={() => handleStockChange(product, stockQuantity)}
            >
              Confirmar
            </button>
          </PopoverContent>
        </Popover>
      </span>
    </div>
  );
}

export default ChangeStockButton;
