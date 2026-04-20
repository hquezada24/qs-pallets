export interface Product {
  _id: string;
  name: string;
  index_page_description: string;
  description: string;
  price: number;
  imageURL: string[];
  icon: string;
  isCustom: boolean;
  isMadeToOrder: boolean;
  stockTotal: number;
  stockReserved: number;
  addButton: unknown;
}

export interface IProduct {
  name: string;
  index_page_description: string;
  description: string;
  price: number;
  imageURL?: string[];
  icon: string;
  isCustom: boolean;
  isMadeToOrder: boolean;
  stockTotal: number;
  stockReserved: number;
  notes?: string;
}

export type Item = {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  isCustom: boolean;
};
