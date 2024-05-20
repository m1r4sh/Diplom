import React from "react";
import Description from "./Description";
import Characteristics from "./Characteristics";
import CharacteristicsMobile from "./Characteristics/CharacteristicsMobile";
import { Product } from "@/types";

const ProductDescription = ({ product }: { product: Product }) => {
  return (
    <section className="p-5 bg-white rounded-lg w-full flex flex-col gap-5">
      <Description product={product} />
    </section>
  );
};

export default ProductDescription;
