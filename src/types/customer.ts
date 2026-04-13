import { IAddress } from "@/models/Address";

export type Customer = {
  _id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  addresses: IAddress[];
};

export interface ICustomer {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  addresses: IAddress[];
}
