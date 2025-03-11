import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const SaveButton = ({ onPress }) => {
  return (
    <TouchableOpacity className="bg-green-500 p-4 rounded-lg mt-4" onPress={onPress}>
      <Text className="text-white text-center font-bold text-lg">Lưu</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
