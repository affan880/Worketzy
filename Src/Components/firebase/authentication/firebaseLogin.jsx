import { StyleSheet, Text, View } from "react-native";
import React from "react";
import firebase from "firebase/compat";

export const firebaseLogin = async ({ verificationId, verificationCode }) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  await firebase.auth().signInWithCredential(credential);

  return true;
};

const styles = StyleSheet.create({});
