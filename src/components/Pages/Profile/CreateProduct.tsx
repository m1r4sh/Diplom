import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { db, storage } from "@/utils/firebase/config";
import ProductColorPicker from "../ProductPage/ProductCard/ProductInfo/ProductDetails/ProductOptions/ProductColorPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sizes = [
  { size: "XS", outOfStock: false },
  { size: "S", outOfStock: false },
  { size: "M", outOfStock: false },
  { size: "L", outOfStock: false },
  { size: "XL", outOfStock: false },
];

const CreateProduct = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    additionalInfo: "",
    imageUrl: "",
    colors: [] as string[],
    sizes: [] as string[],
  });
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

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

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let categoryId = selectedCategory;

      // Create new category if provided and doesn't exist already
      if (newCategory) {
        const q = query(
          collection(db, "categories"),
          where("name", "==", newCategory)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          categoryId = querySnapshot.docs[0].id;
          toast.info(`Category "${newCategory}" already exists.`);
        } else {
          const categoryDocRef = await addDoc(collection(db, "categories"), {
            name: newCategory,
          });
          categoryId = categoryDocRef.id;
          toast.success(`Category "${newCategory}" created successfully.`);
        }
      }

      // Upload image to storage if provided
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add product to selected or newly created category
      await addDoc(collection(db, `categories/${categoryId}/products`), {
        ...product,
        price: parseFloat(product.price),
        imageUrl,
        colors: selectedColors,
        sizes: selectedSizes,
      });

      toast.success("Product added successfully!");
    } catch (error: any) {
      toast.error("Error adding product: " + error.message);
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        <h2 className="text-3xl font-extrabold text-black mb-6 text-center">
          Create Product
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col justify-between">
            <label className="block text-lg font-medium text-black mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select an existing category</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-black mb-2">
              Or Create New Category
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={handleNewCategoryChange}
              className="block w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-black mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleProductChange}
              className="block w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-black mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleProductChange}
              className="block w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-black mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleProductChange}
            className="block w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-black mb-2">
            Additional Info
          </label>
          <textarea
            name="additionalInfo"
            value={product.additionalInfo}
            onChange={handleProductChange}
            className="block w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <ProductColorPicker
          onColorChange={handleColorChange}
          selectedColors={selectedColors}
        />

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg leading-6 text-black">Frame Size</h3>
          <div className="flex gap-3 flex-wrap">
            {sizes.map(({ size, outOfStock }) => (
              <div
                key={size}
                className={`border border-blue-300 w-10 h-10 font-semibold rounded-lg flex items-center justify-center transition duration-300 ${
                  selectedSizes.includes(size)
                    ? "bg-blue text-white"
                    : "bg-white text-blue"
                } ${
                  outOfStock
                    ? "cursor-not-allowed bg-blue text-blue"
                    : "hover:bg-blue hover:text-white"
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-black mb-2">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue text-white py-3 rounded-md font-semibold hover:bg-blue transition duration-300"
        >
          Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;
