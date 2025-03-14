import React from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
}

const tabScreens = ["index", "timeline", "scan", "garden"];

const Header: React.FC<HeaderProps> = ({ title }) => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const route = useRoute();

  const isTabScreen = tabScreens.includes(route.name);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        className="relative w-full bg-primary shadow-lg"
        style={{ height: windowHeight / 8 }}
      >
        <View
          className="absolute left-4 right-4 flex flex-row items-center"
          style={{
            top: Platform.OS === "ios" ? 60 : 20,
          }}
        >
          {!isTabScreen && (
            <TouchableOpacity
              className="absolute left-0 flex flex-row bg-neutral/30 backdrop-blur-lg rounded-full size-12 items-center justify-center shadow-sm"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          )}
          <View className="flex-1 items-center">
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
