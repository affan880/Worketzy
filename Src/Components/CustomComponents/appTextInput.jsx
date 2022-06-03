import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import Colors from "../../utils/Colors";

export default function AppTextInput({
  leftIcon,
  width = "100%",
  rightIcon,
  handlePasswordVisibility,
  Name,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      <View style={{flexDirection:"column", width:"100%" }} >
        <Text style={{fontSize:16, marginBottom:15 }} >{Name}:</Text>
        <View style={{ flexDirection: "row", alignItems:"center"}} >
        {leftIcon && (
          <MaterialCommunityIcons
          name={leftIcon}
          size={20}
        color={Colors.mediumGrey}
        style={styles.icon}
        />
        )}
        <TextInput
        style={styles.input}
        placeholderTextColor={Colors.mediumGrey}
        {...otherProps}
        />
        {rightIcon && (
          <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
          name={rightIcon}
          size={20}
          color={Colors.mediumGrey}
          style={styles.rightIconStyles}
          />
          </TouchableOpacity>
          )}
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth:1,
    borderColor:Colors.secondary,
  },
  icon: {
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    width: "80%",
    fontSize: 15,
    color: Colors.mediumGrey,
  },
  rightIconStyles: {
    position: "absolute",
    right: 30,
    alignSelf: "center",
  },
});
