import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppToggleBtn from "../CustomComponents/appToggleBtn";

const ToggleButton = ({ name, width, isEnabled, onPress }) => {
  return (
    <View>
      <AppToggleBtn
        name={name}
        width={width}
        isEnabled={isEnabled}
        onPress={onPress}
      />
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({});
