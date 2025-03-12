import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome6, Ionicons, EvilIcons } from "@expo/vector-icons";

type PlantNotesProps = {
  notes: string[];
  setNotes: (notes: string[]) => void;
};

const PlantNotes: React.FC<PlantNotesProps> = ({ notes, setNotes }) => {
  const addNote = () => {
    if (notes.length < 3) {
      setNotes([...notes, ""]);
    }
  };

  const removeNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <View className="h-min-48 h-max-screen mt-4 p-4 bg-gray-100 border border-neutral-300 rounded-2xl flex flex-col justify-between gap-5">
      {notes.map((note, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <FontAwesome6 name="notes-medical" size={25} color="#3CC18E" />
          <TextInput
            className="text-lg flex-1"
            placeholder="Ghi chú ..."
            placeholderTextColor="#B7BBC1"
            multiline
            maxLength={100}
            textAlignVertical="top"
            value={note}
            onChangeText={(text) => {
              const newNotes = [...notes];
              newNotes[index] = text;
              setNotes(newNotes);
            }}
          />
          {index > 0 && (
            <TouchableOpacity onPress={() => removeNote(index)}>
              <EvilIcons name="close-o" size={25} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {notes.length < 3 && (
        <TouchableOpacity
          onPress={addNote}
          className="flex flex-row items-center justify-center border-t border-neutral-300 py-2"
        >
          <Ionicons name="add-sharp" size={24} color="#B7BBC1" />
          <Text className="text-lg font-inter-semibold text-neutral-300">
            Thêm ghi chú
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlantNotes;
