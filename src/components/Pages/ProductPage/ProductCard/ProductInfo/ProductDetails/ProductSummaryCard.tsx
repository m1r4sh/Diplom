import useCartStore from "@/store/useCartStore";
import { Product } from "@/types";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductSummaryCard = ({ product }: { product: Product }) => {
  const { items, addItem, incrementItem, decrementItem } = useCartStore(
    (state) => ({
      items: state.items,
      addItem: state.addItem,
      incrementItem: state.incrementItem,
      decrementItem: state.decrementItem,
    })
  );

  const cartItem = items.find((item) => item.id === product.id);

  return (
    <div
      className="flex flex-col gap-3 border-b pb-3 border-gray"
      id="about-product"
    >
      <div className="md2:flex flex-col hidden gap-3">
        <h1 className="text-dark leading-[37.5px] text-[32px] font-robot-c font-medium xl:text-[40px] xl:leading-[46.88px] 2xl:text-[40px] 2xl:leading-[46.88px]">
          {product.title}
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <span className="font-robot-c font-medium text-dark text-[24px] leading-[28.13px] xl:text-[32px] xl:leading-[37.5px]">
            {product.price} UAH
          </span>
        </div>

        {cartItem ? (
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              onClick={() => decrementItem(product.id)}
            >
              <FaMinus />
            </button>
            <span className="font-medium text-lg">{cartItem.quantity}</span>
            <button
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              onClick={() => incrementItem(product.id)}
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <button
            className="mt-auto flex items-center gap-2 bg-black text-white hover:text-black px-4 py-2 rounded-lg hover:bg-gray transition-colors duration-300"
            onClick={() => addItem(product)}
          >
            Добавити в корзину
            <CiShoppingCart size={25} />
          </button>
        )}
      </div>
      <div className="flex items-end justify-between"></div>
    </div>
  );
};

export default ProductSummaryCard;
