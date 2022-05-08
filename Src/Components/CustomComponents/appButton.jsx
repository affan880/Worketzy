import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";

export default function AppButton({ title, onPress, color = "secondary", width }) {
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
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
