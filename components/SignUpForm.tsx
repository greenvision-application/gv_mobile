import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import { useRouter } from "expo-router";
import { handleRegister } from "@/services/userService";
import { useGlobalStore } from "@/store/global";

export default function SignUpForm() {
  const { setFormData } = useGlobalStore();
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [showPassword, setShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
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
      alert("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (!registerForm.email.includes("@")) {
      alert("Email không hợp lệ");
      return false;
    }
    if (registerForm.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Mật khẩu không khớp");
      return false;
    }
    if (!checked) {
      alert("Vui lòng đồng ý với điều khoản");
      return false;
    }
    return true;
  };

  const goOTP = async () => {
    if (!validateForm()) return;

    setFormData({
      email: registerForm.email,
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword,
    });

    try {
      await handleRegister(
        registerForm,
        (response) => {
          router.push("/verify-otp");
        },
        (error) => {
          if (error?.statusCode === 409) {
            alert("Email đã tồn tại, vui lòng chọn email khác.");
          } else {
            alert("Đăng ký thất bại: " + error.message);
          }
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const goSignIn = () => {
    router.replace("/sign-in");
  };

  const PasswordInput = ({
    placeholder,
    value,
    onChange,
  }: {
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
  }) => (
    <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
      <Ionicons name="lock-closed-sharp" size={25} color="#3CC18E" />
      <TextInput
        placeholder={placeholder}
        className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
        placeholderTextColor="#9CA3AF"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={25}
          color="#B7BBC1"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 w-full items-center justify-start pt-44 bg-neutral">
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
            />
          </View>

          <PasswordInput
            placeholder="Mật khẩu"
            value={registerForm.password}
            onChange={(text) => handleChange("password", text)}
          />

          <PasswordInput
            placeholder="Xác nhận mật khẩu"
            value={registerForm.confirmPassword}
            onChange={(text) => handleChange("confirmPassword", text)}
          />
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
          <TouchableOpacity onPress={goSignIn}>
            <Text className="text-primary font-inter-bold"> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
