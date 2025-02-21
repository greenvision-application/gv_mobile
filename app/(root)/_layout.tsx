import { useEffect } from "react";
import { Slot, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text } from "react-native";
import { useGlobalStore } from "@/store/global";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getCurrentUser } from "@/libs/appwrite";

const AppLayout = () => {
  const { loading, isLoggedIn, user, refetch, error } = useGlobalStore();
  const {
    data: appwriteUser,
    loading: appwriteLoading,
    error: appwriteError,
    refetch: appwriteRefetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      refetch();
    }
  }, [refetch, loading, isLoggedIn]);

  console.log("Store state:", { loading, isLoggedIn, user, error });

  if (loading || appwriteLoading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary" size="large" />
      </SafeAreaView>
    );
  }

  if (error || appwriteError) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <Text>Error: {error || appwriteError}</Text>
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
};

export default AppLayout;
