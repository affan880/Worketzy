import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import SafeView from "../../../Components/CustomComponents/safeView";
import Colors from "../../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Profile = () => {
  //   const dispatch = useDispatch();
  //   const details = useSelector((state) => state.userDetails.details);

  // const getMyObject = async () => {
  //     const jsonValue = await AsyncStorage.getItem("@userDetails");
  //     dispatch(setDetails(JSON.parse(jsonValue)));
  //     console.log(details)
  // };
  const user = useSelector((state) => state.currentUser.CompaniesInformation);
  const auth = getAuth();
  const navigation = useNavigation();
  return (
    <SafeView
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        width: screenWidth,
        height: screenHeight,
      }}
    >
      <ScrollView scrollEnabled={true}>
        <View style={styles.Container}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: Colors.white,
              marginTop: 80,
              marginLeft: 20,
              marginBottom: 50,
              letterSpacing: 1,
            }}
          >
            Profile
          </Text>
          <View style={styles.ProfileContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: user.Logo }} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{user.CompaniesLegalName}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    letterSpacing: 0.5,
                    color: Colors.white,
                    paddingTop: 0,
                  }}
                >
                  {user.Industry}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    paddingTop: 8,
                    color: Colors.white,
                  }}
                >
                  <Ionicons
                    name="ios-location-outline"
                    size={20}
                    color="white"
                  />
                  {user.CompanyLocation}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: Colors.white,
              marginLeft: 20,
              letterSpacing: 1,
              marginBottom: 0,
            }}
          >
            About Me
          </Text>
          <View
            style={{
              width: "95%",
              height: "20%",
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              alignSelf: "flex-start",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontWeight: "300",
                  color: Colors.white,
                  textAlign: "justify",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                necessitatibus possimus sapiente ipsum hic, iure consequuntur
                accusantium maxime aut neque harum nihil asperiores earum
                laudantium sed at sit cupiditate voluptate itaque. Qui officia
                veniam sapiente amet alias adipisci. Tempora, adipisci autem
                praesentium placeat rerum officiis mollitia molestias explicabo
                aspernatur aut consequatur.
              </Text>
            </ScrollView>
            </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: Colors.primary,
  },
  ProfileContainer: {
    width: screenWidth,
    height: screenHeight * 0.25,
    marginLeft: 20,
  },
  textContainer: {
    textAlign: "center",
    marginLeft: 20,
    marginTop: 10,
    width: screenWidth * 0.5,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.white,
  },
  image: {
    width: 130,
    height: 170,
    borderRadius: 20,
  },
  imageContainer: {
    width: 130,
    height: 170,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
});
