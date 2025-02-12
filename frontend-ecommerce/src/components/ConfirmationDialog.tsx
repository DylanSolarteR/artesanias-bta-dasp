import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  action?: () => void; 
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean; 
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ConfirmationDialog({
  action,
  message,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  showCancel = true, 
  open,
  setOpen,
}: ConfirmationDialogProps) {
  function handleConfirm() {
    if (action) action();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col gap-2 bg-[color:var(--background)]">
        <DialogHeader>
          <DialogTitle className="text-[color: var(--foreground)] font-bold text-xl">
            {showCancel ? "Confirmación" : "Notificación"} 
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">{message}</p>
        <DialogFooter className="pt-2 flex justify-end">
          {showCancel && ( 
            <DialogClose asChild>
              <button className="bg-[color:var(--color-gray)] text-black rounded-md p-2">
                {cancelText}
              </button>
            </DialogClose>
          )}
          <button
            className="bg-[color:var(--color-main)] text-white rounded-md p-2"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;