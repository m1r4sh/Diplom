import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "@/utils/firebase/config";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Повідомлення успішно надіслано!");
    } catch (error) {
      console.error("Error sending message: ", error);
      toast.error(
        "Не вдалося надіслати повідомлення. Будь ласка, спробуйте пізніше."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Наші контакти
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <FaPhone className="text-blue-500" />
            <span className="text-gray-700">0663116714</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaEnvelope className="text-green-500" />
            <span className="text-gray-700">motoshoppoltava@gmail.com</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="text-gray-700">Полтава, Україна</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Ваше ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <textarea
              placeholder="Ваше повідомлення"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#0650a6] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Надсилається..." : "Відправити повідомлення"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
