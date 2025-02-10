import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, use } from "react";
import { getDocTypes } from "@/api/parameters.api";
import { onlyNumberInput } from "@/util/utils";
import { PurchaseCustomerInfoScheme } from "@/util/validation";
import { basicUserDataSchema } from "@/types/purchase.types";
import toast from "react-hot-toast";

interface CustomerDataFormDialogProps {
  confirmPurchase: (data: basicUserDataSchema) => void;
  productsAddedLength: number;
}

const docTypes = getDocTypes();
function CustomerDataFormDialog({
  confirmPurchase,
  productsAddedLength,
}: CustomerDataFormDialogProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const docTypesArray = use(docTypes);
  const [documentType, setDocumentType] = useState<string>(docTypesArray[0]);
  const [documentNum, setDocumentNum] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<Map<string | number, string>>(new Map());
  const [open, setOpen] = useState(false);

  function resetStates() {
    setName("");
    setEmail("");
    setDocumentType(docTypesArray[0]);
    setDocumentNum("");
    setPhone("");
  }

  function formAction(formData: FormData) {
    if (productsAddedLength === 0) {
      toast.error("No hay productos agregados");
      return;
    }
    const formValues = Object.fromEntries(formData);
    const result = PurchaseCustomerInfoScheme.safeParse(formValues);
    if (result.success) {
      setErrors(new Map());
      confirmPurchase({
        name: result.data.name as string,
        email: result.data.email as string,
        docType: result.data.documentType as string,
        identification: result.data.documentNum as string,
        telephone: result.data.phone as string,
      });
      resetStates();
      setOpen(false);
    } else {
      const errorsMap = new Map<string | number, string>();
      result.error.errors.map((error) => {
        errorsMap.set(error.path[0], error.message);
      });
      setErrors(errorsMap);
    }
  }

  function handleDialogClose() {
    setOpen(!open);
    resetStates();
    setErrors(new Map());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger id="button-standard">
        <span>Continuar con la Compra</span>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 bg-[color:var(--background)]">
        <form className="form-inf-buy" action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-[color: var(--foreground)] font-bold text-2xl">
              Datos del cliente requeridos
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-0">
            <label htmlFor="name">Nombre: </label>
            <input
              className={`input-standard
                `}
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            {
              // Muestra los errores de validación
              Array.from(errors.keys()).includes("name") && (
                <p className="text-red-500">{errors.get("name")}</p>
              )
            }
          </div>
          <div className="flex flex-col gap-0">
            <label htmlFor="email">Correo electrónico: </label>
            <input
              className={`input-standard `}
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {
              // Muestra los errores de validación
              Array.from(errors.keys()).includes("email") && (
                <p className="text-red-500">{errors.get("email")}</p>
              )
            }
          </div>
          <div className="flex flex-col gap-0">
            <label htmlFor="documentType">Tipo de Documento: </label>
            <select
              name="documentType"
              id="input-standard"
              defaultValue={documentType}
              onChange={(e) => {
                setDocumentType(e.target.value);
              }}
            >
              {docTypesArray.map((docType) => (
                <option key={docType} value={docType}>
                  {docType}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-0">
            <label htmlFor="documentNum">Número de Documento: </label>
            <input
              className={`input-standard `}
              type="text"
              value={documentNum}
              name="documentNum"
              onChange={(e) => setDocumentNum(e.target.value)}
              onKeyDown={onlyNumberInput}
            />
            {
              // Muestra los errores de validación
              Array.from(errors.keys()).includes("documentNum") && (
                <p className="text-red-500">{errors.get("documentNum")}</p>
              )
            }
          </div>
          <div className="flex flex-col gap-0">
            <label htmlFor="phone">Teléfono: </label>
            <input
              className={`input-standard`}
              type="text"
              value={phone}
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={onlyNumberInput}
            />
            {
              // Muestra los errores de validación
              Array.from(errors.keys()).includes("phone") && (
                <p className="text-red-500">{errors.get("phone")}</p>
              )
            }
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <button className="bg-[color:var(--color-main)] text-white rounded-md p-2">
                Cancelar
              </button>
            </DialogClose>
            <button
              className="bg-[color:var(--color-main)] text-white rounded-md p-2"
              type="submit"
            >
              Confirmar Compra
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerDataFormDialog;
