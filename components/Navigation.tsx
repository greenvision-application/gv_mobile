import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Navigation() {
    return (
        <View className="bg-neutral p-4">
            <TouchableOpacity onPress={() => console.log("Back button pressed")}>
                <Ionicons name="chevron-back-sharp" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}