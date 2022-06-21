import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import JobSeekerType from '../../Components/JobType/Job_Type_Selector'
import Colors from '../../utils/Colors';
import Spinner from '../../Components/CustomComponents/spinner'; 

export default Login_Sign_up_Screen = () => {
  return (
    <View style={Type.Container}>
      <View style={Type.jobType}>
        <Text style={Type.JobTypeSelector}>Select Job Type</Text>
        <Text style={Type.JobTypeSelectorDetails}>
          Fusce porttitor, velit volutpat mollis porta, nisi tellus viverra
          purus, in condimentum metu neque eget diam.
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
    backgroundColor:Colors.primary,
    flex: 1,
  }, 
  jobType: {
    flexDirection: "column",
    top: "15%",
    height: "30%",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  JobTypeSelector: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 45,
    textAlign: "center",
    letterSpacing: 1,
    color: Colors.black,
  },
  JobTypeSelectorDetails: {
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: 1,
    color: Colors.black,
    paddingHorizontal: "5%",
    paddingVertical:'6%'
  },
});


