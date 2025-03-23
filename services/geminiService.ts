import variables from "@/constants/variables";
import { request } from "@/libs/apiClient";

const scanPlant = async (
  fileData: FormData,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = fileData;

  return request({
    method: variables.methods.post,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: variables.urls.scan,
    data,
    onSuccess,
    onError,
  });
};

const checkHealthPlant = async (
  fileData: FormData,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = fileData;

  return request({
    method: variables.methods.post,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: variables.urls.checkHealth,
    data,
    onSuccess,
    onError,
  });
};

export { scanPlant, checkHealthPlant };
