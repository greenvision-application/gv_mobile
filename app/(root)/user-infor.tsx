import React from "react";
import { Header, UserInfoForm } from "@/components";
import { SafeAreaProvider } from "react-native-safe-area-context";

const CollectUserInformation = () => {
  return (
    <SafeAreaProvider>
      <Header title="Cập nhật"/>
      <UserInfoForm />
    </SafeAreaProvider>
  );
};

export default CollectUserInformation;
