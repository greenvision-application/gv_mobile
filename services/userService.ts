import apiClient from "@/libs/apiClient";

// Fetch danh sách user
export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

// Thêm user mới
export const addUser = async (user: { name: string; email: string }) => {
  const response = await apiClient.post("/users", user);
  return response.data;
};

// Xóa user
export const deleteUser = async (userId: string) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

export const scanPlant = async (imageUrl: string) => {
  const response = await apiClient.post("/plants/scan", { imageUrl });
  return response.data;
};

export const uploadImageFile = async (formData: FormData) => {
  const response = await apiClient.post("/file-upload/supabase", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
