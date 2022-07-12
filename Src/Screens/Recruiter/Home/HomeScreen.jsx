import { StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar } from 'react-native'
import SafeView from '../../../Components/CustomComponents/safeView';
import React,{useState, useEffect} from 'react'
import Colors from '../../../utils/Colors';
import PostAJobBtn from './postAJobBtn';
import { useNavigation } from '@react-navigation/native';
import getData from '../../../Functions/getData';
import Spinner from '../../../Components/CustomComponents/spinner';
import { useSelector } from 'react-redux';
import JobsPostedData from './jobsPostedData';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const HomeScreen = () => {
  const navigation = useNavigation(); 
  const [jobsCreated, setJobsCreated] = useState(null);
  const [jobsData, setJobsData] = useState("");
  const userId = useSelector((state) => state.currentUser.user.uid);
  useEffect(() => {
    const URL = `https://worketzy.herokuapp.com/api/jobs/${userId}`;
    getData(URL, setJobsCreated, setJobsData);
  }, []);
  return (
    <SafeView
      style={{ backgroundColor: Colors.primary, width: "100%", height: "100%" }}
    >
      <StatusBar translucent backgroundColor={Colors.primary} />
      {jobsCreated === null ? (
        <Spinner />
      ) : jobsCreated === true ? (
        <JobsPostedData />
      ) : (
        <PostAJobBtn />
      )}
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