export interface IRegisterFormData {
  name: string;
  email: string;
  phone: string;
}

export interface IRegisterFormErrors {
  name?: string;
  email?: string;
  phone?: string;
}