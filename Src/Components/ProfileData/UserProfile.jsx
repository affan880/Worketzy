import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import { useSelector } from "react-redux";

export default function UserProfile({ addImage }) {
    const image = useSelector((state) => state.userDetails.details.userImage);

  return (
    <View style={{justifyContent:'center',alignItems:'center'}} >
      <View style={imageUploaderStyles.container}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        )}

        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={()=>addImage()}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={15} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={imageUploaderStyles.userName}>
        <Text style={{ marginVertical: 20, fontSize: 14, color: Colors.black }}>
          Welcome, FuzzySid
        </Text>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 3,
    height: 150,
    width: 150,
    backgroundColor: "#efefef",
    justifyContent:'center',
    borderRadius: 99,
    overflow: "hidden",
  },
  userName: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "35%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
