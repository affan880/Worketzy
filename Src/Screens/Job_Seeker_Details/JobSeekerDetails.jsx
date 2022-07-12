import { StyleSheet, Text, View, ScrollView } from "react-native";
import React,{useState,useEffect} from 'react'
import Form from '../../Components/forms/form'
import { validationSchemaUserDetails } from '../../Validation/InputValidation';
import {createUserDocument} from "../../Components/firebase/authentication/createUserDocument";
import Colors from '../../utils/Colors';
import FirstPage from "../../Components/JobSeekerFormPages/firstPage";
import SecondPage from "../../Components/JobSeekerFormPages/SecondPage";
import ThirdPage from "../../Components/JobSeekerFormPages/thirdpage"
import FourthPage from "../../Components/JobSeekerFormPages/fourthPage"
import FormButton from "../../Components/forms/formButton";;
import { useSelector, useDispatch } from "react-redux"
import { setUser, setDetails } from "../../redux/reducers/userDetails";
import { setUserImage } from "../../redux/reducers/currentUser";
import uploadImage from "../../Components/firebase/authentication/UploadImage";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";

const JobSeekerDetails = () => {
  const navigation = useNavigation();
  const uid = useSelector((state) => state.recruiterDetails.recruiterStatus.id);
  const user = useSelector((state) => state.userDetails.user.status);
  const details = useSelector((state) => state.userDetails.details);
  const image = useSelector((state) => state.currentUser.userImage);
  const [progress, setProgress] = useState();
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState("1");
    useEffect(() => {
      loadUser();
      loadUserDetails();
    }, []);
  const storeId = async (val) => {
    try {
      await AsyncStorage.setItem("@userId", JSON.stringify(val));
    } catch (e) {
      console.log("Error saving data storeId");
    }
  };
  const storeDetails = async (userDetails) => {
    try {
      await AsyncStorage.setItem("@userDetails", JSON.stringify(userDetails)).then(() => {
      })
    } catch (e) {
      console.log("Error saving data storeDetails");
    }
  };
  const loadUser = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("@userId"));
      users !== null ? dispatch(setUser(users)) : null;
    } catch (err) {
      console.log("load" + err);
    }
  }; 
  const loadUserDetails = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("@userDetails"));
      users !== null ? dispatch(setDetails(users)) : null;
    } catch (err) {
      console.log("load" + err);
    }
  }; 

  const Details = {
    ValidFirstName: "",
    ValidLastName: "",
    ValidEmail: "",
    Bio: "",
    UniversityName: "",
  };

   function handleUserinfo(values) {
     const { ValidFirstName, ValidLastName, ValidEmail, Bio, UniversityName } = values; 
     try {
       const userDetails = {
         ValidFirstName: ValidFirstName,
         ValidLastName: ValidLastName,
         ValidEmail: ValidEmail,
         Bio: Bio,
         UniversityName: UniversityName,
         userUniqueId: "",
         userImage: image,
         userPhone: details.userPhone,
         userIsstudent: details.userIsstudent,
         userRecentEmployer: details.userRecentEmployer,
         userEmployeeStatus: details.userEmployeeStatus,
         userEmploymentType: details.userEmploymentType,
         userPreferedCity: details.userPreferedCity,
         userJobType: details.userJobType,
         userJobExpectedRole: details.userJobExpectedRole,
         userJobCategory: details.userJobCategory,
         userNextJobExpectations: details.userNextJobExpectations,
         userUniqueId: uid
       };
       const uploaded = createUserDocument(user, uid, userDetails);
       firebase.auth().currentUser.updateProfile({
         displayName: `${ValidFirstName +""+ ValidLastName}`,
         photoURL: image,
         email : ValidEmail
       });
       dispatch(setDetails(userDetails));
        storeDetails(userDetails);
      uploaded
        ? dispatch(setUser({
            status: true,
            id: uid,
          }))
         : console.log("Error uploading user Data");
       
       console.log("Saved Details");
    } catch (error) {
      console.log("error it is", error);
     }
    finally {    
      storeId({
        status: true,
         id: uid,
      })
     }
  }
  const updateDetails = (values) => {
    const { ValidFirstName, ValidLastName, ValidEmail, Bio, UniversityName } = values; 
    console.log("hereee")
      firebase.auth().currentUser.updateProfile({
         displayName: `${ValidFirstName + " " + ValidLastName}`,
         photoURL: image,
         email : ValidEmail
      });
    setIsHidden("4");
    console.log("Done");
  }

  const addImage = async () => {
     const filePath = `UserDetails/profilePic/${uid}/JobSeeker`;
     const set = setUserImage;
     uploadImage(filePath, dispatch, set, progress, setProgress);
  };
  return (
    <ScrollView style={{ backgroundColor: Colors.primary }}>
      <View style={styles.FormContainer}>
        <Form
          initialValues={Details}
          validationSchema={validationSchemaUserDetails}
           onSubmit={(values) => {
            isHidden === "1"
              ? setIsHidden("2")
              : isHidden === "2"
              ? setIsHidden("3")
              : isHidden === "3"
              ? updateDetails(values)
              : isHidden === "4"
              ? handleUserinfo(values)
              : null;
          }}
        >
          {isHidden === "1" ? (
            <FirstPage addImage={addImage} image={image} progress={progress} />
          ) : isHidden === "2" ? (
            <SecondPage/>
          ) : isHidden === "3" ? (
            <ThirdPage/>
          ) : isHidden === "4" ? (
            <FourthPage />
          ) : (
            <FormButton title={"Submit"} color={Colors.secondary} />
          )}
        </Form>
      </View>
    </ScrollView>
  );
};

export default JobSeekerDetails

const styles = StyleSheet.create({
  FormContainer:{
          paddingTop: "7%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
        }
})
