import Footer from "@/components/Pages/Layout/Footer";
import Header from "@/components/Pages/Layout/Header";
import ShoppingCart from "@/components/UIKit/ShoppingCart";
import { ToastProvider } from "@/providers/ToastProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ToastProvider>
    </>
  );
}
