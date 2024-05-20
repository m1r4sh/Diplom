import React, { useState } from "react";
import { WhiteArrowIconSVG } from "@/components/UIKit/SVGIcons";

const SelectColor = ({
  setSelectedColor,
  selectedColor,
}: {
  setSelectedColor: any;
  selectedColor: string | null;
}) => {
  const colors = [
    { name: "#FF0000", style: "bg-red-500" },
    { name: "#00FF00", style: "bg-green-500" },
    { name: "#0000FF", style: "bg-blue" },
    { name: "#FFFF00", style: "bg-yellow-500" },
    { name: "#00FFFF", style: "bg-cyan-500" },
    { name: "#FF00FF", style: "bg-[purple]" },
    { name: "#000000", style: "bg-black" },
    { name: "#FFFFFF", style: "bg-white" },
    { name: "#808080", style: "bg-gray" },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="font-robot-c text-[24px] leading-[24px] font-bold text-t-grey">
        Кольори
      </h3>
      <div className="flex gap-3 items-start flex-wrap">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`size-[16px] shrink-0 rounded-full cursor-pointer ${
              color.style
            } ${
              selectedColor === color.name ? "ring-4 ring-blue-500" : "border"
            }`}
            onClick={() => handleColorSelect(color.name)}
          >
            {selectedColor === color.name && (
              <div className="flex items-center justify-center h-full">
                <WhiteArrowIconSVG />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectColor;
