import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login_Sign_up_Screen from "../Screens/Login_Sign_up_Screens/Login_Sign_up_Screen";
import Login_Jseeker from "../Screens/Login_Sign_up_Screens/Login_Jseeker/Login_Jseeker";
import Login_Recruiter from '../Screens/Login_Sign_up_Screens/Login_Recruiter/Login_Recruiter'
const Stack = createNativeStackNavigator();


export default function JobTypeSelectorRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Login_Sign_up_Screen} />
        <Stack.Screen name="Login_Jseeker" component={Login_Jseeker} />
        <Stack.Screen name="Login_Recruiter" component={Login_Recruiter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
