import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase/config";
import Image from "next/image";

interface Order {
  id: string;
  items: any[];
  userId: string;
  createdAt: string;
  status: string;
  name: string;
  phoneNumber: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

const statusColors: { [key: string]: string } = {
  waiting: "bg-yellow-100 text-yellow-800",
  pending: "bg-orange-100 text-orange-800",
  selled: "bg-green-100 text-green-800",
};

const ManageProducts = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      const usersMap: { [key: string]: User } = {};
      for (const order of ordersData) {
        if (!usersMap[order.userId]) {
          const userDocRef = doc(db, "users", order.userId);
          const userSnapshot = await getDoc(userDocRef);
          if (userSnapshot.exists()) {
            usersMap[order.userId] = {
              id: userSnapshot.id,
              ...userSnapshot.data(),
            } as User;
          }
        }
      }

      setUsers(usersMap);
      setOrders(ordersData);
    };

    fetchOrdersAndUsers();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await deleteDoc(orderDocRef);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16">
                <Image
                  src={
                    users[order.userId]?.profilePicture ||
                    "/default-profile.png"
                  }
                  alt={users[order.userId]?.name || "User"}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-baseline">
                <h3 className="text-lg font-semibold text-gray-900">
                  {users[order.userId]?.name || "Unknown User"}
                </h3>
                <p className="text-gray-600">{users[order.userId]?.email}</p>
                <p className="text-gray-600">Phone: {order.phoneNumber}</p>
                <p className="text-gray-600">Order ID: {order.id}</p>
                <p
                  className={`text-sm font-medium ${
                    statusColors[order.status] || "bg-gray-100 text-gray-800"
                  } rounded-full px-2 py-1`}
                >
                  Status:{" "}
                  {order.status === "waiting"
                    ? "Очікування продавця"
                    : order.status === "pending"
                    ? "Замовлення в обробці"
                    : "Продано"}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="waiting">Очікування продавця</option>
                <option value="pending">Замовлення в обробці</option>
                <option value="selled">Продано</option>
              </select>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Видалити
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageProducts;
