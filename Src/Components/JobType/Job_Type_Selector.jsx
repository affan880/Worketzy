import { StyleSheet, Text, View, TouchableOpacity, Button, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import JobTypes from './Job_Types';
import React from 'react';
import Colors from '../../utils/Colors';
import {
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";

const JobSeekerType = () => {

  const navigation = useNavigation();
  var [isPress, setIsPress] = React.useState(true);
  const onTouchJob = {
    style: isPress ? styles.SelectorOptionOnClick : styles.SelectorOption,
    onPress: () => isPress ? null : setIsPress(true),
    
  }
  const onTouchRec = {
    style: isPress ? styles.SelectorOption : styles.SelectorOptionOnClick ,
    onPress: () => isPress ? setIsPress(false) : null,
  };
   const JobTypeICons = {
     FindJob: require("../../../assets/FindJob.png"),
     FindEmployee: require("../../../assets/FindEmployee.png"),
   };
  return (
    <View style={styles.Container}>
      <StatusBar translucent backgroundColor={Colors.primary} />
      <View style={{ ...styles.Types, ...styles.shadow }}>
        <TouchableOpacity {...onTouchJob}>
          <JobTypes
            TextColor={isPress ? Colors.textColor2 : Colors.textColor}
            JobType="Find Job"
            JobTypeDesc="We make it easy for you to find the right job"
            image={JobTypeICons.FindJob}
          />
        </TouchableOpacity>
        <TouchableOpacity {...onTouchRec}>
          <JobTypes
            TextColor={isPress ? Colors.textColor : Colors.textColor2}
            JobType="Find Employee"
            JobTypeDesc="Hire the best talent for your work"
            image={JobTypeICons.FindEmployee}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.ConfirmBtn}
          onPress={() => {
            isPress
              ? navigation.navigate("Find Job")
              : navigation.navigate("Find Empolyee");
          }}
        >
          <Text style={styles.BtnTextStyle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default JobSeekerType

const styles = StyleSheet.create({
  Container: {
    height: "70%",
    width: "100%",
  },
  Types: {
    flexDirection: "row",
    height: "55%",
    paddingHorizontal:"5%",
    marginTop:'15%',
    alignItems: "center",
    justifyContent: "center",
  },
  SelectorOption: {
    margin: "1.5%",
    width: "50%",
    height: "90%",
    color: Colors.black ,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 18,
  },
  SelectorOptionOnClick: {
    width: "50%",
    height: "90%",
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.textColor2,
    borderRadius: 18,
    margin: "1.5%",
  },
  BtnContainer: {
    width: "100%",
    height: "15%",
    top:"20%",
    alignItems: "center",
  },
  ConfirmBtn: {
    width: "92.5%",
    margin: "1.5%",
    height: 50,
    elevation: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 24,
    justifyContent: 'center',
    borderColor: Colors.textColor2,
    borderWidth: 1,
  },
  BtnTextStyle: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});

