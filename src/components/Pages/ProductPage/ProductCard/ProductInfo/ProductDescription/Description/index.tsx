import { Product } from "@/types";
import React from "react";

const Description = ({ product }: { product: Product }) => {
  return (
    <div
      className="flex flex-col gap-5 border-b border-gray pb-4"
      id="description"
    >
      <h3 className="text-dark font-robot-c text-[24px] font-medium leading-[28.13px] xl:text-[32px] xl:leading-[37.5px]">
        Опис
      </h3>
      <p className="text-dark font-inter text-[16px] font-light leading-[19.2px]">
        {product.description}
      </p>
    </div>
  );
};

export default Description;
