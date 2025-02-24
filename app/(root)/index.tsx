import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const Onboard = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Onboard</Text>

      <Link href="/sign-in" asChild>
        <Pressable className="bg-primary px-4 py-2 rounded-lg mt-4">
          <Text className="text-white font-semibold">Sign In</Text>
        </Pressable>
      </Link>

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

export default Onboard;
