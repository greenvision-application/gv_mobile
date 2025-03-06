import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <SafeAreaView className="bg-neutral h-full flex justify-center items-center">
      <View className="flex flex-row items-center bg-semantic-error border-l-4 border-red-500 p-3 rounded-lg">
        <Ionicons
          name="alert-circle-outline"
          size={35}
          color="red"
          className="mr-2"
        />
        <Text className="text-semantic-warning text-lg">{message}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorMessage;
