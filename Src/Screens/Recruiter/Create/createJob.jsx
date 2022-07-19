import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import React,{useEffect, useState} from 'react'
import Colors from '../../../utils/Colors';
import SafeView from '../../../Components/CustomComponents/safeView';
import Form from '../../../Components/forms/form';
import FormField from '../../../Components/forms/formField';
import ImageForBanner from '../../../Components/CustomComponents/imageForBanner'
import { useSelector, useDispatch } from 'react-redux';
import AppSelectdropdown from '../../../Components/CustomComponents/appSelectdropdown';
import uploadImage from '../../../Components/firebase/authentication/UploadImage';
import { setBanner, setJobInfoTitle, setJobType, setCreateJobInfo } from '../../../redux/reducers/jobInfo';
import FormButton from '../../../Components/forms/formButton';
import { post } from '../../../Functions/postRequest';
import { useNavigation } from '@react-navigation/native';
const CreateJob = () => {
  const navigation = useNavigation();
  const userId = useSelector((state) => state.currentUser.JobRecruitersInformation.userUniqueId);
  const companiesInfo = useSelector((state) => state.currentUser.CompaniesInformation);
  const jobInfo = useSelector((state) => state.jobInfo.createJobInfo);
  const [JobTitles, setJobTitles] = useState(Titles);
  const [progress, setProgress] = useState(false);
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
        JobLocation: "",
        NumberOfOpenings:""
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
    const filePath = `Jobs/${userId}/${Math.random() * 10}`;
    const set = setBanner;
    uploadImage(filePath, dispatch, set, progress, setProgress);
    dispatch(setBanner(filePath));
  };
  const submit = (values) => {
    const {
      JobDescription,
      RequiredSkills,
      JobRequirements,
      JobLocation,
      NumberOfOpenings
    } = values;
    const data = {
      recruiterId: userId,
      jobsUniqueId: Math.round(Math.random() * 10000000000),
      jobTitle: `${jobInfo.JobTitle}`,
      jobInfo: {
        image: `${jobInfo.ImageForBanner}`,
        jobTitle: `${jobInfo.JobTitle}`,
        jobType: `${jobInfo.JobType}`,
        jobDescription: `${JobDescription}`,
        requiredSkills: `${RequiredSkills}`,
        jobRequirements: `${JobRequirements}`,
        jobLocation: `${JobLocation}`,
        numberofopenings: `${NumberOfOpenings}`,
        numberofViews: 0,
        points: 0,
        numberofPeopleRated: 0,
        peopleApplied: [],
        reviews: []
      },
      companiesInfo: {
        LegalName: `${companiesInfo.CompaniesLegalName}`,
        Description: `This is ${companiesInfo.CompaniesLegalName}`,
        Location: `${companiesInfo.CompanyLocation}`,
        Logo: `${companiesInfo.Logo}`,
        Website: `${companiesInfo.CompanyWebsite}`,
        Industry: `${companiesInfo.Industry}`,
      },
    };
    const url = "https://worketzy.herokuapp.com/api/jobs";
    const msg = "Job Created Successfully";
    post(data, url, msg, navigation);
    dispatch(
      setCreateJobInfo({
        UniqueId: "",
        ImageForBanner:"https://firebasestorage.googleapis.com/v0/b/worketzy-eecf2.appspot.com/o/images%2FEngineer2.jpg?alt=media&token=34936b04-639d-4530-815c-eb2508e98b44",
        JobType: "",
        JobTitle: "",
        JobDescription: "",
        RequiredSkills: "",
        JobRequirements: "",
        JobLocation: "",
      })
    );
    }
  return (
    <SafeView
      style={{
        backgroundColor: Colors.primary,
        width: "100%",
        height: "100%",
        marginTop: 10,
      }}
    >
      <StatusBar translucent backgroundColor={Colors.primary} />
      <ScrollView>
        <Text style={styles.HeaderText}>Post a Full Time Job</Text>
        <ImageForBanner
          image={Image}
          width={"95%"}
          height={180}
          addImage={addImage}
          progress={progress}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          <Form
            initialValues={Details}
            onSubmit={(values, { resetForm }) => {
              submit(values);

              resetForm(Details);
            }}
          >
            <AppSelectdropdown
              Data={JobType}
              setJobTypeOption={setJob_Type}
              Name={"Job Type"}
              width="95%"
            />
            <AppSelectdropdown
              Data={JobTitles}
              setJobTypeOption={setJob_Titles}
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
              name="NumberOfOpenings"
              Name="Number Of Openings"
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
            <FormButton
              title={"Submit"}
              color={Colors.secondary}
              width={"95%"}
            />
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
        color: Colors.white,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
      }
})