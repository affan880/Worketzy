import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppSelectdropdown from "../CustomComponents/appSelectdropdown";
import Colors from "../../utils/Colors";
import FormField from "../forms/formField";
import { Feather } from "@expo/vector-icons";
import FormButton from "../forms/formButton";
const Fourthpage = ({ setJobTypeOption }) => {
  const Job_Type = [
    "Full-time",
    "Part-time",
    "Self-employed",
    "Free-lance",
    "Contract",
    "Internship",
  ];
  return (
    <View>
      <View style={styles.FormContainer}>
        <AppSelectdropdown
          Data={Job_Type}
          setJobTypeOption={setJobTypeOption}
          Name={"What kind of role you are looking for?"}
          width="95%"
        />
        <AppSelectdropdown
          Data={Job_Type}
          setJobTypeOption={setJobTypeOption}
          Name={"Are you open to work remotely?"}
          width="95%"
        />
        <AppSelectdropdown
          Data={Job_Type}
          setJobTypeOption={setJobTypeOption}
          Name={"What technologies are you interested in?"}
          width="95%"
        />
        <AppSelectdropdown
          Data={Job_Type}
          setJobTypeOption={setJobTypeOption}
          Name={"What motivates you during your work?"}
          width="95%"
        />
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
