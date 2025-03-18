import variables from "@/constants/variables";
import { request } from "@/libs/apiClient";
import helper from "@/libs/helper";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cấu hình cách hiển thị thông báo khi app đang mở
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Đăng ký nhận thông báo và lấy Expo push token
 */
async function registerForPushNotificationsAsync() {
  let token;

  // Thiết lập channel thông báo cho Android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("task-notifications", {
      name: "Task Notifications",
      description: "Thông báo về các nhiệm vụ chăm sóc cây",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#4CAF50", // Màu xanh lá cây
    });
  }

  // Kiểm tra xem có phải thiết bị thật hay không
  if (Device.isDevice) {
    // Kiểm tra quyền thông báo
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      // Yêu cầu quyền nếu chưa có
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert(
        "Bạn cần cấp quyền thông báo để nhận được cập nhật về chăm sóc cây!"
      );
      return "";
    }

    // Lấy token Expo
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: variables.PROJECT_ID, // Thêm project ID của bạn ở đây
      })
    ).data;

    // Lưu token vào AsyncStorage để sử dụng sau này
    await helper.setItem(variables.localStorage.expoPushToken, token);
  } else {
    alert("Tính năng thông báo yêu cầu thiết bị thật để hoạt động");
  }

  return token;
}

/**
 * Cập nhật push token lên server
 */
async function updateUserPushToken(token: string) {
  try {
    // Lấy user ID từ AsyncStorage (giả sử bạn đã lưu khi đăng nhập)
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      console.log("Không thể cập nhật push token: Chưa đăng nhập");
      return;
    }

    // Gửi token lên server
    const response = updatePushToken(token);

    console.log("Push token updated successfully");
    return response;
  } catch (error) {
    console.error("Error updating push token:", error);
  }
}

/**
 * Đăng ký lại thông báo khi người dùng đăng nhập
 */
async function registerNotificationsOnLogin() {
  try {
    // Kiểm tra xem đã có token chưa
    let token = await helper.getItem(variables.localStorage.expoPushToken);

    // Nếu chưa có, đăng ký mới
    if (!token) {
      token = (await registerForPushNotificationsAsync()) || null;
    }

    // Cập nhật token lên server
    if (token) {
      await updateUserPushToken(token);
    }
  } catch (error) {
    console.error("Error registering notifications on login:", error);
  }
}
const updatePushToken = async (
  token: string,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return request({
    method: variables.methods.patch,
    url: variables.urls.updatePushToken,
    data: { updatePushToken: token },
    onSuccess,
    onError,
  });
};

async function scheduleLocalNotification(
  title: string,
  body: string,
  data = {},
  seconds = 2
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title || "Thông báo chăm sóc cây",
      body: body || "Bạn có nhiệm vụ chăm sóc cây sắp đến hạn",
      data: data,
    },
    trigger: {
      seconds: seconds,
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    },
  });
}
export {
  updatePushToken,
  registerNotificationsOnLogin,
  updateUserPushToken,
  registerForPushNotificationsAsync,
  scheduleLocalNotification,
};
