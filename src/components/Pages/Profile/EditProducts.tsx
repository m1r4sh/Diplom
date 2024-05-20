import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  colors: string[];
  sizes: string[];
  imageUrl: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

const EditProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const categoriesData: Category[] = [];

        for (const categoryDoc of categoriesSnapshot.docs) {
          const categoryData = categoryDoc.data();
          const productsSnapshot = await getDocs(
            collection(db, `categories/${categoryDoc.id}/products`)
          );
          const productsData = productsSnapshot.docs.map((productDoc) => ({
            id: productDoc.id,
            ...productDoc.data(),
            categoryId: categoryDoc.id,
          })) as Product[];

          categoriesData.push({
            id: categoryDoc.id,
            name: categoryData.name,
            products: productsData,
          });
        }

        setCategories(categoriesData);
      } catch (error) {
        console.error("Помилка завантаження категорій і продуктів: ", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    const category = categories.find(
      (category) => category.id === product.categoryId
    );
    setSelectedCategory(category || null);
    setCategoryName(category ? category.name : "");
  };

  const handleProductInputChange = (e: any) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(e.target.value);
  };

  const handleSaveProductChanges = async () => {
    if (selectedProduct) {
      try {
        const productRef = doc(
          db,
          `categories/${selectedProduct.categoryId}/products`,
          selectedProduct.id
        );
        await updateDoc(productRef, {
          title: selectedProduct.title,
          price: Number(selectedProduct.price),
          description: selectedProduct.description,
          colors: selectedProduct.colors,
          sizes: selectedProduct.sizes,
        });
        toast.success("Продукт успішно оновлено!");
      } catch (error) {
        console.error("Помилка оновлення продукту: ", error);
        toast.error("Не вдалося оновити продукт. Спробуйте ще раз.");
      }
    }
  };

  const handleSaveCategoryChanges = async () => {
    if (selectedCategory) {
      try {
        const categoryRef = doc(db, "categories", selectedCategory.id);
        await updateDoc(categoryRef, {
          name: categoryName,
        });
        toast.success("Категорія успішно оновлена!");
        // Update local state
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, name: categoryName }
              : cat
          )
        );
      } catch (error) {
        console.error("Помилка оновлення категорії: ", error);
        toast.error("Не вдалося оновити категорію. Спробуйте ще раз.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8 bg-[#f0f4f8] min-h-screen">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1">
          <h2 className="text-3xl font-semibold mb-6 text-[#333333]">
            Категорії
          </h2>
          <div className="space-y-6 h-[650px] overflow-auto bg-white p-4 rounded-lg shadow-lg">
            {categories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    value={
                      category.id === selectedCategory?.id
                        ? categoryName
                        : category.name
                    }
                    onChange={handleCategoryInputChange}
                    className="text-2xl font-semibold text-[#555555] bg-transparent border-b border-gray-300 focus:outline-none w-full"
                    disabled={category.id !== selectedCategory?.id}
                  />
                  {category.id === selectedCategory?.id && (
                    <button
                      onClick={handleSaveCategoryChanges}
                      className="ml-4 bg-[#007bff] text-white px-4 py-2 rounded-lg hover:bg-[#0056b3] transition duration-300"
                    >
                      Зберегти
                    </button>
                  )}
                </div>
                <ul className="space-y-4">
                  {category.products.map((product) => (
                    <li
                      key={product.id}
                      className={`flex items-center p-4 border rounded-lg shadow transition-shadow duration-300 cursor-pointer ${
                        selectedProduct?.id === product.id
                          ? "bg-[#e0e7ff] border-[#007bff] shadow-lg"
                          : "bg-white hover:shadow-md"
                      }`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-[#333333]">
                          {product.title}
                        </p>
                        <p className="text-[#666666]">${product.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          {selectedProduct ? (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-6 text-[#333333]">
                Редагувати товар
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2 text-[#555555]">
                    Назва
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={selectedProduct.title}
                    onChange={handleProductInputChange}
                    className="w-full p-3 border rounded-lg text-[#333333] bg-[#f9f9f9]"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-[#555555]">
                    Ціна
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleProductInputChange}
                    className="w-full p-3 border rounded-lg text-[#333333] bg-[#f9f9f9]"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-[#555555]">
                    Опис
                  </label>
                  <textarea
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleProductInputChange}
                    className="w-full p-3 border rounded-lg text-[#333333] bg-[#f9f9f9]"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-[#555555]">
                    Кольори
                  </label>
                  <input
                    type="text"
                    name="colors"
                    value={selectedProduct.colors.join(", ")}
                    onChange={(e) =>
                      handleProductInputChange({
                        ...e,
                        target: {
                          ...e.target,
                          value: e.target.value.split(", "),
                        },
                      })
                    }
                    className="w-full p-3 border rounded-lg text-[#333333] bg-[#f9f9f9]"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-[#555555]">
                    Розміри
                  </label>
                  <input
                    type="text"
                    name="sizes"
                    value={selectedProduct.sizes.join(", ")}
                    onChange={(e) =>
                      handleProductInputChange({
                        ...e,
                        target: {
                          ...e.target,
                          value: e.target.value.split(", "),
                        },
                      })
                    }
                    className="w-full p-3 border rounded-lg text-[#333333] bg-[#f9f9f9]"
                  />
                </div>
                <button
                  onClick={handleSaveProductChanges}
                  className="w-full bg-[#007bff] text-white px-6 py-3 rounded-lg hover:bg-[#0056b3] transition duration-300"
                >
                  Зберегти зміни
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-[#666666] p-8 bg-white rounded-lg shadow-lg">
              Виберіть продукт для редагування
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
