import { SafeAreaView, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <SafeAreaView className="bg-neutral h-full flex justify-center items-center">
      <ActivityIndicator className="text-primary" size="large" />
    </SafeAreaView>
  );
};

export default Loading;
