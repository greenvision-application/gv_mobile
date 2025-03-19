import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Animated } from "react-native";

interface CustomModalProps {
  visible: boolean;
  onReject: () => void;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onReject,
  onClose,
  onConfirm,
  title = "Thông báo",
  message = "Bạn có chắc chắn muốn tiếp tục?",
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-neutral-500/30">
        <Animated.View
          style={{
            opacity: fadeAnim,
            width: "85%",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <TouchableOpacity
            onPress={onReject}
            className="absolute right-4 top-4 z-30"
          >
            <AntDesign name="closecircleo" size={24} color="#777B84" />
          </TouchableOpacity>
          <Text className="text-xl font-inter-bold text-neutral-500 text-center mb-5">
            {title}
          </Text>
          <Text className="text-neutral-400 text-lg font-inter-medium text-center">
            {message}
          </Text>
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="flex-1 p-3 rounded-lg mr-2 bg-neutral-200"
              onPress={onClose}
            >
              <Text className="text-center text-neutral-400 font-inter-bold">
                Chưa cần
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 p-3 bg-green-500 rounded-lg bg-primary"
              onPress={onConfirm}
            >
              <Text className="text-center text-neutral font-inter-bold">
                Có
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;
