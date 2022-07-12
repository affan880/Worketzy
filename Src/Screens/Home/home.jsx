import { View, Text, Button, StyleSheet, TextInput, ScrollView, SafeAreaView, StatusBar, Alert } from "react-native";
import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeView from "../../Components/CustomComponents/safeView";
import Colors from "../../utils/Colors";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { FontAwesome } from "@expo/vector-icons";
import CardCarousel from "../../Components/CustomComponents/cardCarousel";
import JobCategories from "../../Components/CustomComponents/jobCategories";
import { useFonts } from "expo-font";
import { Raleway_400Regular_Italic } from "@expo-google-fonts/raleway";
import { Montserrat_900Black } from "@expo-google-fonts/montserrat";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { setUser, setDetails } from "../../redux/reducers/userDetails";
import Spinner from "../../Components/CustomComponents/spinner";
import { useChatContext } from "stream-chat-expo";
const Home = () => {
  const dispatch = useDispatch();
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
        </ScrollView>) : <Spinner/>
      }
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryShade,
    width: screenWidth,
    height: screenHeight,
    marginTop:15
  },
  header: {
    width: 386,
    height: 40,
    top: 35,
  },
  headerText: {
    height: 24,
    top: 0,
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
    left: 14,
    top: 10,
  },
  userName: {
    height: 30,
    left: "5%",
    right: "17%",
    top: "40%",
    fontStyle: "normal",
    fontSize: 17,
    lineHeight: 33,
    letterSpacing: 1,
    fontFamily: "Poppins_700Bold",
    color: Colors.textColor2,
  },
  welcomeText: {
    height: 20,
    left: "5%",
    right: "0.5%",
    top: "45%",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 1,
    color: Colors.mediumGrey,
    paddingLeft:0,
    fontFamily: "Raleway_400Regular_Italic",
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
