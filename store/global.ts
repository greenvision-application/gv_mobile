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
  uploadedFileUrl: string | null;
  refetch: () => Promise<void>;
  setUploadedFileUrl: (url: string | null) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  loading: true,
  isLoggedIn: false,
  error: null,
  uploadedFileUrl: null,

  setUploadedFileUrl: (url: string | null) => {
    set({ uploadedFileUrl: url });
  },

  refetch: async () => {
    try {
      const user = await getCurrentUser();

      set({
        user,
        isLoggedIn: !!user,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      if (error.code === 401) {
        set({ user: null, isLoggedIn: false, loading: false, error: null });
      } else {
        set({
          user: null,
          isLoggedIn: false,
          loading: false,
          error: error.message || "Có lỗi xảy ra khi kiểm tra đăng nhập",
        });
      }
    }
  },
}));
