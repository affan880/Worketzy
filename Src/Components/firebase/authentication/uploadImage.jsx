import { StyleSheet, Text, View } from "react-native";
import React from "react";
import firebase from "firebase/compat";

export const uploadImage = async (image, name, setImageUpload, setLoading,user, uid) => {

  const blob = await new Promise((resolve, reject) => {
    const httpReq = new XMLHttpRequest();
    httpReq.onload = function () {
      resolve(httpReq.response);
    };
    httpReq.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    httpReq.responseType = "blob";
    httpReq.open("GET", image, true);
    httpReq.send(null);
  });

  const ref = firebase.storage().ref("UserDetails/profilePic/" + uid);
  const snapshot = ref.put(blob);

  snapshot.on(
    firebase.storage().TaskEvent.STATE_CHANGED,
    () => {
      setLoading(true);
      (error) => {
    },
      console.log(error);
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        setImageUpload(true);
        // console.log("download uri : ", url);
        blob.close();
        return url;
      });
    }
  );
};

