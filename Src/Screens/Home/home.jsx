import { View, Text, Button, StyleSheet, TextInput, ScrollView, SafeAreaView, StatusBar, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeView from "../../Components/CustomComponents/safeView";
import Colors from "../../utils/Colors";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CardCarousel from "../../Components/CustomComponents/cardCarousel";
import JobCategories from "../../Components/CustomComponents/jobCategories";
import { useFonts } from "expo-font";
import { Raleway_400Regular_Italic } from "@expo-google-fonts/raleway";
import { Montserrat_900Black } from "@expo-google-fonts/montserrat";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { setJobSeekersInformation } from "../../redux/reducers/currentUser";

const screenWidth = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Constants.statusBarHeight;
const screenHeight = Dimensions.get("window").height;
 
const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const loadCurrentUser = async () => {
    const user = await AsyncStorage.getItem("@JobSeekersInformation");
    const data = JSON.parse(user);
    setData(data);
    dispatch(setJobSeekersInformation(data));
  };
  useEffect(() => { 
    loadCurrentUser(); 
  },[])
  const [loading, setLoading] = useState(false);  
    let [fontsLoaded, error] = useFonts({
        Raleway_400Regular_Italic,
        Montserrat_900Black,
        Poppins_700Bold,
      });
  
      if (!fontsLoaded) {
        return null;
  }
  return (
    <SafeView style={styles.container}>
      <StatusBar translucent backgroundColor={Colors.secondaryShade} />
      {!loading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 80,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Home</Text>
            <View style={styles.intro}>
              <Text style={styles.userName}>Hi, {
                data ? data.ValidLastName : "User"
              }</Text>
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
              onChangeText={() => {}}
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
      ) : (
        <Spinner />
      )}
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryShade,
    width: screenWidth,
    height: screenHeight,
    marginTop: STATUSBAR_HEIGHT,
  },
  header: {
    width: 386,
    height: 40,
  },
  headerText: {
    height: 24,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 1,
    color: Colors.textColor2,
    fontFamily: "Montserrat_900Black",
  },
  intro: {
    width: 240,
    height: 57,
    margin: 20,
  },
  userName: {
    height: 30,
    fontStyle: "normal",
    fontSize: 17,
    lineHeight: 33,
    letterSpacing: 1,
    fontFamily: "Poppins_700Bold",
    color: Colors.textColor2,
  },
  welcomeText: {
    height: 20,
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 1,
    color: Colors.white,
    paddingLeft: 0,
    fontFamily: "Raleway_400Regular_Italic",
  },
  searchSection: {
    width: screenWidth - 30,
    height: 40,
    marginTop: 90,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EAEBEC",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    alignItems: "flex-start",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 12,
  },
  Card: {
    width: screenWidth,
    height: "17%",
  },
  jobCard: {
    width: screenWidth,
    height: "17%",
  }
});
