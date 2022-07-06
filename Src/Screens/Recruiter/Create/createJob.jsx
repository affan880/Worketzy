import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import Colors from '../../../utils/Colors';
import SafeView from '../../../Components/CustomComponents/safeView';
import Form from '../../../Components/forms/form';
import DropdownScreen from '../../../Components/CustomComponents/appMultipleOptionsSelector'
import FormField from '../../../Components/forms/formField';
import ImageForBanner from '../../../Components/CustomComponents/imageForBanner'
import { useSelector, useDispatch } from 'react-redux';
import AppSelectdropdown from '../../../Components/CustomComponents/appSelectdropdown';
import firebase from 'firebase/compat';
import uploadImage from '../../../Components/firebase/authentication/UploadImage';
import { setBanner, setJobInfoTitle, setJobType } from '../../../redux/reducers/jobInfo';
import FormButton from '../../../Components/forms/formButton';

const CreateJob = () => {
  const [JobTitles, setJobTitles] = useState(Titles);
  const Titles = [
  "Engineering",
  "Software Engineering",
  "Mobile Developer",
  "IOS Developer",
  "Android Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Software Architect",
  "Embedded Engineer",
  "Data Engineer",
  "Security Engineer",
  "Machine Learning Engineer",
  "Engineer Manager",
  "QA Engineer",
  "DevOps",
  "Data Scientist",
  "Designer",
  "User Researcher",
    "Visual Designer"
  ]

  useEffect(() => {
    fetch("https://worketzy-job-list.herokuapp.com/api/jobList")
      .then((response) => response.json())
      .then((responseJson) => {
        const b = responseJson
          .map((obj) => obj.subtitle)
          .map((res) =>
            res.map((obj) => (
               obj.title
            ))
          );
        const merged = [].concat(...b);
        setJobTitles(merged);
      });
  }, [])
  const dispatch = useDispatch();
  const Image = useSelector(
    (state) => state.jobInfo.createJobInfo.ImageForBanner
  );
  const Details = {
    JobDescription: "",
    RequiredSkills: "",
    JobRequirements: "",
    JobLocation:""
  };

    const setJob_Titles = (val) => {
      dispatch(setJobInfoTitle(val));
    };
    const setJob_Type = (val) => {
      dispatch(setJobType(val));
    };
    const JobType = [
      "Full-time",
      "Part-time",
      "Self-employed",
      "Free-lance",
      "Contract",
      "Internship",
    ];
  const addImage = () => {
    const filePath = `Jobs/${firebase.auth().currentUser.uid}/${Math.random() * 10}`;
    const set = setBanner;
    uploadImage(filePath, dispatch, set);
    dispatch(setBanner(filePath));
  };
  return (
    <SafeView
      style={{ backgroundColor: Colors.primary, width: "100%", height: "100%" }}
    >
      <ScrollView>
        <Text style={styles.HeaderText}>Post a Full Time Job</Text>
        <ImageForBanner
          image={Image}
          width={"95%"}
          height={180}
          addImage={addImage}
        />
        <View style={{ justifyContent: "center", alignItems: "center", marginBottom:100 }}>
          <Form initialValues={Details} onSubmit={()=>{console.log("done")}} >
            <AppSelectdropdown
              Data={JobType}
              setJobTypeOption={setJob_Titles}
              Name={"Job Type"}
              width="95%"
            />
            <AppSelectdropdown
              Data={JobTitles}
              setJobTypeOption={setJob_Type}
              Name={"Job Title"}
              width="95%"
            />
            <FormField
              name="JobDescription"
              Name="Job Description"
              leftIcon="rename-box"
              placeholder="Fill in Job Description (min 50 words)."
              width={"95%"}
            />
            <FormField
              name="RequiredSkills"
              Name="Required Skills"
              leftIcon="rename-box"
              placeholder="Please fill in required skills "
              width={"95%"}
            />
            <FormField
              name="JobRequirements"
              Name="Job Requirements"
              leftIcon="rename-box"
              placeholder="Please fill in requirements"
              width={"95%"}
            />
            <FormField
              name="JobLocation"
              Name="Job Location"
              leftIcon="rename-box"
              placeholder="Please fill in job location"
              width={"95%"}
            />
            <FormButton title={"Submit"} color={Colors.secondary} width={"95%"} />
          </Form>
        </View>
      </ScrollView>
    </SafeView>
  );
    }
    
    export default CreateJob
    
    const styles = StyleSheet.create({
      HeaderText: {
        fontSize: 24,
        padding: 20,
        paddingTop:30,
        color: Colors.secondary,
        fontWeight: 'bold',
      }
})