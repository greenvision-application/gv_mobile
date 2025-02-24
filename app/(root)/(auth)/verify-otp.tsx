import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View className="flex-1 w-full items-center justify-center bg-neutral">
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold mb-8 text-white text-center">
          Xác minh OTP
        </Text>

        <Text className="text-neutral-500 text-center mb-8">
          Vui lòng nhập mã OTP đã được gửi đến số điện thoại của bạn
        </Text>

        <View className="flex flex-row justify-center gap-2 mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              className="w-12 h-12 border border-neutral-300 rounded-xl text-center text-white text-xl font-inter-bold"
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
            />
          ))}
        </View>

        <View className="flex flex-row justify-center items-center mb-8">
          <Text className="text-neutral-500">Không nhận được mã? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-inter-bold">Gửi lại</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-neutral-300 p-4 rounded-full shadow-sm mt-4 active:bg-primary">
          <Text className="text-neutral text-center font-bold text-lg">
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
