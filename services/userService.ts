import variables from "@/constants/variables";
import request from "@/libs/apiClient";
import { FormData } from "@/store/global";

const handleRegister = async (
  registerForm: FormData,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = { email: registerForm.email };

  return request({
    method: variables.methods.post,
    url: variables.urls.register,
    data,
    onSuccess,
    onError,
  });
};

const handleVerifyOTP = async (
  otpForm: FormData,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = {
    email: otpForm.email,
    otp: otpForm.otp,
    password: otpForm.password,
  };

  return request({
    method: variables.methods.post,
    url: variables.urls.otp,
    data,
    onSuccess,
    onError,
  });
};

// export const scanPlant = async (imageUrl: string) => {
//   const response = await request.post("/plants/scan", { imageUrl });
//   return response.data;
// };

// export const uploadImageFile = async (formData: FormData) => {
//   const response = await request.post("/file-upload/supabase", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export { handleRegister, handleVerifyOTP };
