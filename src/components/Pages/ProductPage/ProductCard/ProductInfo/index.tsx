import React from "react";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import CharacteristicsMobile from "./ProductDescription/Characteristics/CharacteristicsMobile";
import { Product } from "@/types";

const ProductInfo = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col mt-6 gap-6 md2:mt-0 md2:grow">
      <ProductDetails product={product} />
      <ProductDescription product={product} />
    </div>
  );
};

export default ProductInfo;
