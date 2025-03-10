import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import { router } from "expo-router";
import { handleRegister } from "@/services/userService";
import { useGlobalStore } from "@/store/global";

type RegisterFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const { setFormData } = useGlobalStore();
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [showPassword, setShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterFormType>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name: keyof RegisterFormType, value: string) => {
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (!registerForm.email.includes("@")) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return false;
    }
    if (registerForm.password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return false;
    }
    if (!checked) {
      Alert.alert("Lỗi", "Vui lòng đồng ý với điều khoản");
      return false;
    }
    return true;
  };

  const goOTP = async () => {
    if (!validateForm()) return;

    setFormData(registerForm);

    try {
      await handleRegister(
        registerForm,
        () => {
          router.push("/verify-otp");
        },
        (error) => {
          if (error?.statusCode === 409) {
            Alert.alert("Lỗi", "Email đã tồn tại, vui lòng chọn email khác.");
          } else {
            Alert.alert("Lỗi", "Đăng ký thất bại: " + error.message);
          }
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 w-full items-center justify-start pt-44 bg-neutral"
    >
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold mb-16 text-white text-center">
          Đăng ký
        </Text>

        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="person-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Email"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              value={registerForm.email}
              onChangeText={(text) => handleChange("email", text.trim())}
              keyboardType="email-address"
              autoCapitalize="none"
              blurOnSubmit={false}
            />
          </View>

          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="lock-closed-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Mật khẩu"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={registerForm.password}
              onChangeText={(text) => handleChange("password", text)}
              autoCapitalize="none"
              blurOnSubmit={false}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={25}
                color="#B7BBC1"
              />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="lock-closed-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Xác nhận mật khẩu"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={registerForm.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              autoCapitalize="none"
              blurOnSubmit={false}
            />
          </View>
        </View>

        <View className="flex flex-row items-center my-4">
          <CheckBox
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#3CC18E"
            containerStyle={{ padding: 0, margin: 0 }}
          />
          <Text
            className={`text-md font-inter-light ${
              checked ? "text-primary" : "text-gray-400"
            }`}
          >
            Đồng ý với điều khoản
          </Text>
        </View>

        <TouchableOpacity
          onPress={goOTP}
          className={`p-4 rounded-full shadow-sm mt-4 ${
            checked ? "bg-primary" : "bg-neutral-300"
          }`}
          disabled={!checked}
        >
          <Text className="text-neutral text-center font-bold text-lg">
            Tiếp tục
          </Text>
        </TouchableOpacity>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-neutral-500">Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text className="text-primary font-inter-bold"> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
