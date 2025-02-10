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
    stockQuantity: number,
    stockQuantityDisplay: number
  ) => void;
}

function ChangeStockButton({
  product,
  handleStockChange,
}: ChangeStockButtonProps) {
  const [stockQuantity, setStockQuantity] = useState(product.totalQuantity);
  const [stockQuantityDisplay, setStockQuantityDisplay] = useState(
    product.displayQuantity
  );
  function handleDecreaseStock() {
    if (stockQuantity === 0) return;
    if (stockQuantity === stockQuantityDisplay)
      setStockQuantityDisplay(stockQuantityDisplay - 1);
    setStockQuantity(stockQuantity - 1);
  }
  function handleIncreaseStock() {
    setStockQuantity(stockQuantity + 1);
  }

  function handleDecreaseStockDisplay() {
    if (stockQuantityDisplay === 0) return;
    setStockQuantityDisplay(stockQuantityDisplay - 1);
  }
  function handleIncreaseStockDisplay() {
    if (stockQuantityDisplay === stockQuantity) return;
    setStockQuantityDisplay(stockQuantityDisplay + 1);
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
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-4">
                <p>Bodega</p>
                <div className="flex justify-center items-center ">
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
              </div>
              <div className="flex justify-center items-center gap-4">
                <p>Vitrina</p>
                <div className="flex justify-center items-center ">
                  <button
                    className="btn btn-primary"
                    title="Disminuir stock"
                    onClick={handleDecreaseStockDisplay}
                  >
                    <Minus className="text-[--color-main-opaque] font-bold" />
                  </button>
                  <span className="mx-2">{stockQuantityDisplay}</span>
                  <button
                    className="btn btn-primary"
                    title="Aumentar stock"
                    onClick={handleIncreaseStockDisplay}
                  >
                    <Plus className="text-[--color-main-opaque] font-bold" />
                  </button>
                </div>
              </div>
              <button
                id="button-standard"
                className="max-w-44"
                onClick={() =>
                  handleStockChange(
                    product,
                    stockQuantity,
                    stockQuantityDisplay
                  )
                }
              >
                Confirmar
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </span>
    </div>
  );
}

export default ChangeStockButton;
