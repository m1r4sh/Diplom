import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineStorefront } from "react-icons/md";

const Banner = () => {
  return (
    <div className="relative bg-white py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-0">
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Шукайте і купуйте мотоцикли{" "}
            <span className="text-blue">з комфортом!</span>
          </h1>
          <p className="text-black text-lg mb-8 max-w-[550px]">
            У нас у продажу Ви зустрінете відмінні варіанти для початківців та
            мотоцикли, які не залишать байдужим справжнього професіонала, який
            точно знає, чого він хоче.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              href="/catalog"
              className="hover:text-blue flex items-center gap-2 cursor-pointer border border-transparent hover:border-blue px-4 py-2 rounded-full transition duration-300"
            >
              <MdOutlineStorefront className="h-6 w-6" />
              <span>Каталог</span>
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] w-full md:w-1/2">
          <Image
            src={
              "https://images.unsplash.com/photo-1572507424028-510c4c5284a6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Motorcycle Image"
            fill
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="mt-10 bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-4 lg:mb-0 grow">
          <div className="text-blue-600">
            <FaLocationDot size={28} />
          </div>
          <div>
            <div className="text-gray-600">Location</div>
            <div className="font-semibold text-gray-900">Poltava, Ukraine</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 lg:mb-0 grow">
          <div className="text-blue-600">
            <CiCalendarDate size={35} />
          </div>
          <div>
            <div className="text-gray-600">Графік роботи:</div>
            <div className="font-semibold text-gray-900">З 09:00-19:00</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 lg:mb-0 grow">
          <div className="text-blue-600">
            <CiCalendarDate size={35} />
          </div>
          <div>
            <div className="text-gray-600">Термін доставки:</div>
            <div className="font-semibold text-gray-900">1-3 дні</div>
          </div>
        </div>
        {/* <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300">
          Search
        </button> */}
      </div>
    </div>
  );
};

export default Banner;
