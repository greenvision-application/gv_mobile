import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Link, router } from "expo-router";

export default function Navigation() {
    return (
        <View className="bg-neutral p-4">
            <TouchableOpacity onPress={() => console.log("Back button pressed")}>
                <Ionicons name="chevron-back-sharp" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}