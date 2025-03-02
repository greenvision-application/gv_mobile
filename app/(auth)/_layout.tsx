import { Slot, Redirect } from "expo-router";
import { useGlobalStore } from "@/store/global";
import { SafeAreaView, ActivityIndicator } from "react-native";

export default function AuthLayout() {
  const { isLoggedIn, loading } = useGlobalStore();
  if (!loading && isLoggedIn) return <Redirect href="/" />;

  return <Slot />;
}
