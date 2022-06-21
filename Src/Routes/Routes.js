import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormStack from "./formStack";
import AuthStack from "./authStack";
import { AuthUserContext, AuthUserExistContext } from "./authUserProvider";
import AppStack from "./appStack";
import Spinner from "../Components/CustomComponents/spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setUser,setDetails } from "../redux/reducers/userDetails";


export default function JobTypeSelectorRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails.user);
  const auth = getAuth();
  useEffect(() => {
    load();
  }, []);
  const dataStatus = async (authUser) => {
    firebase
    .firestore()
    .collection("users")
    .doc(authUser.uid)
    .get()
      .then((snap) => {
        dispatch(setUser({
          status : snap.exists,
          id: authUser.uid,
        }));
        const val = {
          status: snap.exists,
          id: authUser.uid,
        };
        storeId(val);
    })
  };
const storeId = async (val) => {
  try {
    await AsyncStorage.setItem("@userId", JSON.stringify(val));
   
  } catch (e) {
    console.log("Error saving data storeId");
  }
};
  const load = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("@userId"));
      users !== null ? dispatch(setUser(users)) : null;
    }
    catch (err) {
      console.log("load" + err)
    }
  } 
useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
        try {
          (authUser ? dataStatus(authUser) : null);
        } catch (error) {
          console.log(error);
        }
      });
      return unsubscribeAuth;
    },[]);
  
  return (
    <NavigationContainer>
      {user.id ? user.status ? <AppStack /> : user.status === null ? <Spinner/> : <FormStack/> : <AuthStack />}
    </NavigationContainer>
  );
}
