import { create } from "zustand";
import { getCurrentUser } from "@/libs/appwrite";
import { router, usePathname } from "expo-router";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalState {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  loading: true,
  isLoggedIn: false,
  error: null,

  refetch: async () => {
    console.log("🔄 Refetching user...");
    try {
      const user = await getCurrentUser();
      console.log("✅ Fetched user:", user);

      set({
        user,
        isLoggedIn: !!user,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.error("❌ Refetch error:", error);
      set({
        user: null,
        isLoggedIn: false,
        loading: false,
        error: error.message,
      });
    }
  },
}));
