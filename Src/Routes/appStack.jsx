import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobSeekerDetails from "../Screens/Job_Seeker_Details/JobSeekerDetails";
import Profile from "../Screens/Profile/profile";
const Stack = createNativeStackNavigator();

export default function AppStack({navigateTo}) {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }} initialRouteName={navigateTo} >
    <Stack.Screen name="Details" component={JobSeekerDetails} />
    <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
