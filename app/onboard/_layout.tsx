import { Slot, Redirect } from "expo-router";
import { useGlobalStore } from "@/store/global";

export default function OnboardLayout() {
  const { isLoggedIn, onboarded } = useGlobalStore();

  // Nếu đã onboard và đã đăng nhập, chuyển đến màn hình chính
  if (onboarded && isLoggedIn) {
    return <Redirect href="/" />;
  }

  // Nếu đã onboard nhưng chưa đăng nhập, chuyển đến đăng nhập
  if (onboarded && !isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
