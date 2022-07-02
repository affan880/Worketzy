import { StyleSheet, Text, View } from "react-native";
import React from "react";
import firebase from "firebase/compat";
export const createUserDocument = async ( uid, userDetails) => {
  const userRef = firebase.firestore().collection("JobSeekers").doc(uid);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    userRef
      .set(userDetails)
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
        return false;
      });
  }
  return true;
};

export default createUserDocument;
