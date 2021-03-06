import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../../utils/Colors";
export default function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="100%"  color={Colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
