import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppSelectdropdown from '../CustomComponents/appSelectdropdown'
import Colors from '../../utils/Colors';
import FormField from '../forms/formField';
import { Feather } from "@expo/vector-icons";
import FormButton from '../forms/formButton';
import { useDispatch, useSelector } from 'react-redux';
import {setuserEmploymentType,setuserDetails} from '../../redux/reducers/userDetails'
const Thirdpage = () => {
  const dispatch = useDispatch();
  const setJob_Type = (val) => {
    dispatch(setuserEmploymentType(val))
  }
  const JobType = [
    "Full-time",
    "Part-time",
    "Self-employed",
    "Free-lance",
    "Contract",
    "Internship",
  ]

  return (
    <View>
      <View
        style={{
          alignItems: "flex-start",
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", paddingBottom: 10 }}>
          Job Preference
        </Text>
        <Text
          style={{ fontSize: 14, fontWeight: "400", color: Colors.mediumGrey }}
        >
          What type of job are you looking for?{" "}
        </Text>
      </View>
      <View style={styles.FormContainer}>
        <AppSelectdropdown
          Data={JobType}
          setJobTypeOption={setJob_Type}
          Name={"Employment Type"}
          width="95%"
        />
        <FormField
          name="PreferedCity"
          Name="Prefered City"
          leftIcon="rename-box"
          placeholder="e.g. Delhi"
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

export default Thirdpage

const styles = StyleSheet.create({
  FormContainer: {
    paddingTop: "5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
});