export type Customer = {
  _id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  addresses: IAddress[];
};

export interface IAddress {
  _id?: string;
  street: string;
  city: string;
  state: "TX" | "AR" | "OK";
  zipCode: string;
}

export interface ICustomer {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  addresses: IAddress[];
}
