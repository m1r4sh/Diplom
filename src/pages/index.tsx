import Image from "next/image";
import { Inter } from "next/font/google";
import Banner from "@/components/Pages/Homepage/Banner";
import Features from "@/components/Pages/Homepage/Features";
import ProductSection from "@/components/Pages/Homepage/ProductSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="max-w-[1340px] m-auto">
      <Banner />
      <Features />
      <ProductSection />
    </div>
  );
}
