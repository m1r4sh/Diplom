import useCartStore from "@/store/useCartStore";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa";

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

  return (
    <div className="bg-white flex flex-col rounded-xl shadow-sm hover:shadow-md p-5 transition-shadow duration-300">
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
        <span className="font-medium">Price:</span>{" "}
        <span className="text-lg font-semibold text-gray-900">
          ${product?.price}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mb-4">
        <div className="flex items-center">
          <span className="font-medium">Colors:</span>
          <div className="flex ml-2 gap-1 flex-wrao">
            {product?.colors?.map((color: string, index: number) => (
              <span
                key={index}
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Sizes:</span>
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
        </div>
      </div>
      <div className="flex flex-col gap-2">
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
            className="mt-auto bg-black text-white hover:text-black px-4 py-2 rounded-lg hover:bg-gray transition-colors duration-300 w-full"
            onClick={() => addItem(product)}
          >
            Добавити в корзину
          </button>
        )}
        <Link
          href={`/product/${product.id}`}
          className="mt-auto bg-black text-white hover:text-black px-4 py-2 rounded-lg hover:bg-gray transition-colors duration-300 w-full text-center"
        >
          Переглянути
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
