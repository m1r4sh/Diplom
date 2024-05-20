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
            Discover and Shop for Motorcycles{" "}
            <span className="text-blue">with Ease</span>
          </h1>
          <p className="text-black text-lg mb-8 max-w-[550px]">
            Purchase motorcycles and motorcycle equipment effortlessly from our
            online store, available on both iOS and Android devices.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              href="/catalog"
              className="hover:text-blue flex items-center gap-2 cursor-pointer border border-transparent hover:border-blue px-4 py-2 rounded-full transition duration-300"
            >
              <MdOutlineStorefront className="h-6 w-6" />
              <span>Catalog</span>
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] w-1/2">
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
            <div className="font-semibold text-gray-900">Lviv, Ukraine</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 lg:mb-0 grow">
          <div className="text-blue-600">
            <CiCalendarDate size={35} />
          </div>
          <div>
            <div className="text-gray-600">Pickup date</div>
            <div className="font-semibold text-gray-900">Tue 15 Feb, 09:00</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 lg:mb-0 grow">
          <div className="text-blue-600">
            <CiCalendarDate size={35} />
          </div>
          <div>
            <div className="text-gray-600">Return date</div>
            <div className="font-semibold text-gray-900">Thu 16 Feb, 11:00</div>
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
