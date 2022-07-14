import {
  StyleSheet,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import JobCardCarousel from "./jobsCardCarousel";
import { getMostViewesJobs, mostApplied, recommendedJobs } from "../../Functions/getData";
import firebase from "firebase/compat";
import { useSelector } from "react-redux";
const JobCategories = () => {
  const [userPreferedJobs, setUserPreferedJobs] = useState(null);
  const [userRecommendedJobs, setUserRecommendedJobs] = useState();
  const [userRecommendedJobsState, setUserRecommendedJobsState] = useState(false);
  const [mostViewedJobs, setMostViewedJobs] = useState();
  const [mostViewedJobsState, setMostViewedJobsState] = useState(false);
  const [mostAppliedJobs, setMostAppliedJobs] = useState();
  const [mostAppliedJobsState, setMostAppliedJobsState] = useState(false);

  const CurrentUserID = useSelector((state) => state.currentUser.JobSeekersInformation.userUniqueId);
  const userExpectedRoles = async () => {
    const userRef = firebase
      .firestore()
      .collection("JobSeekers")
      .doc(CurrentUserID);
    const snapshot = await userRef.get();
    const status = snapshot.data().userJobExpectedRole;
    setUserPreferedJobs(status);
  }
  useEffect(() => { 
    CurrentUserID ? userExpectedRoles() : null;
  }, [])
  
  userPreferedJobs !== null && !userRecommendedJobsState
    ? recommendedJobs(
        userPreferedJobs,
        userRecommendedJobs,
        setUserRecommendedJobs,
        setUserRecommendedJobsState
      )
    : null;
 
  useEffect(() => {
    getMostViewesJobs(setMostViewedJobs, setMostViewedJobsState);
    mostApplied(setMostAppliedJobs, setMostAppliedJobsState);
  }, [])
  

  return (
    <View style={{ marginTop: 100, marginBottom: 200 }}>
      {mostAppliedJobsState ? (
        <View key={Math.random()}>
          <JobCardCarousel
            name={"Currently Trending"}
            joblist={mostAppliedJobs}
          />
        </View>
      ) : null}
      {mostViewedJobsState ? (
        <View key={Math.random()}>
          <JobCardCarousel name={"Most Viewed Jobs"} joblist={mostViewedJobs} />
        </View>
      ) : null}
      {
        userRecommendedJobsState ? (
          <View key={Math.random()}>
            <JobCardCarousel name={"Jobs best suited for you"} joblist={userRecommendedJobs} />
        </View>
      ) : null}
      
    </View>
  );
};

export default JobCategories;

const styles = StyleSheet.create({
});
