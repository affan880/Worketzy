import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobSeekerDetails from "../Screens/Job_Seeker_Details/JobSeekerDetails";
const Stack = createNativeStackNavigator();

export default function FormStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: "true",
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
