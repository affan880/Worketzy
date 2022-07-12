import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Colors from "../../utils/Colors";
import { useFonts } from "expo-font";
import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";
function JobTypes(props) {
      let [fontsLoaded, error] = useFonts({
        Montserrat_700Bold_Italic
      });
      if (!fontsLoaded) {
        return null;
      }
  return (
    <View style={styles.Container}>
      <View style={styles.IconContainer}>
        <Image source={props.image} style={styles.IconStyles} />
      </View>
      <View style={styles.JobTypeContainerText}>
        <Text style={styles.FindJobText}>{props.JobType}</Text>
        <Text
          style={{
            color: props.TextColor,
            fontFamily: "Montserrat_700Bold_Italic",
            fontSize: 12,
            lineHeight: 20,
            textAlign: "center",
            fontWeight: "500",
            letterSpacing: 1,
          }}
        >
          {props.JobTypeDesc}
        </Text>
      </View>
    </View>
  );
}

export default JobTypes;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    top: 40,
    alignItems: "center",
  },
  IconContainer: {
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "20%",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    borderColor: Colors.secondary,
  },
  IconStyles: {
    width: "70%",
    height: "70%",
  },
  JobTypeContainerText: {
    width: "80%",
    height: "100%",
    top: "10%",
    alignItems: "center",
  },
  FindJobText: {
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    fontWeight: "900",
    letterSpacing: 1,
    color: Colors.primary,
    paddingBottom:20
  },
  FindJobContext: {
    fontStyle: "italic",
    fontSize: 18,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: 1,
  },
});
