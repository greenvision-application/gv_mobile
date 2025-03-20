import React, { ReactNode } from "react";
import { View, Text } from "react-native";

type PlantInfoFieldProps = {
  icon: ReactNode;
  children: ReactNode;
  error?: ReactNode;
  required?: boolean;
};

const PlantInfoField: React.FC<PlantInfoFieldProps> = ({
  icon,
  children,
  error,
  required = false,
}) => {
  return (
    <View className="flex flex-col">
      <View className="flex flex-row items-center rounded-2xl p-4 border border-neutral-300 gap-4">
        {icon}
        {children}
        {required && <Text className="text-semantic-error">*</Text>}
      </View>
      {error}
    </View>
  );
};

export default PlantInfoField;
