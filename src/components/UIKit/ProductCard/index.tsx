import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { Product } from "@/types";
import { useToast } from "@/providers/ToastProvider"; // Import useToast hook
import useUser from "@/store/user.store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductCard = ({ product }: { product: Product }) => {
  const { items, addItem, incrementItem, decrementItem } = useCartStore(
    (state) => ({
      items: state.items,
      addItem: state.addItem,
      incrementItem: state.incrementItem,
      decrementItem: state.decrementItem,
    })
  );

  const cartItem = items.find((item) => item.id === product.id);
  const outOfStock = !product.quantity || product.quantity === 0;
  const user = useUser();

  // Initialize useToast hook

  const handleAddToCart = () => {
    // Check if user is logged in
    const isLoggedIn = user.user; /* Check user login status */

    if (!isLoggedIn) {
      // Display toast message

      toast.error(`Будь ласка, увійдіть, щоб додати товари в кошик..`);

      return;
    }

    // If user is logged in, proceed with adding the product to the cart
    addItem(product);
  };

  return (
    <div
      className={`bg-white flex flex-col rounded-xl shadow-sm hover:shadow-md p-5 transition-shadow duration-300 relative ${
        outOfStock ? "cursor-not-allowed" : ""
      }`}
    >
      {outOfStock ? (
        <span className="text-black text-center z-[21] text-[26px] font-bold absolute top-10">
          Нема в наявності
        </span>
      ) : null}

      {outOfStock ? (
        <div className="absolute top-0 left-0 h-full w-full rounded-xl blur bg-[#dfdfdfc1] z-[20]"></div>
      ) : null}
      <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
        <Image
          src={product?.imageUrl}
          alt={product?.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {product?.title}
      </h3>
      <div className="text-gray-700 mb-3">
        <span className="font-medium">Ціна:</span>{" "}
        <span className="text-lg font-semibold text-gray-900">
          ${product?.price}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mb-4">
        <div className="flex items-center">
          <span className="font-medium">Кольори:</span>
          <div className="flex ml-2 gap-1 flex-wrap">
            {product?.colors?.map((color: string, index: number) => (
              <span
                key={index}
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        </div>
        {/* <div className="flex items-center">
          <span className="font-medium">Розміри:</span>
          <div className="flex ml-2 gap-1 flex-wrap">
            {product?.sizes?.map((size: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 border border-gray-300 rounded text-xs font-medium"
              >
                {size}
              </span>
            ))}
          </div>
        </div> */}
      </div>
      {outOfStock ? null : (
        <>
          {/* <span className="font-medium">Кількість: {product.quantity}</span> */}
          <div className="flex items-center flex-col justify-between mt-auto">
            <div className="flex items-center">
              {cartItem ? (
                <div className="flex items-center mt-2 justify-center">
                  <button
                    className="bg-black text-white w-full rounded-lg px-2 py-1 rounded-l-lg hover:bg-gray-300 transition-colors duration-300"
                    onClick={() => decrementItem(product.id)}
                  >
                    <FaMinus />
                  </button>
                  <span className="px-4 py-1 bg-gray-200 text-gray-700 font-semibold">
                    {cartItem.quantity}
                  </span>
                  <button
                    className="bg-black text-white w-full rounded-lg px-2 py-1 rounded-r-lg hover:bg-gray-300 transition-colors duration-300"
                    onClick={() => incrementItem(product.id)}
                    disabled={cartItem.quantity === product.quantity}
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : null}
            </div>
            {cartItem ? (
              <span className="mt-auto flex items-center justify-center bg-black text-white w-full hover:text-black px-4 py-2 rounded-lg hover:bg-gray transition-colors duration-300">
                Додано в кошик
              </span>
            ) : (
              <button
                className="mt-auto flex items-center justify-center bg-black text-white w-full hover:text-black px-4 py-2 rounded-lg hover:bg-gray transition-colors duration-300"
                onClick={handleAddToCart} // Call handleAddToCart function
              >
                Добавити в кошик
              </button>
            )}
          </div>
        </>
      )}
      <Link
        href={`/product/${product.id}`}
        className="mt-3 bg-black text-white hover:text-black px-4 py-2 rounded-lg hover:bg-gray transition-colors duration-300 w-full text-center"
      >
        Переглянути
      </Link>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
