import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleProp, ViewStyle } from "react-native";

type DropdownItem = {
  label: string;
  value: string;
};

type PlantDropdownProps = {
  data: DropdownItem[];
  value: string;
  onChange: (item: DropdownItem) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
};

const PlantDropdown: React.FC<PlantDropdownProps> = ({
  data,
  value,
  onChange,
  placeholder,
  style,
}) => {
  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={[{ flex: 1 }, style]}
      placeholderStyle={{ color: "#9CA3AF" }}
    />
  );
};

export default PlantDropdown;
