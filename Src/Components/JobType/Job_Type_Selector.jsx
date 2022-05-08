import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import JobTypes from './Job_Types';
import React from 'react';
import Colors from '../../utils/Colors';
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
      <View style={styles.Types}>
        <TouchableOpacity {...onTouchJob}>
          <JobTypes
            TextColor={isPress ? Colors.mediumGrey : Colors.mediumGrey}
            JobType="Find Job"
            JobTypeDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            image={JobTypeICons.FindJob}
          />
        </TouchableOpacity>
        <TouchableOpacity {...onTouchRec}>
          <JobTypes
            TextColor={isPress ? Colors.mediumGrey : Colors.mediumGrey}
            JobType="Find Employee"
            JobTypeDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.mediumGrey,
    borderRadius: 18,
  },
  SelectorOptionOnClick: {
    width: "50%",
    height: "90%",
    backgroundColor: Colors.secondaryShade,
    borderWidth: 2,
    borderColor: Colors.secondary,
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

