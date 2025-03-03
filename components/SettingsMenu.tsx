import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Icon } from "@rneui/themed";

interface SettingsMenuProps {
  visible: boolean;
  onClose: () => void;
  onNotificationSettings: () => void;
  onLogout: () => void;
  position: { x: number; y: number };
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  visible,
  onClose,
  onNotificationSettings,
  onLogout,
  position,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      className=""
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/40">
          <TouchableWithoutFeedback>
            <View
              style={{
                position: "absolute",
                top: position.y + 180,
                right: Dimensions.get("window").width - position.x - 400,
                width: 200,
                backgroundColor: "white",
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              {/* Header */}
              <View className="p-4 border-b border-gray-100">
                <Text className="text-lg font-inter-bold text-center text-neutral-800">
                  Cài đặt
                </Text>
              </View>

              {/* Menu Options */}
              <TouchableOpacity
                onPress={() => {
                  onNotificationSettings();
                  onClose();
                }}
                className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50"
              >
                <Icon
                  name="notifications-outline"
                  type="ionicon"
                  color="#4B5563"
                  size={22}
                  containerStyle={{ width: 28, marginRight: 14 }}
                />
                <Text className="text-base font-inter-medium text-neutral-700">
                  Cài đặt thông báo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  onLogout();
                  onClose();
                }}
                className="flex-row items-center p-4 active:bg-gray-50"
              >
                <Icon
                  name="log-out-outline"
                  type="ionicon"
                  color="#EF4444"
                  size={22}
                  containerStyle={{ width: 28, marginRight: 14 }}
                />
                <Text className="text-base font-inter-medium text-red-500">
                  Đăng xuất
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettingsMenu;
