import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const goOTP = () => {
    router.replace("/verify-otp");
  };
  const goSignUp = () => {
    router.replace("/sign-up");
  };

  return (
    <View className="flex-1 w-full items-center justify-start bg-neutral pt-44">
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold mb-16 text-white text-center">
          Đăng nhập
        </Text>

        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="person-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Email email của bạn"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
            />
          </View>

          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="lock-closed-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Mật khẩu"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={25}
                color="#B7BBC1"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row justify-end items-center my-4">
          <TouchableOpacity>
            <Text className="text-primary text-md font-inter-light">
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={goOTP}
          className="bg-neutral-300 p-4 rounded-full shadow-sm mt-4 active:bg-primary"
        >
          <Text className="text-neutral text-center font-bold text-lg">
            Tiếp tục
          </Text>
        </TouchableOpacity>

        <View className="mt-4 flex-row justify-center">
          <Text className="text-neutral-500">Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={goSignUp}>
            <Text className="text-primary font-inter-bold"> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
