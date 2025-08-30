export interface IToast {
  id: number;
  message: string;
  type: "info" | "success" | "error" | "warning";
}

export interface IToastProviderProps {
  children: any;
}

export type IShowToast = (message: string, type?: IToast["type"], duration?: number) => void;
