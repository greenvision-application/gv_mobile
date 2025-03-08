import axios, { AxiosRequestConfig } from "axios";
import variables from "@/constants/variables";
import helper from "./helper";

const AXIOS = axios.create({
  baseURL: variables.API_BASE_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json;charset=utf-8",
  },
});

AXIOS.interceptors.request.use(
  async function (config) {
    const token = await helper.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AXIOS.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.data);
    return response;
  },
  async (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      await helper.removeToken();
    }

    return Promise.reject(error);
  }
);

interface RequestOptions {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: any;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const request = async ({
  method,
  url,
  data,
  onSuccess,
  onError,
}: RequestOptions) => {
  try {
    const response = await AXIOS({ method, url, data });
    onSuccess?.(response.data);
    return response.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data || "Unknown Axios error"
      : error instanceof Error
      ? error.message
      : "Unknown error";

    onError?.(errorMessage);
    throw new Error(errorMessage);
  }
};
export default request;
