import { Button, Text, View } from "react-native";
import { scheduleLocalNotification } from "@/services/notificationService";

export default function NotificationTester() {
  const sendTestNotification = async () => {
    await scheduleLocalNotification(
      "Kiểm tra thông báo",
      "Đây là thông báo thử nghiệm",
      { test: true },
      2
    );
  };

  return (
    <View className="p-4 my-5 bg-gray-100 rounded-lg">
      <Text className="text-base font-bold mb-2.5">Kiểm tra thông báo</Text>
      <Button title="Gửi thông báo thử nghiệm" onPress={sendTestNotification} />
    </View>
  );
}
