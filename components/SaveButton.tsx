import React from "react";
import { TouchableOpacity, Text } from "react-native";

type SaveButtonProps = {
  onPress: () => void;
  text?: string;
  style?: string;
};

const SaveButton: React.FC<SaveButtonProps> = ({
  onPress,
  text = "Lưu",
  style = "mt-4 p-4 rounded-2xl",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-1 bg-primary items-center border border-neutral-300 ${style}`}
    >
      <Text className="text-neutral-100 text-xl font-inter-semibold">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
