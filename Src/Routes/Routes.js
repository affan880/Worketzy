import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormStack from "./formStack";
import AuthStack from "./authStack";
import { AuthUserContext, AuthUserExistContext } from "./authUserProvider";
import AppStack from "./appStack";
import Spinner from "../Components/CustomComponents/spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setDetails, setApplicationType } from "../redux/reducers/userDetails";
import { setRecruiterStatus } from "../redux/reducers/recruiterDetails";
import Index from "../Screens/Recruiter";
import JobRecruiterFormStack from "./jobRecruiterFormStack";


export default function JobTypeSelectorRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails.user);
  const recruiterStatus = useSelector((state) => state.recruiterDetails.recruiterStatus);
  const ApplicationType = useSelector((state) => state.userDetails.applicationType);
  const auth = getAuth();
  useEffect(() => {
    loadType();
    load();
    loadRecruiter();
  }, []);
  const SetUserDetails = (snap, authUser) => {
    dispatch(
      setUser({
        status: snap.exists,
        id: authUser.uid,
      })
    );
    const val = {
      status: snap.exists,
      id: authUser.uid,
    };
    storeUser(val);

  }
  const SetRecruiterDetails = (snap, authUser) => { 
    dispatch(
      setRecruiterStatus({
        status: snap.exists,
        id: authUser.uid,
      })
    );
    const RecVal = {
      status: snap.exists,
      id: authUser.uid,
    };
    storeRecruiter(RecVal);
  }
  const dataStatusJobSeeker = async (authUser) => {
    await firebase
      .firestore()
      .collection("JobSeekers")
      .doc(authUser.uid)
      .get()
      .then((snap) => {
        SetUserDetails(snap, authUser);
      })
  };
  const dataStatusRecruiter = async (authUser) => {
    await firebase
      .firestore()
      .collection("Recruiters")
      .doc(authUser.uid)
      .get()
      .then((snap) => {
        SetRecruiterDetails(snap, authUser);
      });
  }
  const dataStatus = async (authUser) => { 
    dataStatusRecruiter(authUser);
    dataStatusJobSeeker(authUser);
  }
const storeUser = async (val) => {
  try {
    await AsyncStorage.setItem("@usersDetails", JSON.stringify(val));
   
  } catch (e) {
    console.log("Error saving data storeId");
  }
};
const storeRecruiter = async (RecVal) => {
  try {
    await AsyncStorage.setItem("@RecruitersDetails", JSON.stringify(RecVal));
   
  } catch (e) {
    console.log("Error saving data storeId");
  }
  };

  const load = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("@UsersDetails"));
      users !== null ? dispatch(setUser(users)) : null;
    }
    catch (err) {
      console.log("load" + err)
    }
  } 
  const loadRecruiter = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("@RecruitersDetails"));
      users !== null ? dispatch(setRecruiterStatus(users)) : null;
    }
    catch (err) {
      console.log("loadRecruiter" + err)
    }
  } 
  const loadType = async () => { 
    try {
      const ApplicationType = await AsyncStorage.getItem("@ApplicationType");
      ApplicationType !== null
        ? dispatch(setApplicationType(ApplicationType))
        : null;
      
    }
    catch (err) {
      console.log("loadType" + err)
    }
  }
useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged (auth, (authUser) => {
        try {
          (authUser ? dataStatus(authUser) :null);
        } catch (error) {
          console.log(error);
        }
      });
      return unsubscribeAuth;
    },[]);
  
  return (
    <NavigationContainer>
      {
        user.id || recruiterStatus.id ?
          (user.status || recruiterStatus.status ?
            (ApplicationType === "JobSeekers" ? <AppStack /> : !recruiterStatus.status ?  <JobRecruiterFormStack/> : <Index/>) :
            (ApplicationType === "JobSeekers" ? <FormStack /> : <JobRecruiterFormStack />)) : <AuthStack />
      }
    </NavigationContainer>
  );
}
