import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormStack from "./formStack";
import AuthStack from "./authStack";
import AppStack from "./appStack";
import Spinner from "../Components/CustomComponents/spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setDetails, setApplicationType } from "../redux/reducers/userDetails";
import { setRecruiterStatus } from "../redux/reducers/recruiterDetails";
import VerificationPage from "../Screens/Recruiter/VerificationPage/VerificationPage";
import JobRecruiterFormStack from "./jobRecruiterFormStack";
import RecriuterHome from "../Screens/Recruiter/VerificationPage/VerificationPage";


export default function JobTypeSelectorRoute() {
  useEffect(() => {
    loadType();
    load();
    loadRecruiter();
  }, []);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails.user);
  const recruiterStatus = useSelector((state) => state.recruiterDetails.recruiterStatus);
  const ApplicationType = useSelector((state) => state.userDetails.applicationType);
  const auth = getAuth();
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
    setLoading4(false);

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
      setLoading2(true);
      const users = JSON.parse(await AsyncStorage.getItem("@UsersDetails"));
      users !== null ? dispatch(setUser(users)) : null;
      setLoading2(false);
    }
    catch (err) {
      console.log("load" + err)
    }
    finally {
      const users = JSON.parse(await AsyncStorage.getItem("@UsersDetails"));
      users === null ? setLoading2(false) : null;
    }
  } 
  const loadRecruiter = async () => {
    try {
      setLoading3(true);
      const users = JSON.parse(await AsyncStorage.getItem("@RecruitersDetails"));
      users !== null ? dispatch(setRecruiterStatus(users)) : null;
      setLoading3(false)
    }
    catch (err) {
      console.log("loadRecruiter" + err);
    }
    finally {
      const users = JSON.parse(await AsyncStorage.getItem("@RecruitersDetails"));
      users === null ? setLoading3(false) : null;
    }
  } 
  const loadType = async () => { 
    try {
      setLoading1(true)
      const ApplicationType = await AsyncStorage.getItem("@ApplicationType");
      ApplicationType !== null
        ? dispatch(setApplicationType(ApplicationType))
        : null;
      setLoading1(false)
      
    }
    catch (err) {
      console.log("loadType" + err)
    }
    finally { 
      const ApplicationType = await AsyncStorage.getItem("@ApplicationType");
      ApplicationType === null ? setLoading1(false) : null;
    }
  }
useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged (auth, (authUser) => {
        try {
          (authUser ? dataStatus(authUser) : setLoading4(false));
        } catch (error) {
          console.log(error);
        }
      });
      return unsubscribeAuth;
    },[]);
  
  return (
    <NavigationContainer>
      { !loading1 && !loading2 && !loading3 && !loading4 ?( user.id || recruiterStatus.id ? (
        user.status || recruiterStatus.status ? (
          ApplicationType === "JobSeekers" ? (
            <AppStack />
          ) : !recruiterStatus.status && ApplicationType === "Recruiters" ? (
            <JobRecruiterFormStack />
          ) : ApplicationType === null ? <Spinner/> : (
            <VerificationPage />
          )
        ) : ApplicationType === "JobSeekers" && !user.status ? (
          <FormStack ApplicationType ={ApplicationType}  />
        ) : (
          <JobRecruiterFormStack />
        )
      ) : (
        <AuthStack />
      )) : <Spinner/>}
    </NavigationContainer>
  );
}
