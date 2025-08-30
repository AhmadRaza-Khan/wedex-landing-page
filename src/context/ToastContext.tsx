import { createContext, useContext, useState } from "react";
import type { IToast, IToastProviderProps } from "../types/toast"
import type { IShowToast } from "../types/toast";

const ToastContext = createContext<IShowToast | undefined>(undefined);
let toastId = 0;

export function ToastProvider({ children }: IToastProviderProps) {
  const [toast, setToast] = useState<IToast[]>([]);

  const showToast: IShowToast = (message, type = "success", duration = 300000) => {
    const id = toastId++;
    const newToast: IToast = { id, message, type };

    setToast((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToast((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast toast-top toast-end">
        {toast.map(({ id, message, type }) => (
          <div key={id} className={`alert ${type === 'error' ? 'bg-red-500 border-red-500' : 'bg-success border-success'}`}>
            <span>{message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = (): IShowToast => {
  return useContext(ToastContext)!;
};
