import { useState } from "react";
import { LiaCheckSolid } from "react-icons/lia";

const ProductColorPicker = ({ onColorChange, selectedColors }: any) => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFFFFF",
    "#000000",
    "#C0C0C0",
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-lg leading-6 text-black">Colors</h3>
      <div className="flex gap-3 flex-wrap">
        {colors.map((color) => (
          <div
            key={color}
            className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center transition duration-300 ease-in-out ${
              selectedColors?.includes(color) ? "ring-4 ring-blue-500" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          >
            {selectedColors?.includes(color) && <LiaCheckSolid />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColorPicker;
