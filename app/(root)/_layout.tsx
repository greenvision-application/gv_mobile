import { useEffect } from "react";
import { Slot, Redirect, Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View } from "react-native";
import { useGlobalStore } from "@/store/global";
import { usePathname } from "expo-router";
import { useRoute } from "@react-navigation/native";

const AppLayout = () => {
  // const { loading, isLoggedIn, user, refetch, error } = useGlobalStore();
  // const pathname = usePathname();
  // const route = useRouter();

  // useEffect(() => {
  //   console.log("🔥 useEffect triggered in AppLayout");

  //   if (!isLoggedIn && !loading) {
  //     console.log("⏳ User chưa đăng nhập, refetch...");
  //     refetch();
  //   }
  // }, [isLoggedIn, loading]);

  // console.log("Path name: ", pathname);
  // console.log("Store:", loading, isLoggedIn, user, error);

  // if (loading) {
  //   return (
  //     <SafeAreaView className="bg-white h-full flex justify-center items-center">
  //       <ActivityIndicator className="text-primary" size="large" />
  //     </SafeAreaView>
  //   );
  // }

  // if (error) {
  //   return (
  //     <SafeAreaView className="bg-white h-full flex justify-center items-center">
  //       <Text>Error: {error}</Text>
  //     </SafeAreaView>
  //   );
  // }

  // if (!user) {
  //   return <Redirect href="/sign-in" />;
  // }

  return <Slot />;
};

export default AppLayout;
