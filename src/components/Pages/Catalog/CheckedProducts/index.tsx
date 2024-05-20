import React from "react";

const CheckedProducts = () => {
  return (
    <section className="flex flex-col gap-5 max-w-full sm:pl-5 md:pl-5">
      <h3 className="font-robot-c font-bold text-black leading-[24px] text-[20px]">
        Переглянуті товари
      </h3>
      <div className="flex gap-5 overflow-auto">
        {[1, 2, 3, 4, 5].map((el, index) => (
          <div key={index}>card</div>
        ))}
      </div>
    </section>
  );
};

export default CheckedProducts;
