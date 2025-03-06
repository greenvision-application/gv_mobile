import React from "react";
import { View, Text, StatusBar, Platform, Dimensions } from "react-native";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        className="relative w-full bg-primary shadow-lg"
        style={{ height: windowHeight / 8 }}
      >
        <View
          className="absolute left-4 right-4"
          style={{
            top: Platform.OS === "ios" ? 60 : 20,
          }}
        >
          <View className="flex flex-row items-center w-full justify-center">
            <Text className="text-neutral text-2xl font-inter-semibold tracking-wide">
              {title}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;
