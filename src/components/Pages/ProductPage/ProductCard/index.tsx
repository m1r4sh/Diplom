import React from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="px-5 w-full sm:overflow-hidden md:px-0 flex flex-col md2:flex-row md2:px-0 md2:gap-6 md2:items-start">
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductCard;
