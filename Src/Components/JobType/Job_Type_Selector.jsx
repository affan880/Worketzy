import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Seeker_Type from './JobTypes/Seeker_Type';
import Recruiter_Type from './JobTypes/Recruiter_Type';
import React from 'react';
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

  return (
    <View style={styles.Container}>
      <View style={styles.Types}>
        <TouchableOpacity {...onTouchJob}>
          <Seeker_Type />
        </TouchableOpacity>
        <TouchableOpacity {...onTouchRec}>
          <Recruiter_Type />
        </TouchableOpacity>
      </View>
      <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.ConfirmBtn}
          onPress={() => {
            isPress
              ? navigation.navigate("Login_Jseeker")
              : navigation.navigate("Login_Recruiter");
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
    marginTop:'8%',
    alignItems: "center",
    justifyContent: "center",
  },
  SelectorOption: {
    margin: "1.5%",
    width: "50%",
    height: "90%",
    backgroundColor: "#F6F6F6",
    borderWidth: 2,
    borderColor: "#EAEBEC",
    borderRadius: 18,
  },
  SelectorOptionOnClick: {
    width: "50%",
    height: "90%",
    backgroundColor: "#EBECFC",
    borderWidth: 2,
    borderColor: "#6369D1",
    borderRadius: 18,
    margin: "1.5%",
  },
  BtnContainer: {
    width: "100%",
    height: "15%",
    top:"25%",
    alignItems: "center",
  },
  ConfirmBtn: {
    width: "92.5%",
    margin: "1.5%",
    height: 50,
    elevation: 8,
    backgroundColor: "#6369D1",
    borderRadius: 24,
    justifyContent:'center'
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
});

