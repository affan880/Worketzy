import { StyleSheet, Text, View, ScrollView } from "react-native";
import React,{useState,useEffect} from 'react'
import Form from '../../Components/forms/form'
import { validationSchemaUserDetails } from '../../Validation/InputValidation';
import {createUserDocument} from "../../Components/firebase/authentication/createUserDocument";
import {uploadImage} from '../../Components/firebase/authentication/uploadImage'
import Colors from '../../utils/Colors';
import * as ImagePicker from "expo-image-picker";
import FirstPage from "../../Components/JobSeekerFormPages/firstPage";
import SecondPage from "../../Components/JobSeekerFormPages/SecondPage";
import ThirdPage from "../../Components/JobSeekerFormPages/thirdpage"
import FourthPage from "../../Components/JobSeekerFormPages/fourthPage"
import FormButton from "../../Components/forms/formButton";;
import { useSelector, useDispatch } from "react-redux"
import { setuserDetails, setUser, setUserImage, setDetails } from "../../redux/reducers/userDetails";
import { app } from "../../Components/firebase/firebase";
import firebase from "firebase/compat";
import AsyncStorage from "@react-native-async-storage/async-storage";
const JobSeekerDetails = () => {
  const uid = useSelector((state) => state.userDetails.user.id);
  const user = useSelector((state) => state.userDetails.user.status);
  const details = useSelector((state) => state.userDetails.details);
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState("1");
    useEffect(() => {
      loadUser();
      loadUserDetails();
    }, []);
  const storeId = async (val) => {
    try {
      await AsyncStorage.setItem("@userId", JSON.stringify(val));
      console.log("storeId successfully");
    } catch (e) {
      console.log("Error saving data storeId");
    }
  };
  const storeDetails = async (userDetails) => {
    try {
      await AsyncStorage.setItem("@userDetails", JSON.stringify(userDetails)).then(() => {
        console.log("Details storeDetails saved");
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
     console.log("values", values);
     try {
       const userDetails = {
         ValidFirstName: ValidFirstName,
         ValidLastName: ValidLastName,
         ValidEmail: ValidEmail,
         Bio: Bio,
         UniversityName: UniversityName,
         userUniqueId: "",
         userImage:
           "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8",
         userPhone: details.userPhone,
         userIsstudent: details.userIsstudent,
         userRecentEmployer: details.userRecentEmployer,
         userEmployeeStatus: details.userEmployeeStatus,
         userEmploymentType: details.userEmploymentType,
         userPreferedCity: details.userPreferedCity,
         userJobType: details.userJobType,
         userJobCategory: details.userJobCategory,
         userNextJobExpectations: details.userNextJobExpectations,
       };
       console.log(userDetails)
       const uploaded = createUserDocument(user, uid, userDetails);
       dispatch(setDetails(userDetails));
       console.log(uploaded);
        storeDetails(userDetails);
      // uploadImage(image, setImageUpload, setLoading,user, uid);
      uploaded
        ? dispatch(setUser({
            status: true,
            id: uid,
          }))
        : console.log("Data not uploaded");
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
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!_image.cancelled) {
      dispatch(setUserImage(_image.uri));
    }
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
              ? setIsHidden("4")
              : isHidden === "4"
              ? handleUserinfo(values)
              : null;
          }}
        >
          {isHidden === "1" ? (
            <FirstPage addImage={addImage}/>
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
