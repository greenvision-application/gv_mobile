import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { queryClient } from "@/libs/tanstackQuery";
import "./global.css";
import usePushNotifications from "@/services/usePushNotifications";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.ttf"),
  });
  const { expoPushToken } = usePushNotifications();
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </QueryClientProvider>
  );
}
