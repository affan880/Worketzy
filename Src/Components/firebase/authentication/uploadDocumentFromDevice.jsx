import { View, Text } from 'react-native'
import React, { useState } from 'react'
import firebase from 'firebase/compat/app';
import * as DocumentPicker from "expo-document-picker";
import hasMediaLibraryPermissionGranted from "./hasMediaPermission";
const uploadDocumentFromDevice = async (dispatch, setDocuments, setProgress) => {
  let imgURI = null;
  const storagePermissionGranted = await hasMediaLibraryPermissionGranted();

  // Discard execution when  media library permission denied
  if (!storagePermissionGranted) return imgURI;
  try {
    const res = await DocumentPicker.getDocumentAsync({});
    const fileSize = res.size;
    const name = res.name;
    if (res.type === "cancel") {
      // console.log("User cancelled document picker");
      return false;
    }
    else {
      dispatch(setDocuments(res.uri));
      uploadtoFirebase(res, fileSize, name, setProgress);
    }
    } catch (err) {
      console.log("error -----", err);
    }
    return imgURI;
  };

const uploadtoFirebase = async (res, fileSize, name, setProgress) => {
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

  const ref = firebase.storage().ref().child(`CompanyDetails/${name}`);
  const snapshot = ref.put(blob);
  snapshot.on(
    "state_changed",
    (snapshot) => {
      const progress =  Math.fround((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
      setProgress(progress);
    },
    (error) => {
      console.log("error -----", error);
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((downloadURL) => {
        return true
      });
    }
  );
  return true;
};
export default uploadDocumentFromDevice;