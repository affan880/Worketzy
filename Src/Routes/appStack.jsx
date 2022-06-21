import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Screens/Profile/profile";
import BottomTabs from "./BottomTabs";
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
    </Stack.Navigator>
  );
}
