import React, { useState, useEffect } from "react";
import ProductGallery from "./ProductGallery";
import { Product } from "@/types";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import { useParams } from "next/navigation";
import useUser from "@/store/user.store";
import Image from "next/image";

interface Feedback {
  id?: string;
  productId: string;
  text: string;
  userId: string;
  userName: string;
  userImage: string;
}

const ProductImage = ({ product }: { product: Product }) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState<string>("");
  const { id } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackSnapshot = await getDocs(collection(db, "feedback"));
        const feedbackData = feedbackSnapshot.docs
          .filter((doc) => doc.data().productId === id)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Feedback[];
        setFeedback(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback: ", error);
      }
    };

    if (id) {
      fetchFeedback();
    }
  }, [id]);

  const handleFeedbackSubmit = async () => {
    if (newFeedback.trim() === "" || !user) return;

    const newFeedbackData: any = {
      productId: id,
      text: newFeedback,
      userId: user.uid,
      userName: user.name,
      userImage: user.profilePicture,
    };

    try {
      const docRef = await addDoc(collection(db, "feedback"), newFeedbackData);
      setFeedback([...feedback, { ...newFeedbackData, id: docRef.id }]);
      setNewFeedback("");
    } catch (error) {
      console.error("Error adding feedback: ", error);
    }
  };

  return (
    <section className="sm:p-0 p-5 sm:bg-white md:bg-white md2:bg-transparent rounded-lg w-full md2:max-w-[568px] xl:max-w-[700px] lg:max-w-[768px] md2:p-0 md2:sticky top-[10px] ">
      <div className="flex flex-col gap-1 items-start md:flex-row md:items-center md:justify-between md2:hidden">
        <h1 className="text-dark leading-[28.13px] text-[24px] font-robot-c font-medium">
          {product?.title}
        </h1>
      </div>
      <ProductGallery product={product} />
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-[#333333]">
          User Feedback
        </h2>
        <div className="space-y-4 mb-6">
          {feedback.map((fb) => (
            <div
              key={fb.id}
              className="p-4 bg-[#f0f0f0] rounded-lg shadow-md text-[#333333] flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={fb.userImage || "https://via.placeholder.com/150"}
                  alt={fb.userName}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-[#111111]">{fb.userName}</p>
                <p className="text-[#555555]">{fb.text}</p>
              </div>
            </div>
          ))}
        </div>
        <textarea
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Enter your feedback here"
          className="w-full p-3 border border-[#cccccc] rounded-lg mb-4 text-[#333333] placeholder-[#999999]"
        />
        <button
          onClick={handleFeedbackSubmit}
          className="bg-[#007bff] text-white px-4 py-2 rounded-lg hover:bg-[#0056b3] transition duration-300"
        >
          Submit Feedback
        </button>
      </div>
    </section>
  );
};

export default ProductImage;
