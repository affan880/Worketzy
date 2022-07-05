import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import FormButton from '../forms/formButton';
import Colors from '../../utils/Colors';
import { Feather } from "@expo/vector-icons";
import AppToggleBtn from '../CustomComponents/appToggleBtn';
import FormField from '../forms/formField';
import AppRadioButton from '../CustomComponents/appRadioButton';
import { useSelector, useDispatch } from 'react-redux'
import {setUserEmployeeStatus, setuserIsstudent, setuserDetails} from '../../redux/reducers/userDetails'


const SecondPage = () => {
  const checked = useSelector((state) => state.userDetails.details.userEmployeeStatus);
  const student  = useSelector((state)=>state.userDetails.details.userIsstudent)
  const dispatch = useDispatch();

  const setChecked = (value) => {
    dispatch(setUserEmployeeStatus(value));
  }
  const toggleSwitch = () => dispatch(setuserIsstudent(!student));
  const radioButtonsData = [
    {
      id: "1",
      label: "Former",
      value: "former",
    },
    {
      id: "2",
      label: "Current",
      value: "current",
    },
  ];

  return (
    <View>
      <View style={styles.FormContainer}>
        <Text style={styles.ProfileText}>
          Setting up your profile helps you to discover suitable workplaces and
          ooportunities.
        </Text>
        <AppToggleBtn
          student={student}
          value={student}
          onPress={toggleSwitch}
          width={"95%"}
          name="I'm a student"
        />
        {student ? (
          <View>
            <FormField
              name="UniversityName"
              Name="University/School Name"
              leftIcon="rename-box"
              placeholder="Enter your university or college name"
              width={"95%"}
            />
          </View>
        ) : null}
        <FormField
          name="RecentEmployer"
          Name="Who is your most recent employer?"
          leftIcon="rename-box"
          placeholder="Most recent employer?"
          width={"95%"}
        />
        <AppRadioButton
          radioButtonsData={radioButtonsData}
          value={checked}
          setValue={setChecked}
          width="95%"
          Name={"Are you a Current or Former Employee ?"}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <FormButton
          title={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginRight: 10,
                  color: Colors.ghostWhite,
                }}
              >
                Next
              </Text>
              <Feather
                name="chevron-right"
                size={24}
                color={Colors.ghostWhite}
              />
            </View>
          }
          width="95%"
        />
      </View>
    </View>
  );
};

export default SecondPage;

const styles = StyleSheet.create({
  FormContainer: {
    paddingTop: "5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    },
    ProfileText: {
        fontSize: 20,
        marginHorizontal:20,
        marginVertical:30,
        fontWeight:"bold",
        fontStyle: 'normal',
        color: Colors.RichBlack,
        textAlign:'center'
    }
});