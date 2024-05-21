export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  additionalInfo: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}
