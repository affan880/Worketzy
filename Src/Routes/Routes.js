import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../Components/firebase/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStack from "./appStack";
import AuthStack from "./authStack";
import { AuthUserContext } from "./authUserProvider";

const Stack = createNativeStackNavigator();


export default function JobTypeSelectorRoute() {
  const { user, setUser } = useContext(AuthUserContext);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
        try {
          await (authUser ? setUser(authUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      });
      return unsubscribeAuth;
    }, []);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
