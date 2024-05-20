// ToastContext.tsx
import React, { createContext, useContext } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext<
  (message: string, options?: ToastOptions) => void
>(() => {});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const showToast = (message: string, options?: ToastOptions) => {
    toast(message, options);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
