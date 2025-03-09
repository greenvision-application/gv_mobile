import { create } from "zustand";
import { getCurrentUser, logout } from "@/libs/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import variables from "@/constants/variables";
import helper from "@/libs/helper";
import { getStatus } from "@/services/userService";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface FormData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  gender?: string;
  dayOfBirth?: string;
}

interface GlobalState {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  uploadedFileUrl: string | null;
  onboarded: boolean;
  formData: FormData | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setOnboarded: (onboarded: boolean) => void;

  // Async actions
  completeOnboarding: () => void;
  refetch: () => Promise<void>;
  setUploadedFileUrl: (url: string | null) => void;
  setFormData: (formData: Partial<FormData>) => void;
  resetForm: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  loading: true,
  isLoggedIn: false,
  error: null,
  uploadedFileUrl: null,
  onboarded: false,
  formData: null,

  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setOnboarded: (onboarded) => set({ onboarded }),
  setUploadedFileUrl: (url: string | null) => {
    set({ uploadedFileUrl: url });
  },

  refetch: async () => {
    try {
      set({ loading: true, error: null });

      const onboardedStatus = await AsyncStorage.getItem(
        variables.localStorage.onboarded
      );
      set({ onboarded: onboardedStatus === "true" });
      const token = await helper.getToken();

      let user = null;

      if (token) {
        const response = await getStatus();
        if (response) {
          user = response;
        }
      } else {
        user = await getCurrentUser();
      }

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

  completeOnboarding: async () => {
    await AsyncStorage.setItem(variables.localStorage.onboarded, "true");
    set({ onboarded: true });
  },

  setFormData: (formData) => {
    set((state) => ({
      formData: { ...state.formData, ...formData },
    }));
  },
  resetForm: () =>
    set({
      formData: null,
      loading: false,
    }),
}));
