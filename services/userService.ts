import variables from "@/constants/variables";
import { request, requestAddress } from "@/libs/apiClient";
import { FormInfoData } from "@/store/global";

const handleRegister = async (
  registerForm: FormInfoData,
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
const callProvince = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return requestAddress({
    method: variables.methods.get,
    url: variables.urls.province,
    onSuccess,
    onError,
  });
};
const callDistrict = async (
  id: string,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return requestAddress({
    method: variables.methods.get,
    url: variables.urls.district(id),
    onSuccess,
    onError,
  });
};
const callWard = async (
  id: string,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return requestAddress({
    method: variables.methods.get,
    url: variables.urls.ward(id),
    onSuccess,
    onError,
  });
};

const handleVerifyOTP = async (
  otp: string,
  dataForm: FormInfoData,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = {
    email: dataForm.email,
    otp,
    password: dataForm.password,
  };

  return request({
    method: variables.methods.post,
    url: variables.urls.otp,
    data,
    onSuccess,
    onError,
  });
};

const handleLoginEmail = async (
  loginForm: FormInfoData,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = {
    usernameOrEmail: loginForm.email,
    password: loginForm.password,
  };

  return request({
    method: variables.methods.post,
    url: variables.urls.login,
    data,
    onSuccess,
    onError,
  });
};

const getStatus = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.status,
    onSuccess,
    onError,
  });
};

const getDetailUser = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.user,
    onSuccess,
    onError,
  });
};

export {
  handleRegister,
  handleVerifyOTP,
  handleLoginEmail,
  getStatus,
  getDetailUser,
  callProvince,
  callDistrict,
  callWard,
};
