import React from "react";
import FilterBlock from "./FilterBlock";
import { PlusIcon } from "@/components/UIKit/SVGIcons";
import ProductCard from "@/components/UIKit/ProductCard";
import { Product } from "@/types";

const MainContent = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full grow flex flex-col gap-5">
      <div className="mt-5 flex flex-col gap-5">
        <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-3 flex-wrap gap-5">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
