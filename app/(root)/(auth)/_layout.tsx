import { Slot, Redirect } from "expo-router";
import { useGlobalStore } from "@/store/global";
import { SafeAreaView, ActivityIndicator } from "react-native";

export default function AuthLayout() {
  const { isLoggedIn, loading } = useGlobalStore();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary" size="large" />
      </SafeAreaView>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
