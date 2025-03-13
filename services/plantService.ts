import variables from "@/constants/variables";
import request from "@/libs/apiClient";
import { UserPlant } from "@/libs/types";

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

const getCategory = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.category,
    onSuccess,
    onError,
  });
};

const addToGarden = async (
  userPlantForm: UserPlant,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = { ...userPlantForm };

  return request({
    method: variables.methods.post,
    url: variables.urls.addGarden,
    data,
    onSuccess,
    onError,
  });
};

const updateGardenPlant = async (
  userPlantForm: UserPlant,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = {
    ...userPlantForm,
  };

  return request({
    method: variables.methods.patch,
    url: variables.urls.updateUserPlant(userPlantForm.id!),
    data,
    onSuccess,
    onError,
  });
};
const generateSchedule = async (
  id: string | string[],
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.post,
    url: variables.urls.generateSchedule(id),
    onSuccess,
    onError,
  });
};

const generateTasks = async (
  id: string | string[],
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.post,
    url: variables.urls.generateTask(id),
    onSuccess,
    onError,
  });
};

const getFavorite = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.favorite,
    onSuccess,
    onError,
  });
};

const getPlanted = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.planted,
    onSuccess,
    onError,
  });
};

const getUnplanted = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.unplanted,
    onSuccess,
    onError,
  });
};

const removeFavorite = async (
  userPlantId: string,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.put,
    url: variables.urls.changeFavorite(userPlantId),
    onSuccess,
    onError,
  });
};

const removeUserPlant = async (
  userPlantId: string,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.delete,
    url: variables.urls.removeUserPlant(userPlantId),
    onSuccess,
    onError,
  });
};

export {
  popularPlant,
  plantDetail,
  getCategory,
  addToGarden,
  updateGardenPlant,
  generateSchedule,
  generateTasks,
  getFavorite,
  getPlanted,
  getUnplanted,
  removeFavorite,
  removeUserPlant,
};
