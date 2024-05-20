import { GetServerSideProps } from "next";
import ProductCard from "@/components/Pages/ProductPage/ProductCard";
import ProductHeader from "@/components/Pages/ProductPage/ProductHeader";
import { db } from "@/utils/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { Product } from "@/types";

const ProductPage = ({ product }: { product: Product }) => {
  return (
    <div className="scroll-smooth max-w-[1324px] w-full m-auto items-start pt-5 pb-10 flex flex-col gap-10 md2:pr-8">
      <div className="flex flex-col gap-10 md:gap-6 w-full">
        <ProductHeader />
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  let product = null;

  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    for (const categoryDoc of categoriesSnapshot.docs) {
      const categoryId = categoryDoc.id;
      const productRef = doc(
        db,
        "categories",
        categoryId,
        "products",
        id as string
      );
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        product = productSnap.data();
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
