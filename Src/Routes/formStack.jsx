import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobSeekerDetails from "../Screens/Job_Seeker_Details/JobSeekerDetails";
import Colors from "../utils/Colors";
const Stack = createNativeStackNavigator();

export default function FormStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: "true",
        statusBarColor: Colors.primary,
        statusBarStyle: Colors.primary,
      }}
      initialRouteName={"Details"}
    >
      <Stack.Screen
        name="Details"
        component={JobSeekerDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
