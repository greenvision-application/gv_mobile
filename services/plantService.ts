import variables from "@/constants/variables";
import {request} from "@/libs/apiClient";
import { UserPlant, CreatePlantRequest } from "@/libs/types";
import { TaskType } from "@/libs/types";

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

const recommendationsPlant = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.recommendations,
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

const createPlant = async (
  data: CreatePlantRequest,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.post,
    url: variables.urls.plants,
    data,
    onSuccess,
    onError,
  });
};

const generatePhase = async (
  id: string,
  data: { plant_name: string; scientific_name: string },
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  console.log("data test::::", data);
  return request({
    method: variables.methods.post,
    url: variables.urls.generatePhase(id),
    data,
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

const handleFavorite = async (
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

const getTimeline = async (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.get,
    url: variables.urls.timeline,
    onSuccess,
    onError,
  });
};

const updateTask = async (
  id: string,
  status: TaskType,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const data = { completion_status: status };
  return request({
    method: variables.methods.patch,
    url: variables.urls.updateTask(id),
    data,
    onSuccess,
    onError,
  });
};

export {
  popularPlant,
  recommendationsPlant,
  plantDetail,
  getCategory,
  addToGarden,
  updateGardenPlant,
  generateSchedule,
  generateTasks,
  getFavorite,
  getPlanted,
  getUnplanted,
  handleFavorite,
  removeUserPlant,
  getTimeline,
  createPlant,
  generatePhase,
  updateTask,
};
