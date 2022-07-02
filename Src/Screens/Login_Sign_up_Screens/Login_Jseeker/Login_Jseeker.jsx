import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SafeView from '../../../Components/CustomComponents/safeView'
import LoginScreen from "../../../Components/firebase/authentication/Login_or_signup";
import { setApplicationType } from '../../../redux/reducers/userDetails';
export default function Login_JobSeeker({ navigation }) {
  return (
     <LoginScreen Screen = "JobSeekers" />
  );
}

const styles = StyleSheet.create({

});
