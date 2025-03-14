import React from "react";
import { MultiSelect } from "react-native-element-dropdown";

type SelectItem = {
  label: string;
  value: string;
};

type PlantMultiSelectProps = {
  data: SelectItem[];
  value: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
};

const PlantMultiSelect: React.FC<PlantMultiSelectProps> = ({
  data,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <MultiSelect
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      placeholderStyle={{ color: "#9CA3AF" }}
      style={{
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        padding: 12,
      }}
      value={value}
      onChange={onChange}
    />
  );
};

export default PlantMultiSelect;
