import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import JobSeekerType from '../../Components/JobType/Job_Type_Selector'
import Colors from '../../utils/Colors';
import Spinner from '../../Components/CustomComponents/spinner'; 
import { Satisfy_400Regular } from "@expo-google-fonts/satisfy";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { useFonts } from 'expo-font';

export default Login_Sign_up_Screen = () => {
  let [fontsLoaded, error] = useFonts({
    Satisfy_400Regular,
    Poppins_400Regular
  })
  if (!fontsLoaded) { 
     return null
  }
  return (
    <View style={Type.Container}>
      <View style={Type.jobType}>
        <Text style={Type.JobTypeSelector}>Select a role</Text>
        <Text style={Type.JobTypeSelectorDetails}>
          Jobs and talent you can't find anywhere else!
        </Text>
        <Text
          style={{
            width: 35,
            left: 165,
            backgroundColor: Colors.primary,
            borderRadius: 2,
            color: Colors.mediumGrey,
            fontSize: 19,
            fontWeight: "bold",
            bottom:15
          }}
        >
          ──
        </Text>
      </View>
      <JobSeekerType />
    </View>
  );
};
const Type = StyleSheet.create({
  Container: {
    backgroundColor: Colors.primary,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  jobType: {
    flexDirection: "column",
    top: "10%",
    height: "30%",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  JobTypeSelector: {
    fontFamily: "Satisfy_400Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 40,
    lineHeight: 45,
    textAlign: "center",
    letterSpacing: 1,
    color: Colors.textColorMain,
    paddingTop: "5%",
  },
  JobTypeSelectorDetails: {
    fontFamily: "Poppins_400Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: 1,
    color: Colors.textColor2,
    paddingHorizontal: "5%",
    paddingVertical: "6%",
  },
});


