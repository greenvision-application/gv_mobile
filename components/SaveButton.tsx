import React from "react";
import { TouchableOpacity, Text } from "react-native";

type SaveButtonProps = {
  onPress: () => void;
  text?: string;
};

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, text = "Lưu" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-1 bg-[#3CC18E] p-4 rounded-2xl items-center mt-4 mb-20 border border-neutral-300"
    >
      <Text className="text-neutral-100 text-xl font-semibold">{text}</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
