import { View, Text, Button, StyleSheet, TextInput, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserLastName,
  setuserDetails,
  setDetails,
} from "../../redux/reducers/userDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeView from "../../Components/CustomComponents/safeView";
import Colors from "../../utils/Colors";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { FontAwesome } from "@expo/vector-icons";
import CardCarousel from "../../Components/CustomComponents/cardCarousel";
import JobCardCarousel from "../../Components/CustomComponents/jobsCardCarousel";
import JobCategories from "../../Components/CustomComponents/jobCategories";
const Home = () => {
  //   const dispatch = useDispatch();
  //   const details = useSelector((state) => state.userDetails.details);

  // const getMyObject = async () => {
  //     const jsonValue = await AsyncStorage.getItem("@userDetails");
  //     dispatch(setDetails(JSON.parse(jsonValue)));
  //     console.log(details)
  // };
  return (
    <SafeView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>
          <View style={styles.intro}>
            <Text style={styles.userName}>Hi, Affan</Text>
            <Text style={styles.welcomeText}>
              Let's find the right job for you
            </Text>
          </View>
        </View>
        <View style={styles.searchSection}>
          <FontAwesome
            style={styles.searchIcon}
            name="search"
            size={16}
            color="#DBDBDB"
          />
          <TextInput
            style={styles.input}
            placeholder="Search a job"
            onChangeText={() => { }}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.Card}>
          <CardCarousel />
        </View>
        <View style={styles.jobCard}>
          <JobCategories />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryShade,
    width: screenWidth,
    height: screenHeight,
  },
  header: {
    width: 386,
    height: 40,
    left: 14,
    top: 35,
  },
  headerText: {
    height: 24,
    top: 0,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 1,
    color: Colors.black,
    fontWeight: "900",
  },
  intro: {
    width: 240,
    height: 57,
    left: 14,
    top: 10,
  },
  userName: {
    height: 30,
    left: "0%",
    right: "17%",
    fontWeight: "500",
    top: "40%",
    fontStyle: "normal",
    fontSize: 22,
    lineHeight: 33,
    letterSpacing: 1,
  },
  welcomeText: {
    height: 20,
    left: "0%",
    right: "0.5%",
    top: "45%",
    fontStyle: "normal",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    letterSpacing: 1,
    color: Colors.mediumGrey,
  },
  searchSection: {
    width: screenWidth - 30,
    left: 15,
    top: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EAEBEC",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 18,
  },
  Card: {
    top: 150,
    width: screenWidth,
    height: "20%",
  },
});
