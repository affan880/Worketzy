import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Animated } from 'react-native'
import React,{useEffect, useState} from 'react'
import Colors from '../../../utils/Colors'
import Constants from 'expo-constants';
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux'
import firebase from 'firebase/compat';
import { peopleApplied } from "../../../Functions/getData";
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const JobApplications = () => {
  const navigation = useNavigation();
  const [applications, setApplications] = useState([]); 
  const [titles, setTitles] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.currentUser.JobRecruitersInformation.userUniqueId);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const update = () => { 
    let a = [];
    let c = []
      fetch(
        "https://worketzy.herokuapp.com/api/jobs/" + userId,
      )
        .then((response) => response.json())
        .then((responseJson) => {
          responseJson.map((res, index) => {
            res.jobInfo.peopleApplied.map(
              (user) => (
                user.userId !== undefined
                  ? a.push({ id: user.userId, jobTitle: res.jobInfo.jobTitle })
                  : null,
                setApplications([...new Set(a)]),
                applications.map((user) => {
                  c.push(user.jobTitle);
                }
                ),
                setTitles(c)
              )
            );
          });
        });
      a.length = 0;
        let b = [];
        applications.map((application) => {
          firebase
            .firestore()
            .collection("JobSeekers")
            .doc(application.id)
            .get()
            .then((user) => {
              b.push(user.data());
              setData(b);
            });
        });
  }

  const STATUSBAR_HEIGHT = Constants.statusBarHeight;
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        width: "100%",
        height: "100%",
        marginTop: STATUSBAR_HEIGHT,
      }}
    >
      <TouchableOpacity onPress={() => {
        update();
      }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Job Applications
        </Text>
      </TouchableOpacity>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                backgroundColor: Colors.white,
                width: width * 0.9,
                height: height * 0.2,
                margin: 20,
                borderRadius: 15,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: item.userImage,
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    marginLeft: 25,
                  }}
                />
              </View>

              <View
                style={{
                  padding: 30,
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: "bold",
                    paddingBottom: 10,
                  }}
                >
                  {item.ValidFirstName + " " + item.ValidLastName}
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 14,
                    fontWeight: "600",
                    paddingBottom: 10,
                  }}
                >
                  <Ionicons name="ios-location" size={18} color="#197380" />
                  {"  "}
                  Hyderabad
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 14,
                    fontWeight: "600",
                    paddingBottom: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="shield-star"
                    size={18}
                    color="#197380"
                  />
                  {"  "}
                  {titles[index]}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  justifyContent: "space-evenly",
                }}
                onPress={() => {
                  navigation.navigate("JobApplicant", { item });
                }}
              >
                <Entypo name="eye" size={24} color="#197380" />
              </TouchableOpacity>
            </View>
          );
        }}
      >
            </Animated.FlatList>
            </View>
            );
          }
          
          export default JobApplications
          
          const styles = StyleSheet.create({})