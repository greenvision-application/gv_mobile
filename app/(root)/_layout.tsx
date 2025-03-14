import { useEffect } from "react";
import { Slot, Redirect, Link, useRouter } from "expo-router";
import { useGlobalStore } from "@/store/global";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { usePathname } from "expo-router";

const AppLayout = () => {
  const { loading, isLoggedIn, refetch, error, onboarded } = useGlobalStore();
  
  useEffect(() => {
    if (!isLoggedIn && loading) {
      refetch();
    }
  }, [isLoggedIn]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  if (!onboarded) {
    return <Redirect href="/onboard" />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
};

export default AppLayout;
