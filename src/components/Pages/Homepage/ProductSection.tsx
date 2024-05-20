import React, { useEffect, useState } from "react";
import ProductCard from "@/components/UIKit/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import Link from "next/link";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoriesRef = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesRef);
        let productsData: any = [];

        for (const categoryDoc of categoriesSnapshot.docs) {
          const productsRef = collection(
            db,
            `categories/${categoryDoc.id}/products`
          );
          const productsSnapshot = await getDocs(productsRef);
          productsData.push(
            ...productsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto text-center mb-12">
        <span className="bg-blue-100 text-blue-600 font-bold py-1 px-3 rounded-full text-sm mb-4 inline-block">
          POPULAR PRODUCTS
        </span>
        <h2 className="text-4xl font-extrabold text-gray-900">
          Most popular motorcycle parts
        </h2>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="container mx-auto text-center mt-12">
        <Link
          href="/catalog"
          className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray transition duration-300 border-2 border-[#E0E0E0]"
        >
          Show all products →
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
