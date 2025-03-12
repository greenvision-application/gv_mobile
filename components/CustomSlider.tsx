// src/components/CustomSlider.tsx
import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import FixedSlider from "./FixedSlider";

interface CustomSliderProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  label?: string;
  disabled?: boolean;
  color?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 0,
  label = "Slider",
  disabled = false,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue: number) => {
    if (!disabled) {
      setValue(newValue);
    }
  };
  const interpolate = (start: number, end: number) => {
    let k = (value - min) / (max - min);
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${g},${r},${b})`;
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <FixedSlider
        value={value}
        onValueChange={handleValueChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        allowTouchTrack={false}
        minimumTrackTintColor={color()}
        trackStyle={{ height: 7, borderRadius: 10 }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: "white" }}
        disabled={disabled}
      />
      {/* <Text style={styles.valueText}>Value: {value}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  valueText: {
    paddingTop: 10,
    fontSize: 14,
  },
});

export default CustomSlider;
