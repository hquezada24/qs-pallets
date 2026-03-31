export type Product = {
  _id: string;
  name: string;
  index_page_description: string;
  description: string;
  price: number;
  imageURL: string[];
  icon: string;
  isCustom: boolean;
};

export interface IProduct {
  name: string;
  index_page_description: string;
  description: string;
  price: number;
  imageURL?: string[];
  icon: string;
  isCustom: boolean;
  stockTotal: number;
  stockReserved: number;
}
