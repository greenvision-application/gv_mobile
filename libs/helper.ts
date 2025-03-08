import AsyncStorage from "@react-native-async-storage/async-storage";
import variables from "@/constants/variables";

const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error("Error getting all keys:", error);
    return [];
  }
};

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting item for key ${key}:`, error);
    return null;
  }
};

const setItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error setting item for key ${key}:`, error);
    return false;
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item for key ${key}:`, error);
    return false;
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing storage:", error);
    return false;
  }
};

const getAllItems = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.map(([key, value]) => ({
      key,
      value: value ? JSON.parse(value) : null,
    }));
  } catch (error) {
    console.error("Error getting all items:", error);
    return [];
  }
};

const allKeyStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    return result.forEach(([key, value]) => {
      console.log("Key:", key, "Value:", value ? JSON.parse(value) : null);
    });
  } catch (error) {
    console.error(error);
  }
};

const setToken = async (token: string) => {
  await setItem(variables.localStorage.accessToken, token);
};

const getToken = async () => {
  return await getItem(variables.localStorage.accessToken);
};

const removeToken = async () => {
  await removeItem(variables.localStorage.accessToken);
};

export default {
  getAllKeys,
  getItem,
  setItem,
  removeItem,
  clearAll,
  getAllItems,
  allKeyStorage,
  getToken,
  setToken,
  removeToken,
};
