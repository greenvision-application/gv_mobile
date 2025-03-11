import variables from "@/constants/variables";
import request from "@/libs/apiClient";
import { FormInfoData } from "@/store/global";

const popularPlant = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.popular,
    onSuccess,
    onError,
  });
};

const plantDetail = async (
  id: string | string[],
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.plantDetail(id),
    onSuccess,
    onError,
  });
};

export { popularPlant, plantDetail };
