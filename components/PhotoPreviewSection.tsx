import { Fontisto } from "@expo/vector-icons";
import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { TouchableOpacity, SafeAreaView, Image, View } from "react-native";

const PhotoPreviewSection = ({
  photo,
  handleRetakePhoto,
}: {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
}) => {
  return (
    <SafeAreaView className="flex-1 bg-black items-center justify-center">
      <View className="rounded-2xl p-[1px] w-[95%] bg-neutral-600 justify-center items-center">
        <Image
          className="w-[95%] h-[85%] rounded-2xl"
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
      </View>
      <View className="mt-[4%] flex-row justify-center w-full">
        <TouchableOpacity
          className="bg-gray-500 rounded-3xl p-2.5 items-center justify-center"
          onPress={handleRetakePhoto}
        >
          <Fontisto name="trash" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotoPreviewSection;
