import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobRecruiterDetails from "../Screens/Job_Recruiter_Details/JobRecruiterDetails";
import CompanyVerification from "../Components/JobRecruiterFormPage/companyVerification";
import VerificationByDocuments from "../Components/JobRecruiterFormPage/VerificationByDocuments";
import VerificationBymail from "../Components/JobRecruiterFormPage/VerificationBymail";
import RecruiterVerification from "../Components/JobRecruiterFormPage/recruiterVerification";
const Stack = createNativeStackNavigator();

export default function JobRecruiterFormStack() {
  return (
    <Stack.Navigator
      initialRouteName={"Details"}
      screenOptions={{
        tabBarHideOnKeyboard: "true",
        statusBarColor: Colors.primary,
        statusBarStyle: Colors.primary,
      }}
    >
      <Stack.Screen
        name="Details"
        component={JobRecruiterDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerificationByDocuments"
        component={VerificationByDocuments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerificationBymail"
        component={VerificationBymail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="recruiterVerification"
        component={RecruiterVerification}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
