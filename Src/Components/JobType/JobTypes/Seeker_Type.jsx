import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

function Seeker_Type() {
  return (
    <View style={styles.Container} >
          <View style={styles.IconContainer} >
              <Image source={require("../../../../assets/FindJob.png")} style={styles.IconStyles} />
          </View>
          <View style={styles.JobTypeContainerText} >
                  <Text style={styles.FindJobText} >Find Job</Text>
                  <Text style={styles.FindJobContext} >Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
          </View>
    </View>
  );
}

export default Seeker_Type

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
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    borderColor: "#6369D1",
  },
  IconStyles: {
    width: "70%",
    height: "70%",
  },
  JobTypeContainerText: {
    width: "80%",
    height: "80%",
    top: "10%",
    alignItems: "center",
  },
  FindJobText: {
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 1,
    color: "#2A2A2E",
  },
  FindJobContext: {
    fontStyle: "normal",
    top:8,
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: 1,
    color: "#ACACAF",
  },
});