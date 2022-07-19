import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import Colors from '../../utils/Colors';
import { setJobSeekersInformation } from '../../redux/reducers/currentUser';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FontAwesome,
  Foundation,
  FontAwesome5,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { useChatContext } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';
import { UpdateAplications } from '../../Functions/updateData';
import firebase from 'firebase/compat';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const JobList = ({ route }) => {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const [update, setUpdated] = useState(false);
  const [savedJobsState, setSavedJobsState] = useState(false);
  const Data = route.params;
  const JobsData = Data.item;
  const userId = firebase.auth().currentUser.uid;
  const dispatch = useDispatch();
  const recruiterId = JobsData.recruiterId;

  const saveDetails = () => {
    firebase.firestore().collection("JobSeekers").doc(userId).get().then((doc) => { 
      AsyncStorage.setItem("@JobSeekersInformation", JSON.stringify(doc.data()));
      setJobSeekersInformation(doc.data());
    })
  }

  const NumberOfApplications = () => {
      let peopleApplied = JobsData.jobInfo.peopleApplied;
      peopleApplied.push({
        userId: userId,
      });
        const updatedList = [
          ...peopleApplied,
        ];
      const url =
        "https://worketzy.herokuapp.com/api/jobs/edit/details/" +
        JobsData.recruiterId +
        "/" +
        JobsData.jobsUniqueId;
      const data = {
        peopleApplied: updatedList,
      };
      UpdateAplications(url, data);
        setUpdated(true);
      peopleApplied = JobsData.jobInfo.peopleApplied;
    };
  const CreateChannel = async () => {
    const channel = client.channel("messaging", {
      members: [recruiterId, userId],
    });
    await channel.watch();
    navigation.navigate("ChattingScreen", { channel });
    !update ? NumberOfApplications() : console.log("Already updated");
  }
  useEffect(() => {
       firebase
         .firestore()
         .collection("JobSeekers")
         .doc(userId)
         .get()
         .then((doc) =>
           doc
             .data()
             .savedJobs.some(
               (item) => setSavedJobsState(item.jobsUniqueId === JobsData.jobsUniqueId)
             )
         )

   },[])
 

  const Apply = (JobsData) => {
    CreateChannel(JobsData);
    }
  return (
    <ScrollView scrollEnabled={true} style={{
      backgroundColor: Colors.white,
    }} >
      <View
        style={{ marginBottom: 20 , backgroundColor: Colors.white }}
      >
        <Image
          source={{
            uri: JobsData.jobInfo.image,
          }}
          style={{
            width: width * 0.9,
            height: 220,
            marginTop: 20,
            borderRadius: 15,
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 30,
          }}
        />
        <View
          style={{
            widthL: width,
            height: height * 0.23,
            margin: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            padding: 0,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "#2CA6DA", fontSize: 14, fontWeight: "500" }}>
              {JobsData.companiesInfo.LegalName}
            </Text>
            <Text
              style={{ color: Colors.black, fontWeight: "700", fontSize: 20 }}
            >
              {JobsData.jobInfo.jobTitle}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontWeight: "300",
                fontSize: 16,
                paddingTop: 20,
              }}
            >
              <Ionicons name="ios-location" size={20} color="#197380"/>
                 {"   "}  {JobsData.companiesInfo.Location}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontWeight: "300",
                fontSize: 16,
                paddingTop: 20,
              }}
            >
              <FontAwesome5 name="door-open" size={20} color="#FF8A00" />
              {"   "}
              Number of openings :{JobsData.jobInfo.numberofopenings}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontWeight: "300",
                fontSize: 16,
                paddingTop: 20,
              }}
            >
              <AntDesign name="profile" size={20} color="#2CA6DA" />
              {"    "}
              Number of People Applied :{JobsData.jobInfo.peopleApplied.length}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {
            navigation.navigate("CompanyProfile",{recruiterId});
          }}>
            <Image
              source={{ uri: JobsData.companiesInfo.Logo }}
              style={{ width: 80, height: 80, borderRadius: 15 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: Colors.black,
            paddingLeft: 20,
            fontWeight: "700",
          }}
        >
          Job Description :
        </Text>
        <Text style={styles.Description}>
          {JobsData.jobInfo.jobDescription}
        </Text>
        <View style={styles.requiredSkills}>
          <Text style={styles.requiredSkillsText}>Required Skills</Text>
          <Text style={styles.requiredSkillsDisc}>
            {JobsData.jobInfo.requiredSkills}
          </Text>
        </View>
        <View style={styles.requiredSkills}>
          <Text style={styles.requiredSkillsText}>Job Type</Text>
          <Text style={styles.requiredSkillsDisc}>
            {JobsData.jobInfo.jobType}
          </Text>
        </View>
        <View style={styles.requiredSkills}>
          <Text style={styles.requiredSkillsText}>Job Requirements</Text>
          <Text style={styles.requiredSkillsDisc}>
            {JobsData.jobInfo.jobRequirements}
          </Text>
        </View>
        <View style={styles.requiredSkills}>
          <Text style={styles.requiredSkillsText}>Job Location</Text>
          <Text style={styles.requiredSkillsDisc}>
            {JobsData.jobInfo.jobLocation}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop:60
          }}
        >
         {/* <TouchableOpacity style={styles.Comments} onPress={() => {
            navigation.navigate("Comments" )
          }} >
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                letterSpacing: 1.5,
                fontWeight: "bold",
              }}
            >
              <Foundation name="comments" size={30} color={Colors.white} />
            </Text>
            </TouchableOpacity>*/}
          <TouchableOpacity
            style={styles.SaveBtn}
            onPress={() => {
              const jobsData = {
                jobTitle: JobsData.jobInfo.jobTitle,
                jobsUniqueId: JobsData.jobsUniqueId,
                recruiterId: JobsData.recruiterId,
              };
              firebase
                .firestore()
                .collection("JobSeekers")
                .doc(userId)
                .get()
                .then((doc) => {
                  const dataa = [...doc.data().savedJobs];
                  if (
                    dataa.some(
                      (jobs) => jobs.jobsUniqueId === JobsData.jobsUniqueId
                    )
                  ) {
                    Alert.alert(
                      "Unsave",
                      "Do you want to remove this job from your saved jobs?",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            dataa.splice(
                              dataa.findIndex(
                                (job) =>
                                  job.jobsUniqueId === JobsData.jobsUniqueId
                              ),
                              1
                            );
                            firebase
                              .firestore()
                              .collection("JobSeekers")
                              .doc(userId)
                              .update({
                                savedJobs: [...dataa],
                              })
                              .then(() => {
                                setSavedJobsState(false);
                                AsyncStorage.setItem(
                                  "@JobSeekersInformation",
                                  JSON.stringify(doc.data())
                                );
                                setJobSeekersInformation(doc.data());
                                Alert.alert(
                                  "Removed",
                                  "Job has been removed from your saved jobs",
                                  [{ text: "OK" }]
                                );
                              });
                            setSavedJobsState(false);
                          },
                        },
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel"),
                        },
                      ]
                    );
                  } else {
                    firebase
                      .firestore()
                      .collection("JobSeekers")
                      .doc(userId)
                      .update({
                        savedJobs: [...doc.data().savedJobs, jobsData],
                      });
                    setSavedJobsState(true);
                    AsyncStorage.setItem(
                      "@JobSeekersInformation",
                      JSON.stringify(doc.data())
                    );
                    setJobSeekersInformation(doc.data());
                  }
                });
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                letterSpacing: 1.5,
                fontWeight: "bold",
              }}
            >
              <FontAwesome
                name={!savedJobsState ? "bookmark-o" : "bookmark"}
                size={30}
                color={Colors.white}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ApplyBtn}
            onPress={() => {
              Apply(JobsData);
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                letterSpacing: 1.5,
                fontWeight: "bold",
              }}
            >
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
        
