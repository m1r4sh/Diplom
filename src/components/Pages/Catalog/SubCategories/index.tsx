import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "@/utils/firebase/config";

const SubCategories = () => {
  const [categories, setCategories] = useState<any>([]);
  const router = useRouter();
  const { category: activeCategory } = router.query;

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: categoryName },
    });
  };

  return (
    <div className="flex gap-5 overflow-auto max-w-full sm:px-5 md:px-5">
      {categories.map((category: any) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.name)}
          className={`p-3 flex flex-col gap-1 rounded-lg cursor-pointer transition duration-300 ${
            activeCategory === category.name
              ? "bg-[#d64848] text-white"
              : "bg-blue text-white hover:bg-gray"
          }`}
        >
          <div className="px-3">
            <span className="font-inter leading-[19.2px] text-white">
              {category.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubCategories;
