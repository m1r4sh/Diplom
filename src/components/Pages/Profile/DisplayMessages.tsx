import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase/config";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

const DisplayMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesSnapshot = await getDocs(collection(db, "contacts"));
      const messagesData = messagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(messagesData);
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Повідомлення
        </h2>
        {messages.length === 0 ? (
          <p className="text-gray-600 text-center">Немає повідомлень.</p>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-black rounded-full flex items-center justify-center bg-[#eaeaea]">
                    <span className="text-xl font-bold">
                      {msg.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {msg.name}
                    </h3>
                    <p className="text-gray-600">{msg.email}</p>
                  </div>
                </div>
                <p className="text-gray-700">{msg.message}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(msg.timestamp.seconds * 1000).toLocaleString(
                    "uk-UA",
                    { timeZone: "Europe/Kiev" }
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayMessages;
