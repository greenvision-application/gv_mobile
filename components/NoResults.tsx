import React from "react";
import { View, Text, Image } from "react-native";
import images from "@/constants/images";

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image
        source={images.noResult}
        className="w-11/12 h-80"
        resizeMode="contain"
      />
      <Text className="text-xl font-inter-medium text-black-300 mt-5">
        Không có kết quả
      </Text>
      <Text className="text-base text-black-100 mt-2">
        Chúng tôi không tìm thấy bất kỳ kết quả nào
      </Text>
    </View>
  );
};

export default NoResults;
