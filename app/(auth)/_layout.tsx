import { Slot, Redirect } from "expo-router";
import { useGlobalStore } from "@/store/global";

export default function AuthLayout() {
  const { isLoggedIn, loading } = useGlobalStore();
  if (!loading && isLoggedIn) return <Redirect href="/" />;

  return <Slot />;
}
