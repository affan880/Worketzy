import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import JobList from "../Screens/JobList/jobList";
const Stack = createNativeStackNavigator();


export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="Worketzy"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="JobList" component={JobList} />
    </Stack.Navigator>
  );
}
