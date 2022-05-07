import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobSeekerDetails from "../Screens/Job_Seeker_Details/JobSeekerDetails";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Details" component={JobSeekerDetails} />
    </Stack.Navigator>
  );
}
