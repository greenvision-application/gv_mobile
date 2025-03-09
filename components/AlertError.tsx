import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AlertErrorProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const AlertError: React.FC<AlertErrorProps> = ({
  message,
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="w-4/5 bg-white p-6 rounded-lg shadow-lg flex items-center">
          <Ionicons
            name="alert-circle"
            size={40}
            color="#dc2626"
            className="mb-4"
          />
          <Text className="text-red-700 text-base font-medium text-center">
            {message}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 px-4 py-2 bg-red-500 rounded-lg"
          >
            <Text className="text-white font-semibold">Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertError;
