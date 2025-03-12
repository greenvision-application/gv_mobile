import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface PlantTextInputProps extends TextInputProps {
  // Add any additional props you need
}

const PlantTextInput: React.FC<PlantTextInputProps> = (props) => {
  return (
    <TextInput
      className="flex-1 text-neutral-600 font-inter text-lg"
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
};

export default PlantTextInput;
