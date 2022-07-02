import { View, Text } from "react-native";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import * as ImagePicker from "expo-image-picker";
import hasMediaLibraryPermissionGranted from "./hasMediaPermission";
const uploadImage = async (filePath, dispatch, set) => {
  let imgURI = null;
  const storagePermissionGranted = await hasMediaLibraryPermissionGranted();

  // Discard execution when  media library permission denied
  if (!storagePermissionGranted) return imgURI;
  try {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!res.cancelled) {
      const fileSize = res.size;
      const name = res.name;
      uploadtoFirebase(res, fileSize, filePath, dispatch, set);
    }
  } catch (err) {
    console.log("error -----", err);
  }

  return imgURI;
};

const uploadtoFirebase = async (res, fileSize, filePath, dispatch, set)=> {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log("error" + e);
      reject(e);
    };
    xhr.responseType = "blob";
    xhr.open("GET", res.uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(filePath);
  const snapshot = ref.put(blob);
  snapshot.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = Math.fround(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      ).toFixed(2);

      // setProgress(progress);
      // Monitor uploading progress
      // onProgress && onProgress(Math.fround(progress).toFixed(2));
    },
    (error) => {
      // Something went wrong - dispatch onFail event with error  response
      // onFail && onFail(error);
      console.log("error -----", error);
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      snapshot.snapshot.ref.getDownloadURL().then((downloadURL) => {
        dispatch(set(downloadURL));
      });
    }
  );
  return true;
};
export default uploadImage;
