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

export { popularPlant };
