import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import Verification from '../verification'
import SafeView from '../../../Components/CustomComponents/safeView'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../redux/reducers/currentUser'
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from 'firebase/compat'
import JobRecruiterAppStack from '../../../Routes/JobRecruiterAppStack'
const VerificationPage = () => {
    const dispatch = useDispatch()
    const [isVerified, setIsVerified] = useState(false)
    const CurrentUserID = useSelector((state) => state.currentUser.user);
    useEffect(() => { 
      LoadUserId();
      // loadVerificationStatus();
    }, [])
    const loadVerificationStatus = async () => {
      const userRef = firebase.firestore().collection("Companies").doc(CurrentUserID.uid);
      const snapshot = await userRef.get();
      const status = snapshot.data().Verified;
      setIsVerified(status)
    }
    const setVerified = async (status) => { 
        try {
            await AsyncStorage.setItem('@isVerified', JSON.stringify(status));
        }
        catch (error) { 
            console.log("Error storing data")
        }
    }
    const verification = async () => { 
       const userRef = firebase.firestore().collection("Companies").doc(CurrentUserID.uid);
        const snapshot = await userRef.get();
        const status = snapshot.data().Verified ;
        setIsVerified(status)
        setVerified(status)
    }
    const LoadUserId = async () => {
        try {
          const user = JSON.parse(await AsyncStorage.getItem("@CurrentUser"));
            user !== null ? dispatch(setUser(user)) : null;
          const status = await AsyncStorage.getItem("@isVerified");
            status !== null ? setIsVerified(JSON.parse(status)) : null;
        } catch (error) {
          console.log(error);
        }
    }
            
  return (
      <SafeView>
          {
              isVerified === false ? <Verification verify ={verification} /> : <JobRecruiterAppStack />
          }
    </SafeView>
  )
}

export default VerificationPage;

const styles = StyleSheet.create({})