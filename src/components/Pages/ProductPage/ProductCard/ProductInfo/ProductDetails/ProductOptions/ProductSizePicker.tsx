import { useState } from "react";

const ProductSizePicker = ({
  onSizeChange,
}: {
  onSizeChange: (size: string) => void;
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = [
    { size: "XS", outOfStock: false },
    { size: "S", outOfStock: true },
    { size: "M", outOfStock: false },
    { size: "L", outOfStock: true },
    { size: "XL", outOfStock: false },
  ];

  const handleSizeClick = (size: string) => {
    if (sizes.find((s) => s.size === size)?.outOfStock) return;
    setSelectedSize(size);
    onSizeChange(size);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-[20px] leading-[24px] text-dark">
        Розмір рами
      </h3>
      <div className="flex gap-3">
        {sizes.map(({ size, outOfStock }) => (
          <button
            key={size}
            className={`border border-gray w-8 h-7 shrink-0 font-semibold rounded flex items-center justify-center ${
              selectedSize === size
                ? "bg-dark text-white border-dark"
                : "bg-white text-dark hover:border-dark"
            } ${
              outOfStock
                ? "cursor-not-allowed text-gray bg-white border-gray hover:border-gray"
                : ""
            }`}
            onClick={() => handleSizeClick(size)}
            disabled={outOfStock}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizePicker;
