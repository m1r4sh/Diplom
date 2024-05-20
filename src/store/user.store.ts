import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  uid: string;
  name: string | null;
  email: string | null;
  admin: boolean;
  profilePicture: string | null;
}

interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;
}

const useUser = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useUser;
