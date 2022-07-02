import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firebase from 'firebase/compat/app';

export const uploadtoFirebase = async (Documents, fileSize, name) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(e);
    };
    xhr.responseType = "blob";
    xhr.open("GET", Documents, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child("CompanyDetails/" + fileSize + name);
  const snapshot = await ref.put(blob);

  snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
    () => {
      console.log("Uploading....");
    };
    (error) => {
      console.log("Error uploading: ", error);
    },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      };
  });
    return true
};