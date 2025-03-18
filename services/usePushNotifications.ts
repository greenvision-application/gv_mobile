import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { router } from "expo-router";
import {
  registerForPushNotificationsAsync,
  updateUserPushToken,
} from "./notificationService";

// Thiết lập cách hiển thị thông báo khi app đang mở
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    // Đăng ký nhận thông báo
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      if (token) {
        updateUserPushToken(token);
      }
    });

    // Lắng nghe khi nhận được thông báo mới (khi app đang mở)
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Lắng nghe khi người dùng tương tác với thông báo
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { notification } = response;
        const data = notification.request.content.data;

        // Xử lý điều hướng dựa trên dữ liệu trong thông báo
        if (data?.url) {
          router.push(data.url);
        } else if (data?.taskId) {
          router.push(`/notifications`);
        } else if (data?.notificationId) {
          router.push("/notifications");
        }
      });

    // Kiểm tra nếu app được mở từ thông báo
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response?.notification) {
        const data = response.notification.request.content.data;
        if (data?.url) {
          router.push(data.url);
        } else if (data?.taskId) {
          router.push(`/notifications`);
        } else if (data?.notificationId) {
          router.push("/notifications");
        }
      }
    });

    return () => {
      // Clean up listeners
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
}
