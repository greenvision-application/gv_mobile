import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { useGlobalStore } from "@/store/global";
import { handleVerifyOTP, handleRegister } from "@/services/userService";

export default function VerifyOtp() {
  const { formData, resetForm } = useGlobalStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !isResendActive) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResendActive(true);
    }
    return () => clearInterval(timer);
  }, [countdown, isResendActive]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value !== "" && index < 5 && !otp[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const callVerifyOTP = async () => {
    if (otp.some((digit) => digit === "")) {
      setError("Vui lòng nhập đầy đủ mã OTP");
      return;
    }

    try {
      await handleVerifyOTP(
        otp.join(""),
        formData!,
        (response) => {
          resetForm();
          router.replace("/user-infor");
        },
        (error) => {
          if (error?.statusCode === 400) {
            alert("Mã OTP không hợp lệ.");
          } else {
            alert("Xác thực thất bại: " + error.message);
          }
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const resend = async () => {
    if (isResendActive) {
      setCountdown(60);
      setIsResendActive(false);
      try {
        await handleRegister(
          formData!,
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
    }
  };

  return (
    <View className="flex-1 w-full items-center justify-start bg-neutral pt-56">
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold mb-8 text-white text-center">
          Xác minh OTP
        </Text>

        <Text className="text-neutral-500 text-center mb-8 px-14">
          Vui lòng nhập mã xác minh OTP chúng đã gửi đến email của bạn
        </Text>

        <View className="flex flex-row justify-center gap-2 mb-5">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="w-12 h-12 border border-neutral-300 rounded-xl text-center text-white text-xl font-inter-bold"
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
            />
          ))}
        </View>

        {error ? (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        ) : null}

        <TouchableOpacity
          className="bg-neutral-300 p-4 rounded-full shadow-sm mb-8 mt-4 active:bg-primary"
          onPress={callVerifyOTP}
        >
          <Text className="text-neutral text-center font-bold text-lg">
            Xác nhận
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row justify-center items-center">
          <Text className="text-neutral-500">Không nhận được mã? </Text>

          <TouchableOpacity onPress={resend} disabled={!isResendActive}>
            <Text
              className={`${
                isResendActive ? "text-primary" : "text-neutral-500"
              } font-inter-bold`}
            >
              {isResendActive ? "Gửi lại" : `Gửi lại (${countdown}s)`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
