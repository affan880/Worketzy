import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../utils/Colors';
import Spinner from "./spinner";
import { useSelector } from "react-redux";

export default function ImageForBanner({ addImage, width, height, image, progress }) {

  return (
    <View style={{justifyContent:'center',alignItems:'center',marginTop:20}} >
      <View style={[imageUploaderStyles.container, {width:width, height:height, ...imageUploaderStyles.shadow}]}>
          <Image source={{ uri: image }} style={{ width: "100%", height: "100%",}} />
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={()=>addImage()}
            style={{ ...imageUploaderStyles.uploadBtn, ...imageUploaderStyles.shadow }}
          >
            {
              progress === "100.00" ?
                <View style={imageUploaderStyles.uploadBtn} >
                <Text>{image ? "Edit" : "Upload"} Image</Text>
                <AntDesign name="camera" size={15} color="black" />
                </View> : progress === false ?
                   <View style={imageUploaderStyles.uploadBtn} >
                <Text>{image ? "Edit" : "Upload"} Image</Text>
                <AntDesign name="camera" size={15} color="black" />
                  </View> :
                   <View style={imageUploaderStyles.uploadBtn} >
                   <Spinner/>
                </View>
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 3,
    height: 100,
    width: 100,
    backgroundColor: "#efefef",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  userName: {
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
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 8,
  },
});
