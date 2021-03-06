import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import Verification from '../verification'
import SafeView from '../../../Components/CustomComponents/safeView'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../redux/reducers/currentUser'
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from 'firebase/compat'
import JobRecruiterAppStack from '../../../Routes/JobRecruiterAppStack'
import AppStack2 from '../../../Routes/AppStack2'
const VerificationPage = () => {
    const dispatch = useDispatch()
    const [isVerified, setIsVerified] = useState(false)
  const CurrentUserID = useSelector((state) => state.currentUser.user);
  const uid = firebase.auth().currentUser.uid;
    useEffect(() => { 
      LoadUser();
      verification();
    }, [])
    const setVerified = async (status) => { 
        try {
            await AsyncStorage.setItem('@isVerified', JSON.stringify(status));
        }
        catch (error) { 
            console.log("Error storing data")
        }
    }
    const verification = async () => { 
      const userRef = firebase
        .firestore()
        .collection("Companies")
        .doc(uid || CurrentUserID.uid).get().then(async (doc) => { 
          if (doc.exists) {
            const data = doc.data();
            if (data.Verified) {
              setIsVerified(true);
              setVerified(true);
            }
            else {
              setIsVerified(false);
            }
          }
        })
    }
    const LoadUser = async () => {
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
              isVerified === false ? <Verification verify ={verification} /> : <AppStack2 />
          }
    </SafeView>
  )
}

export default VerificationPage;

const styles = StyleSheet.create({})