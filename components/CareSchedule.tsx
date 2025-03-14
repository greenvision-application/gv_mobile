import React from 'react';
import { View, Text } from 'react-native';

const CareSchedule = ({ schedule }) => {
  return (
    <View className={ `bg-gray-100 p-4 rounded-lg mt-4`}>
      <Text className={ `text-lg font-bold mb-2`}>Lịch chăm sóc</Text>
      <Text className={ `text-gray-700`}>🌱 Tưới nước: {schedule.water} lần/tuần</Text>
      <Text className={ `text-gray-700`}>🌞 Tắm nắng: {schedule.sun} lần/tuần</Text>
      <Text className={ `text-gray-700`}>🪴 Xới đất: {schedule.soil} lần/tháng</Text>
    </View>
  );
};

export default CareSchedule;
