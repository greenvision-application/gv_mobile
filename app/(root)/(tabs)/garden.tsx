import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Garden = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-3xl font-bold text-center text-primary mb-6">
        My Garden
      </Text>
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          className="bg-primary px-8 py-4 rounded-full shadow-lg"
          onPress={() => router.push("/onboard")}
        >
          <Text className="text-white font-semibold text-lg">
            Go to Onboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Garden;
