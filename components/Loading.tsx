import { SafeAreaView, ActivityIndicator, Text } from "react-native";
import React from "react";

const Loading = ({ content }: { content?: string }) => {
  return (
    <SafeAreaView className="bg-neutral h-full flex justify-center items-center">
      <ActivityIndicator className="text-primary" size="large" />
      <Text className="mt-4 text-neutral-500">
        {content ? content : "Đang tải dữ liệu..."}
      </Text>
    </SafeAreaView>
  );
};

export default Loading;
