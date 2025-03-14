import React from "react";
import { Slider as RNESlider, SliderProps } from "@rneui/themed";

const FixedSlider: React.FC<SliderProps> = (props) => {
  return <RNESlider {...props} />;
};

export default FixedSlider;
