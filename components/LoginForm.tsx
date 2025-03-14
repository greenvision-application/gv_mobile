import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { handleLoginEmail } from "@/services/userService";
import { useGlobalStore } from "@/store/global";
import helper from "@/libs/helper";

export default function LoginForm() {
  const { refetch, loading } = useGlobalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => password.length >= 6;

  const loginEmail = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    await handleLoginEmail(
      { email, password },
      (response) => {
        helper.setToken(response);
        refetch();
        router.push("/");
      },
      (error) => {
        if (error.statusCode === 401) {
          Alert.alert("Lỗi", "Email hoặc mật khẩu không đúng");
        } else {
          Alert.alert("Lỗi", "Đăng nhập thất bại");
        }
      }
    );
  };

  const goSignUp = () => {
    router.push("/sign-up");
  };

  const isFormValid = email.length > 0 && password.length > 0;

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
              placeholder="Nhập email của bạn"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
            />
          </View>

          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="lock-closed-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Nhập mật khẩu của bạn"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
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
          onPress={loginEmail}
          disabled={!isFormValid}
          className={`p-4 rounded-full shadow-sm mt-4 ${
            isFormValid ? "bg-primary" : "bg-neutral-300"
          }`}
        >
          {loading ? (
            <ActivityIndicator className="text-primary" size="small" />
          ) : (
            <Text className="text-neutral text-center font-bold text-lg">
              Tiếp tục
            </Text>
          )}
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
