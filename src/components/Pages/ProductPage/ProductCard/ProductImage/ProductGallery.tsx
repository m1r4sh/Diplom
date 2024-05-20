import Image from "next/image";
import React, { useState, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Product } from "@/types";

const ProductGallery = ({ product }: { product: Product }) => {
  return (
    <section className="">
      <div className="xl:mx-auto max-w-6xl">
        {/* Main Image Swiper */}
        <div className="flex items-center justify-center bg-white md:bg-transparent md2:bg-white md2:px-1 relative rounded-lg">
          <div className="relative w-[1100px] h-[500px]">
            <Image
              src={product?.imageUrl}
              alt={product.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        {/* Thumbnails Swiper */}
      </div>
    </section>
  );
};

export default ProductGallery;
