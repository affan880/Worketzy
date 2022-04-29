import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login_Sign_up_Screen from "../Screens/Login_Sign_up_Screens/Login_Sign_up_Screen";
import Login_Jseeker from "../Screens/Login_Sign_up_Screens/Login_Jseeker/Login_Jseeker";
import Login_Recruiter from "../Screens/Login_Sign_up_Screens/Login_Recruiter/Login_Recruiter";
import Job_Seeker_Form from "../Screens/Job_Seeker_Details/Job_Seeker_Form";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Login_Sign_up_Screen} />
      <Stack.Screen name="Login_Jseeker" component={Login_Jseeker} />
      <Stack.Screen name="Login_Recruiter" component={Login_Recruiter} />
    </Stack.Navigator>
  );
}
