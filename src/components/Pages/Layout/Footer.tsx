import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-[#F9FAFB] py-12">
      <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold mb-6">MOTOSHOP</h2>
          <p className="mb-4">Полтава, Україна</p>
          <p>+098 4784 273 12</p>
          <p>motoshoppoltava@gmail.com</p>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#F472B6] transition">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-[#F472B6] transition">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-[#F472B6] transition">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#F9FAFB] mt-12 pt-6 text-center">
        <p>&copy; 2024 Motoshop, Дипломна робота</p>
      </div>
    </footer>
  );
};

export default Footer;
