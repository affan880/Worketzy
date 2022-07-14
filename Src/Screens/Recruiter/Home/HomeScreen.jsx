import { StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar } from 'react-native'
import SafeView from '../../../Components/CustomComponents/safeView';
import React,{useState, useEffect} from 'react'
import Colors from '../../../utils/Colors';
import PostAJobBtn from './postAJobBtn';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../../../Functions/getData';
import Spinner from '../../../Components/CustomComponents/spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat';
import JobsPostedData from './jobsPostedData';
import { useDispatch, useSelector } from 'react-redux';
import { setJobRecruitersInformation, setCompaniesInformation } from '../../../redux/reducers/currentUser';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const recruitersData = useSelector((state) => state.currentUser.JobRecruitersInformation);
  const companiesData = useSelector((state) => state.currentUser.CompaniesInformation);
  const [jobsCreated, setJobsCreated] = useState(null);
  const [jobsData, setJobsData] = useState("");
  const userId = firebase.auth().currentUser.uid;
  useEffect(() => {
    const URL = `https://worketzy.herokuapp.com/api/jobs/${userId}`;
    getData(URL, setJobsCreated, setJobsData);
  }, []);

  const LoadData = async () => {
            const userRef = await firebase
              .firestore()
              .collection("Recruiters")
              .doc(userId)
              .get();
            const userData = userRef.data();
          const companyref = await firebase
            .firestore()
            .collection("Companies")
            .doc(userId)
            .get();
          const CompanyData = companyref.data();
          await AsyncStorage.setItem(
            "@JobRecruitersInformation",
            JSON.stringify(userData)
          ).then(() => {
            console.log("JobRecruitersInformation stored");
          });
          dispatch(setJobRecruitersInformation(userData))
          await AsyncStorage.setItem("@CompaniesInformation", JSON.stringify(CompanyData)).then(() => { 
            console.log("CompaniesInformation stored");
          })
          dispatch(setCompaniesInformation(CompanyData))
  }
  recruitersData === null && companiesData === null ? LoadData() : null;


  return (
    <SafeView
      style={{ backgroundColor: Colors.primary, width: "100%", height: "100%" }}
    >
      <StatusBar translucent backgroundColor={Colors.primary} />
      {jobsCreated === null || jobsCreated.message ? (
        <Spinner />
      ) : jobsCreated === true ? (
        <JobsPostedData />
      ) : jobsCreated === false ? (
        <PostAJobBtn />) : null
      }
    </SafeView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  Card: {
    width: width,
    height: height,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 40,

  },
  Navigationbutton: {
    width: "50%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 15,
    top: width/2 * 1.5,
  },
  navigationBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  }
})