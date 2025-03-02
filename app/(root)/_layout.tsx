import { useEffect } from "react";
import { Slot, Redirect, Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useGlobalStore } from "@/store/global";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

const AppLayout = () => {
  const { loading, isLoggedIn, refetch, error } = useGlobalStore();

  useEffect(() => {
    if (!isLoggedIn && loading) {
      refetch();
    }
  }, [isLoggedIn]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
};

export default AppLayout;
