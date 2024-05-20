import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useUser from "@/store/user.store";
import { signInWithGoogle, logOut } from "@/utils/firebase/config";
import ShoppingCart from "@/components/UIKit/ShoppingCart";
import { RiAdminFill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { user, setUser, removeUser } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = JSON.parse(
      localStorage.getItem("user-storage") as string
    );
    if (storedUser && storedUser.state && storedUser.state.user) {
      setUser(storedUser.state.user);
    }
  }, [setUser]);

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          admin: user.admin,
        });
      }
    } catch (error) {
      console.error("Error during sign-in: ", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      removeUser();
      router.push("/");
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials.slice(0, 2);
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <ToastContainer />
      <div className="w-full flex justify-between items-center px-6 sm:flex-col sm:gap-4">
        <Link className="flex items-center" href="/">
          <Image
            src="https://promua-group.com/image/cachewebp/catalog/products/x25_pidshipnyky-290x290.webp.pagespeed.ic.my80nGdjvQ.webp"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-3 text-xl font-semibold text-blue">Store</span>
        </Link>
        <nav className="flex space-x-8 ">
          <Link
            href="/catalog"
            className="hover:text-blue transition duration-300"
          >
            Каталог
          </Link>
          <Link
            href="/about-us"
            className="hover:text-blue transition duration-300"
          >
            Про нас
          </Link>
          <Link
            href="/contact-us"
            className="hover:text-blue transition duration-300"
          >
            Зв&lsquo;язатись з нами
          </Link>
        </nav>
        <div className="flex space-x-4 items-center">
          {isMounted && user ? (
            <>
              <div>
                <ShoppingCart />
              </div>

              {user.admin && ( // Check if user is admin
                <Link
                  href="/admin"
                  className="bg-blue cursor-pointer text-white px-4 py-2 rounded-full hover:bg-transparent hover:text-blue border hover:border-blue transition duration-300"
                >
                  <RiAdminFill size={25} />
                </Link>
              )}

              <Link
                href="/profile"
                className="bg-blue cursor-pointer text-white px-4 py-2 rounded-full hover:bg-transparent hover:text-blue border hover:border-blue transition duration-300"
              >
                <span>{getInitials(user.name || "")}</span>
              </Link>
              <button
                onClick={handleLogOut}
                className="bg-blue cursor-pointer text-white px-4 py-2 rounded-full hover:bg-transparent hover:text-blue border hover:border-blue transition duration-300"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={handleSignIn}
              className="cursor-pointer hover:text-blue border border-transparent hover:border-blue px-4 py-2 rounded-full transition duration-300"
            >
              Sign in Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
