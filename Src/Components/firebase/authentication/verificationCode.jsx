import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firebase from 'firebase/compat';

export const getVerificationId = async ({
  phoneNumber,
  recaptchaVerifierCurrent,
}) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const verificationId = await phoneProvider.verifyPhoneNumber(
    phoneNumber,
    recaptchaVerifierCurrent
  );

  return verificationId;
};

const styles = StyleSheet.create({})