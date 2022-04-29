import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JobSeekerType from '../../Components/JobType/Job_Type_Selector'
import Colors from '../../utils/Colors';

export default Login_Sign_up_Screen = () => {
  return (
    <View style={Type.Container} >
      <View style={Type.jobType}>
        <Text style={Type.JobTypeSelector}>Select Job Type</Text>
        <Text style={Type.JobTypeSelectorDetails}>
          Fusce porttitor, velit volutpat mollis porta, nisi tellus viverra
          purus, in condimentum metu neque eget diam.
        </Text>
      </View>
      <JobSeekerType/>
    </View>
  );
};
const Type = StyleSheet.create({
  Container: {
    flex: 1,
  },
  jobType: {
    flexDirection: "column",
    top: "10%",
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
    color: Colors.lightGrey,
    paddingHorizontal: "5%",
    paddingVertical:'3%'
  },
});


