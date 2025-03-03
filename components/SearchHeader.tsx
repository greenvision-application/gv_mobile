import { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Icon } from "@rneui/themed";
import SettingsMenu from "./SettingsMenu";

interface SearchHeaderProps {
  onSearch?: (text: string) => void;
  onScan?: () => void;
  onNotification?: () => void;
  onNotificationSettings?: () => void;
  onLogout?: () => void;
  placeholder?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  onSearch,
  onScan,
  onNotification,
  onNotificationSettings = () => console.log("Open notification settings"),
  onLogout = () => console.log("Logging out"),
  placeholder = "Tìm kiếm",
}) => {
  const [settingsMenuVisible, setSettingsMenuVisible] = useState(false);
  const settingsButtonRef = useRef(null);
  const [settingsPosition, setSettingsPosition] = useState({ x: 0, y: 0 });
  const handleOpenSettings = () => {
    if (settingsButtonRef.current) {
      (
        settingsButtonRef.current as unknown as {
          measure: (
            callback: (
              x: number,
              y: number,
              width: number,
              height: number,
              pageX: number,
              pageY: number
            ) => void
          ) => void;
        }
      ).measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setSettingsPosition({ x: pageX, y: pageY + height });
          setSettingsMenuVisible(true);
        }
      );
    }
  };
  return (
    <View className="flex flex-row items-center justify-between w-full px-3 py-3 bg-primary">
      {/* Search Bar */}
      <View className="flex flex-row items-center rounded-xl bg-neutral-100 flex-1">
        <Icon
          name="search-outline"
          type="ionicon"
          size={25}
          color="#9CA3AF"
          containerStyle={{ marginLeft: 5 }}
        />
        <View className="flex flex-row items-center w-full justify-between">
          <TextInput
            className="w-4/6 h-11 text-base text-neutral-500 font-inter-medium mx-2 truncate"
            placeholder={placeholder}
            numberOfLines={1}
            placeholderTextColor="#9CA3AF"
            maxLength={30}
            onChangeText={onSearch}
          />
          <TouchableOpacity onPress={onScan}>
            <Icon
              name="scan-outline"
              type="ionicon"
              size={25}
              color="#9CA3AF"
              containerStyle={{ marginRight: 35 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Icons */}
      <View className="flex flex-row justify-between items-center space-x-4">
        <TouchableOpacity
          onPress={onNotification}
          className="bg-primary-dark p-2 rounded-full"
        >
          <Icon
            name="notifications-outline"
            type="ionicon"
            size={25}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSettingsMenuVisible(true)}
          className="bg-primary-dark p-2 rounded-full"
        >
          <Icon name="settings-sharp" type="ionicon" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Settings Menu Modal */}
      <SettingsMenu
        visible={settingsMenuVisible}
        onClose={() => setSettingsMenuVisible(false)}
        onNotificationSettings={onNotificationSettings}
        onLogout={onLogout}
        position={settingsPosition}
      />
    </View>
  );
};

export default SearchHeader;
