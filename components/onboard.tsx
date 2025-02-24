import { View, Text, Image } from "react-native";
import React from "react";

interface OnboardingContentProps {
  image: any;
  title: string;
  description: string;
  page: number;
  totalPages: number;
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({ 
  image, 
  title, 
  description, 
  page, 
  totalPages 
}) => {
  return (
    <View className="h-full bg-neutral px-5">
      <Image source={image} resizeMode="contain" className="w-full h-3/5" />
      
      <Text className="font-bold text-2xl text-center m-4">{title}</Text>
      <Text className="text-center m-2 font-inter-semibold text-lg text-neutral-400 ">{description}</Text>

      <View className="flex-row justify-center space-x-2 my-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mr-1 ${
              page === index ? "bg-primary w-4" : "bg-neutral-400"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default OnboardingContent;