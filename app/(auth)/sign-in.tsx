import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { Link, Redirect } from "expo-router";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { useGlobalStore } from "@/store/global";
import { login } from "@/libs/appwrite";

const SignIn = () => {
  const { loading, isLoggedIn, refetch } = useGlobalStore();
  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="h-full bg-neutral">
      <Image
        source={images.signIn}
        // resizeMode="contain"
        className="w-full h-3/5"
      />
      <View className="px-6 mt-6">
        <Link href="/(auth)/form" asChild>
          <Pressable className="bg-primary py-4 rounded-full shadow-md active:opacity-90">
            <Text className="text-neutral font-inter-semibold text-xl text-center">
              Đăng nhập
            </Text>
          </Pressable>
        </Link>

        <View className="flex-row items-center my-6 mx-8">
          <View className="flex-1 h-[1px] bg-neutral-400" />
          <Text className="mx-4 font-inter-medium text-neutral-500">Hoặc</Text>
          <View className="flex-1 h-[1px] bg-neutral-400" />
        </View>

        <Pressable
          onPress={handleLogin}
          className="bg-semantic-info py-4 rounded-full flex-row items-center justify-center space-x-3 mb-5 shadow-sm active:opacity-90"
        >
          <Image
            source={icons.googleIcon}
            className="w-7 h-7"
            // resizeMode="contain"
          />
          <Text className="text-neutral font-inter-semibold text-xl text-center ml-5">
            Tiếp tục với Google
          </Text>
        </Pressable>

        <Pressable className="bg-neutral-500 py-4 rounded-full flex-row items-center justify-center space-x-3 shadow-sm active:opacity-90">
          <Image
            source={icons.facebookIcon}
            className="w-8 h-8"
            // resizeMode="contain"
          />
          <Text className="text-neutral font-inter-semibold text-xl text-center ml-5">
            Tiếp tục với Facebook
          </Text>
        </Pressable>

        <View className="flex-row justify-center items-center mt-8 space-x-2">
          <Text className="text-neutral-600 font-inter-medium text-base">
            Bạn chưa có tài khoản?
          </Text>
          <Link
            push
            href="/sign-up"
            className="text-primary font-inter-semibold text-base"
          >
            {" "}
            Đăng ký
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
