import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppRadioButton from "../CustomComponents/appRadioButton"
import Colors from "../../utils/Colors";
import FormField from "../forms/formField";
import { Feather } from "@expo/vector-icons";
import FormButton from "../forms/formButton";
import DropdownScreen from "../CustomComponents/appMultipleOptionsSelector";
import {setuserJobType} from '../../redux/reducers/userDetails'
import {useSelector, useDispatch} from 'react-redux'
const Fourthpage = () => {
  const dispatch = useDispatch();
  const selectedValue = useSelector((state) => state.userDetails.details.userJobType);
  console.log(selectedValue)
  const userSelectedJobtype = (val) => {
    dispatch(setuserJobType(val));
  }
    const radioButtonsData = [
      {
        id: "1",
        label: "Yes",
        value: "Yes",
      },
      {
        id: "2",
        label: "No ",
        value: "No",
      },
    ];

  return (
    <View>
      <View style={styles.FormContainer}>
        <DropdownScreen Name="What kind of role you are looking for? " />
        <AppRadioButton
          radioButtonsData={radioButtonsData}
          value={selectedValue}
          setValue={userSelectedJobtype}
          width="95%"
          Name={"Are you open to work remotely?"}
        />
        {/*        
        <AppSelectdropdown
          Data={Job_Type}
          setJobTypeOption={setJobTypeOption}
          Name={"What technologies are you interested in?"}
          width="95%"
        />*/}
        <FormField
          name="expectfromyournextjob"
          Name="What are you expecting from your next job?"
          leftIcon="rename-box"
          placeholder="e.g. environment, safety, etc."
          width={"95%"}
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

export default Fourthpage;

const styles = StyleSheet.create({
  FormContainer: {
    paddingTop: "5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
});
