import React, { ReactNode } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type PlantInfoFieldProps = {
  icon: ReactNode;
  children: ReactNode;
  error?: ReactNode;
};

const PlantInfoField: React.FC<PlantInfoFieldProps> = ({
  icon,
  children,
  error,
}) => {
  return (
    <View className="flex flex-col">
      <View className="flex flex-row items-center rounded-2xl p-4 border border-neutral-300 gap-4">
        {icon}
        {children}
      </View>
      {error}
    </View>
  );
};

export default PlantInfoField;
