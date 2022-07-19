import { StyleSheet, Text, View, Dimensions , ScrollView, TouchableOpacity,Image, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeView from '../../Components/CustomComponents/safeView';
import firebase from 'firebase/compat';
import Spinner from '../../Components/CustomComponents/spinner';
import Colors from '../../utils/Colors';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, MaterialIcons, FontAwesome5} from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const CompanyProfile = ({ route }) => {
  const navigation = useNavigation();
  const { recruiterId } = route.params;
  const [companiesData, setCompaniesData] = useState(null);
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/worketzy-eecf2.appspot.com/o/images%2FAccountant.png?alt=media&token=ed67bea0-8d0a-45ea-a2ea-a33f391294e1"
  );
  const [backGroundImage, setBackGroundImage] = useState("");
  const [joblist, setJobList] = useState(null);

  useEffect(() => { 
    firebase
      .firestore()
      .collection("Utilities")
      .doc("utility")
      .get()
      .then((doc) => {
        setBackGroundImage(doc.data().image);
      })
      .catch((err) => {
        console.log(err);
      })
    firebase.firestore().collection("Companies").doc(recruiterId).get().then((doc) => { 
      setCompaniesData(doc.data());
      setImage(doc.data().Logo);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      console.log("finally");
    }
    )
    fetch("https://worketzy.herokuapp.com/api/jobs/" + recruiterId).then((res) => res.json()).then((res) => { 
      setJobList(res);
    } )
  }, []);
  return (
    <SafeView>
      {companiesData === null ? (
        <Spinner />
      ) : (
        <SafeView
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            width: screenWidth,
            height: screenHeight,
          }}
        >
          <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
            <View style={styles.Container}>
              <View style={styles.ProfileContainer}>
                <View style={{ flexDirection: "row", borderRadius: 18 }}>
                  <View style={styles.imageContainer}>
                    <ImageBackground
                      source={{ uri: backGroundImage }}
                      imageStyle={{
                        borderRadius: 18,
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 18,
                      }}
                    >
                      <Image source={{ uri: image }} style={styles.image} />
                    </ImageBackground>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "95%",
                  height: "100%",
                  borderRadius: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  alignSelf: "flex-start",
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.details}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: Colors.black,
                        letterSpacing: 1.5,
                      }}
                    >
                      {companiesData.CompaniesLegalName}
                    </Text>
                    <Text
                      style={{
                        paddingTop: 3,
                        fontSize: 14,
                        fontWeight: "700",
                        color: "#2CA6DA",
                        letterSpacing: 0.5,
                      }}
                    >
                      {companiesData.Industry}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                      }}
                    >
                      <Ionicons name="ios-location" size={20} color="#12224F" />
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: "400",
                          fontSize: 16,
                        }}
                      >
                        {"  "}
                        {companiesData.CompanyLocation}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 10,
                      }}
                    >
                      <MaterialIcons
                        name="people"
                        size={20}
                        color="#12224F"
                        style={{ alignSelf: "center" }}
                      />
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: "400",
                          fontSize: 16,
                        }}
                      >
                        {"  "}
                        50-100 Employees
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontWeight: "300",
                      color: Colors.black,
                      paddingTop: 50,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum necessitatibus possimus sapiente ipsum hic, iure
                    consequuntur accusantium maxime aut neque harum nihil
                    asperiores earum laudantium sed at sit cupiditate voluptate
                    itaque. Qui officia veniam sapiente amet alias adipisci.
                    Tempora, adipisci autem praesentium placeat rerum officiis
                    mollitia molestias explicabo aspernatur aut consequatur.
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("AvailablePositions", { joblist });
                    }}
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: 20,
                      padding: 10,
                      marginTop: 20,
                      width: "100%",
                      height: 100,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: Colors.white,
                      }}
                    >
                      <FontAwesome5
                        name="coins"
                        size={20}
                        color="#399e5a"
                        style={{
                          padding: 10,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#12224F",
                      }}
                    >
                      Positions Available
                    </Text>
                    <FontAwesome5
                      name="angle-right"
                      size={24}
                      color="#2CA6DA"
                      style={{
                        padding: 10,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                     navigation.navigate("Comments");
                    }}
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: 20,
                      padding: 10,
                      marginTop: 20,
                      width: "100%",
                      height: 100,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: Colors.white,
                      }}
                    >
                      <MaterialIcons
                        name="rate-review"
                        size={20}
                        color="#276fbf"
                        style={{
                          padding: 10,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#12224F",
                      }}
                    >
                      Reviews
                    </Text>
                    <FontAwesome5
                      name="angle-right"
                      size={24}
                      color="#2CA6DA"
                      style={{
                        padding: 10,
                      }}
                    />
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </SafeView>
      )}
    </SafeView>
  );
}

export default CompanyProfile;

const styles = StyleSheet.create({
  Container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: Colors.white,
    marginTop: 40,
    marginBottom:40
  },
  ProfileContainer: {
    width: screenWidth,
    height: screenHeight * 0.25,
    marginLeft: 20,
    marginBottom: 50,
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
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
    position: "absolute",
    bottom: -30,
  },
  imageContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.22,
    borderRadius: 20,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});





{/* 

import { StyleSheet, Text, View, Dimensions , ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import ProfilePic from '../../Profile/profilePic';
import SafeView from '../../../Components/CustomComponents/safeView';
import Colors from '../../../utils/Colors';
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const JobApplicantProfile = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const userId = item.userUniqueId;
  const recruiterId = useSelector(
    (state) => state.currentUser.JobRecruitersInformation.userUniqueId
  );
    const { client } = useChatContext();
  console.log(recruiterId);
    const CreateChannel = async () => {
      const channel = client.channel("messaging", {
        members: [userId, recruiterId],
      });
      await channel.watch();
      navigation.navigate("ChattingScreen", { channel });
    };
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
              <ProfilePic user={item} />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.ValidLastName}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    letterSpacing: 0.5,
                    color: Colors.white,
                    paddingTop: 0,
                  }}
                >
                  {item.userJobExpectedRole[1]}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    paddingTop: 8,
                  }}
                >
                  <Ionicons
                    name="ios-location-outline"
                    size={20}
                    color="white"
                  />
                  {item.ValidFirstName}
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
      <TouchableOpacity
        onPress={CreateChannel}
        style={{
          backgroundColor: Colors.white,
          width: "90%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
          alignSelf: "center",
          borderRadius: 20,
        }}
      >
        <Text style={styles.button}>Chat</Text>
      </TouchableOpacity>
    </SafeView>
  );
};
export default JobApplicantProfile

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
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
  }
});

*/}