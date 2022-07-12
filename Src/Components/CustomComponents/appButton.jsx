import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import { Raleway_400Regular } from "@expo-google-fonts/raleway";
import { useFonts } from "expo-font";


export default function AppButton({ title, onPress, color = "secondary", width }) {
      let [fontsLoaded, error] = useFonts({
        Raleway_400Regular,
      });
      if (!fontsLoaded) {
        return null;
      }
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color], width: width }]}
      onPress={onPress}
      onMagicTap={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: Colors.textColor2,
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    fontFamily: "Raleway_400Regular",
  },
});
