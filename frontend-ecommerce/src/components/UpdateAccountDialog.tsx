import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { onlyNumberInput } from "@/util/utils";
import { useState } from "react";
import { EmployeeDataScheme } from "@/util/validation";
import { EMPLOYEE } from "@/types/employee.types";

interface props {
  handleUpdateUserDataBtn: (employeeData: EMPLOYEE) => void;
}

function UpdateAccountDialog({ handleUpdateUserDataBtn }: props) {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [errors, setErrors] = useState<Map<string | number, string>>(new Map());
  const [open, setOpen] = useState(false);

  function handleDialogClose() {
    setOpen(!open);
    resetStates();
    setErrors(new Map());
  }

  function formAction(formData: FormData) {
    const formValues = Object.fromEntries(formData);
    const result = EmployeeDataScheme.partial({
      role: true,
      locationId: true,
      docType: true,
      docNumber: true,
    }).safeParse(formValues);

    if (result.success) {
      setErrors(new Map());
      handleUpdateUserDataBtn({
        name: result.data.name as string,
        lastName: result.data.lastname as string,
        email: result.data.email as string,
        telephone: result.data.telephone as string,
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

  function resetStates() {
    setName("");
    setLastName("");
    setEmail("");
    setTelephone("");
  }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger id="button-standard">
        <span>Actualizar datos</span>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 bg-[color:var(--background)]">
        <form className="form-inf-buy" action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-[color: var(--foreground)] font-bold text-2xl">
              Actualización de datos
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
            <label htmlFor="lastname">Apellido: </label>
            <input
              className={`input-standard `}
              type="text"
              value={lastName}
              name="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
            {
              // Muestra los errores de validación
              Array.from(errors.keys()).includes("lastname") && (
                <p className="text-red-500">{errors.get("lastname")}</p>
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
            <label htmlFor="phone">Teléfono: </label>
            <input
              className={`input-standard`}
              type="text"
              value={telephone}
              name="telephone"
              onChange={(e) => setTelephone(e.target.value)}
              onKeyDown={onlyNumberInput}
            />
            {
              // Muestra los errores de validación
              Array.from(errors.keys()).includes("telephone") && (
                <p className="text-red-500">{errors.get("telephone")}</p>
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
              Actualizar Datos
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateAccountDialog;
