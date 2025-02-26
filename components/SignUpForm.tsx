import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";

export default function SignUpForm() {
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");

  return (
    <View className="flex-1 w-full items-center justify-center bg-neutral">
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold mb-16 text-white text-center">
          Đăng Ký
        </Text>

        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="person-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Email hoặc số điện thoại"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
              value={phone}
              onChangeText={(text) => setPhone(text.trim())}
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

          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="lock-closed-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Xác nhận mật khẩu"
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

        <View className="flex flex-row items-center my-4">         
            <CheckBox
              checked={checked}
              onPress={toggleCheckbox}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#3CC18E"
              containerStyle={{padding: 0, margin: 0}}
            />          
          <Text className={`text-md font-inter-light ${checked ? "text-primary" : "text-gray-400"}`}>
            Đồng ý với điều khoản
          </Text>
        </View>

        <TouchableOpacity className="bg-neutral-300 p-4 rounded-full shadow-sm mt-4 active:bg-primary">
          <Text className="text-neutral text-center font-bold text-lg">
            Tiếp tục
          </Text>
        </TouchableOpacity>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-neutral-500">Bạn đã có tài khoản? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-inter-bold"> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