export default JobList
        
        const styles = StyleSheet.create({
          Card: {
            borderRadius: 15,
            backgroundColor: Colors.white,
            alignItems: "center",
          },
          jobTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: Colors.secondary,
            marginTop: 20,
            alignSelf: "center",
          },
          Description: {
            fontSize: 14,
            color: Colors.black,
            marginTop: 10,
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: "300",
          },
          requiredSkills: {
            paddingTop: 10,
            fontSize: 14,
            paddingLeft: 20,
          },
          requiredSkillsText: {
            fontSize: 16,
            color: Colors.black,
            fontWeight: "700",
          },
          requiredSkillsDisc: {
            fontSize: 14,
            color: Colors.black,
            marginTop: 10,
            fontWeight: "300",
          },
          ApplyBtn: {
            width: 280,
            height: 60,
            backgroundColor: Colors.secondary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.primary,
            borderWidth: 1,
            alignSelf: "center",
            marginBottom: 10,
            marginLeft: 5,
          },
          Comments: {
            width: 80,
            height: 60,
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.secondary,
            borderWidth: 1,
            alignSelf: "center",
            marginBottom: 10,
          },
          SaveBtn: {
            width: 80,
            height: 60,
            backgroundColor: Colors.secondary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.primary,
            borderWidth: 1,
            alignSelf: "center",
            marginBottom: 10,
            marginLeft: 5,
          },
        });