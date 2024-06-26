import useUser from "@/store/user.store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import {
  FaBox,
  FaTruck,
  FaRegCalendarAlt,
  FaMoneyBill,
  FaCity,
  FaGlobe,
  FaUser,
  FaBuilding,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      };

      fetchOrders();
    }
  }, [user]);

  if (!isMounted || !user) {
    return null;
  }
  console.log(orders);

  const statusColors: { [key: string]: string } = {
    waiting: "bg-yellow-100 text-yellow-800",
    pending: "bg-orange-100 text-orange-800",
    selled: "bg-green-100 text-green-800",
  };

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col gap-6">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt={user.name || ""}
            layout="fill"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 mt-8 transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-3xl font-bold text-[#1a202c] mb-6">
          Історія Замовлень
        </h3>
        {orders.length === 0 ? (
          <p className="text-[#4a5568]">Замовлень не знайдено.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="border p-8 rounded-xl shadow-lg bg-[#f7fafc] hover:bg-[#edf2f7] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6 sm:flex-wrap">
                  <div>
                    <p className="text-xl font-semibold sm:text-[15px] text-[#1a202c]">
                      Номер Замовлення: {order.id}
                    </p>
                    <p className="text-[#4a5568]">
                      Телефон: {order.phoneNumber}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        statusColors[order?.status] ||
                        "bg-[#e2e8f0] text-[#2d3748]"
                      } rounded-full px-3 py-1 mt-3 inline-block`}
                    >
                      {order.status === "waiting"
                        ? "Очікування продавця"
                        : order.status === "pending"
                        ? "Замовлення в обробці"
                        : "Продано"}
                    </p>
                  </div>
                  <div className="text-[#4a5568] flex items-center space-x-2">
                    <FaRegCalendarAlt />
                    <span>
                      {new Date(
                        order.createdAt.seconds * 1000
                      ).toLocaleDateString("uk-UA")}
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <FaMoneyBill className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        Спосіб оплати : {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaBuilding className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        Назва компанії : {order.companyName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCity className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        Місто: {order.city}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTruck className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        Метод Доставки : {order.deliveryMethod}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaGlobe className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        Країна: {order.country}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        Ім&apos;я: {order.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRegCalendarAlt className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        ІПН : {order.vatNumber}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRegCalendarAlt className="text-[#1a202c]" />
                      <span className="text-[#4a5568]">
                        Пошта: {order.email}
                      </span>
                    </div>
                  </div>
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                        <Image
                          src={
                            item.imageUrl || "https://via.placeholder.com/80"
                          }
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#1a202c]">
                          {item.title}
                        </h3>
                        <p className="text-[#4a5568]">${item.price}</p>
                        <p className="text-[#4a5568]">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
