import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Onboard = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Onboard</Text>

      <Link href="/sign-in" asChild>
        <Pressable className="bg-primary px-4 py-2 rounded-lg mt-4">
          <Text className="text-white font-semibold">Sign In</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Onboard;
