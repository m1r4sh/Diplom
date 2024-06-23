import Image from "next/image";
import { FaDollarSign, FaUserTie, FaClock, FaHeadset } from "react-icons/fa";

const Features = () => {
  return (
    <div className="relative bg-white py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-0">
        <div className="lg:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Motorcycle Image"
            width={800}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-16 mt-10 lg:mt-0">
          <div className="flex flex-col items-start">
            <div className="bg-[#1572D3] rounded-lg p-4">
              <span className="bg-blue-100 text-blue-600 font-bold py-1 px-3 rounded-full text-sm text-white uppercase inline-block">
                Чому обирають нас?
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 my-4">
              Відчуйте найкраще завдяки нашим пропозиціям з мотоциклами.
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-[#1572D3] rounded-lg p-4">
                  <FaDollarSign
                    className="h-6 w-6 text-blue-600 mt-1"
                    color="white"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Низькі ціни
                  </h3>
                  <p className="text-gray-600">
                    Знайшли нижчу ціну? Ми повернемо вам 100% різниці.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#1572D3] rounded-lg p-4">
                  <FaUserTie
                    className="h-6 w-6 text-blue-600 mt-1"
                    color="white"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Кваліфіковані спеціалісти
                  </h3>
                  <p className="text-gray-600">
                    Потрібна допомога? Наша команда досвідчених фахівців завжди
                    на зв&apos;язку, щоб допомогти.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#1572D3] rounded-lg p-4">
                  <FaClock
                    className="h-6 w-6 text-blue-600 mt-1"
                    color="white"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Швидка доставка
                  </h3>
                  <p className="text-gray-600">
                    Замовляйте в будь-який час і отримуйте швидку доставку
                    товарів.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#1572D3] rounded-lg p-4">
                  <FaHeadset
                    className="h-6 w-6 text-blue-600 mt-1"
                    color="white"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Підтримка клієнтів цілодобово, 7 днів на тиждень
                  </h3>
                  <p className="text-gray-600">
                    Є питання? Наша служба підтримки доступна цілодобово для
                    вашої допомоги.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
