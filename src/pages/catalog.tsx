import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "@/utils/firebase/config";
import { Product } from "@/types";
import BicyclePurposeTags from "@/components/Pages/Catalog/Aside/BicyclePurposeTags";
import SelectColor from "@/components/Pages/Catalog/Aside/SelectColor";
import SortByPrice from "@/components/Pages/Catalog/Aside/SortByPrice";
import CategoryName from "@/components/Pages/Catalog/CategoryName";
import MainContent from "@/components/Pages/Catalog/Main";
import SubCategories from "@/components/Pages/Catalog/SubCategories";
import FilterModal from "@/components/UIKit/Modals/FilterModal";

const checkboxes = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
  { label: "Option 4" },
  { label: "Option 5" },
  { label: "Option 6" },
  { label: "Option 7" },
  { label: "Option 8" },
  { label: "Option 9" },
  { label: "Option 10" },
];

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });

  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const fetchProducts = async () => {
      let productsData: any[] = [];

      try {
        const categoriesRef = collection(db, "categories");
        let categoryDoc;

        if (category) {
          const q = query(categoriesRef, where("name", "==", category));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            categoryDoc = querySnapshot.docs[0];
          }
        }

        if (categoryDoc) {
          const productsRef = collection(
            db,
            `categories/${categoryDoc.id}/products`
          );
          const productsSnapshot = await getDocs(productsRef);
          productsData = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[];
        } else {
          const categoriesSnapshot = await getDocs(categoriesRef);
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
        }

        // Filter by color
        if (selectedColor) {
          productsData = productsData.filter((product) =>
            product.colors.includes(selectedColor)
          );
        }

        // Filter by price
        productsData = productsData.filter(
          (product) =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );
      } catch (error) {
        console.error("Error fetching products: ", error);
      }

      setProducts(productsData);
    };

    fetchProducts();
  }, [category, selectedColor, priceRange]);

  const resetFilters = () => {
    setSelectedColor(null);
    setPriceRange({ min: 0, max: Infinity });
    router.push(router.pathname, undefined, { shallow: true });
  };

  return (
    <div className="max-w-[1324px] w-full m-auto items-start my-10 flex flex-col gap-10">
      <CategoryName title={"Назва категорії"} quantity={products.length} />
      <SubCategories />
      <button
        onClick={resetFilters}
        className="self-end bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mb-4 sm:mr-4"
      >
        Reset Filters
      </button>
      <section className="flex gap-5 w-full items-start sm:px-5 md:px-5">
        <aside className="max-w-[224px] w-full shrink-0 grow p-5 bg-white rounded-lg flex flex-col gap-5 md:hidden sm:hidden">
          <SelectColor
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
          />
          <SortByPrice setPriceRange={setPriceRange} />
        </aside>
        <MainContent products={products} />
      </section>

      {/* {false ? <FilterModal /> : null} */}
    </div>
  );
};

export default Catalog;
