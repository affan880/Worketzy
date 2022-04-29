import React, { useContext, useEffect, useState } from "react";
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
      // onAuthStateChanged returns an unSubscriber
      const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
        try {
          await (authUser ? setUser(authUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      });

      // unsubscribe auth listener on unmount
      return unsubscribeAuth;
    }, []);

    if (isLoading) {
      // return <Spinner />;
    }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
