import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Colors from "../../utils/Colors";

function JobTypes(props) {
  return (
    <View style={styles.Container}>
      <View style={styles.IconContainer}>
        <Image source={props.image} style={styles.IconStyles} />
      </View>
      <View style={styles.JobTypeContainerText}>
        <Text style={styles.FindJobText}>{props.JobType}</Text>
        <Text
          style={
            (
            {
              color: props.TextColor,
              fontStyle: "italic",
              fontSize: 12,
              lineHeight: 20,
              textAlign: "center",
              fontWeight: "100",
              letterSpacing: 1,
            })
          }
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
    color: Colors.black,
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
