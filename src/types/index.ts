export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  additionalInfo: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
}

export interface Category {
  id: string;
  name: string;
}
