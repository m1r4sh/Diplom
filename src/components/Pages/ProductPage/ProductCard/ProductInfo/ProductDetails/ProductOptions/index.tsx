interface ProductOptionsProps {
  colors: string[];
  sizes: string[];
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ colors, sizes }) => {
  return (
    <div className="flex flex-col gap-8 border-b pb-3 border-gray">
      <ProductColorPicker colors={colors} />
      <ProductSizePicker sizes={sizes} />
    </div>
  );
};

export default ProductOptions;

import { useState } from "react";
import { LiaCheckSolid } from "react-icons/lia";

interface ProductColorPickerProps {
  colors: string[];
}

const ProductColorPicker: React.FC<ProductColorPickerProps> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-[20px] leading-[24px] text-dark">
        Кольори
      </h3>
      <div className="flex gap-3 flex-wrap">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-full w-8 h-8 shrink-0 flex items-center justify-center transition duration-300 ease-in-out ${
              selectedColor === color ? "ring-4 ring-blue-500" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          >
            {selectedColor === color && <LiaCheckSolid />}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ProductSizePickerProps {
  sizes: string[];
}

const ProductSizePicker: React.FC<ProductSizePickerProps> = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-[20px] leading-[24px] text-dark">
        Розмір рами
      </h3>
      <div className="flex gap-3 flex-wrap">
        {sizes.map((size, index) => (
          <button
            key={index}
            className={`border border-gray-300 w-8 h-7 shrink-0 font-semibold rounded flex items-center justify-center ${
              selectedSize === size
                ? "bg-dark text-white"
                : "bg-white text-dark hover:border-dark"
            }`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
