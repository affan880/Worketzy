import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  RefreshControl,
  Alert,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../utils/Colors";
import { Entypo } from "@expo/vector-icons";
import Spinner from '../../Components/CustomComponents/spinner';
import { useSelector } from "react-redux";
import firebase from "firebase/compat";
import { savedJobsData } from "../../Functions/getData";
import { useNavigation } from "@react-navigation/native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const JobsPostedData = () => {
  const navigation = useNavigation();
  const savedJobs = useSelector((state) => state.currentUser.JobSeekersInformation.savedJobs);
  const [JobsData, setJobsData] = useState(savedJobs);
  const [allSavedJobs, setAllSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.currentUser.JobSeekersInformation.ValidFirstName);
  const user = useSelector((state) => state.currentUser.JobSeekersInformation.userUniqueId);
  const [refreshing, setRefreshing] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(false);
  useEffect(() => {
    JobsData ? loadUserData() : null;
     firebase
       .firestore()
       .collection("JobSeekers")
       .doc(user)
       .get()
       .then((doc) => {
         setJobsData(doc.data().savedJobs);
         JobsData ? (
           setIsLoading(false),
           setDataAvailable(true),
           setJobsData(doc.data().savedJobs)
        ) : setDataAvailable(false);
       });
     if (!isLoading) {
       savedJobsData(JobsData, setAllSavedJobs, setRefreshing);
     }
  },[]);
  const loadUserData = () => {
    firebase
      .firestore()
      .collection("JobSeekers")
      .doc(user)
      .get()
      .then((doc) =>{
        setJobsData(doc.data().savedJobs);
        setIsLoading(false);
      }
    );
      savedJobsData(JobsData, setAllSavedJobs, setRefreshing);
  };
  return (
    <View style={styles.Container}>
      {
        !dataAvailable ? <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: height * 0.3,
          color: Colors.white
        }} >No jobs are saved</Text> :
        (<Animated.FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={allSavedJobs}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} hitSlop={loadUserData} />
        }
        style={{marginBottom:120}}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                height: height * 0.13,
                width: width * 0.95,
                alignItems: "center",
                backgroundColor: Colors.secondary,
                margin: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.companiesInfo.Logo }}
                style={{
                  width: "20%",
                  height: "70%",
                  resizeMode: "cover",
                  borderRadius: 18,
                  margin: 10,
                  alignSelf: "flex-start",
                }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: "500",
                    paddingLeft: 10,
                    letterSpacing: 2,
                    paddingBottom: 5,
                  }}
                >
                  {item.companiesInfo.LegalName}
                </Text>
                <Text
                  style={{
                    color: Colors.mediumGrey,
                    fontSize: 12,
                    fontWeight: "400",
                    paddingLeft: 10,
                    letterSpacing: 1,
                  }}
                >
                  {" "}
                  {item.jobInfo.jobTitle}{" "}
                </Text>
              </View>
              <TouchableOpacity onPress={() => { 
                navigation.navigate("JobList", { item, userId });
              }}
              style={{ left: "75%", position:'absolute', borderColor:Colors.white, backgroundColor:Colors.secondaryShade,paddingHorizontal:5, borderWidth:1, borderRadius:10 }} >
                <View style={{ flexDirection: "row", justifyContent:"space-between", alignItems:"center" }}>
                <Entypo name="eye" size={14} color={Colors.white} style={{padding:10}} />
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 14,
                    fontWeight: "300",
                    letterSpacing: 2,
                  }}
                >
                  View
                  </Text>
                  </View>
              </TouchableOpacity>
            </TouchableOpacity>
          );
          }}
          ></Animated.FlatList>)
        }
      </View>
      );
};

export default JobsPostedData;

const styles = StyleSheet.create({
  Container: {
    width: width,
    height: height,
    backgroundColor: Colors.secondaryShade,
  },
  Card: {
    borderRadius: 15,
    width: width * 0.5,
    height: height,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    marginTop: 20,
  },
  Description: {
    fontSize: 12,
    color: Colors.primary,
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "300",
  },
  moreBtn: {
    fontSize: 14,
    color: Colors.secondary,
  },
  reviewBtn: {
    flexDirection: "row",
    width: "70%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    width: "20%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    backgroundColor: Colors.secondary,
  },
  openingsLeft: {
    width: "70%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    backgroundColor: Colors.white,
  },
  peopleApplied: {
    width: "20%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    paddingTop: 35,
    paddingBottom:15
  }
});
