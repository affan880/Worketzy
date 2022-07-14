import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../utils/Colors'
import UserProfile from "../ProfileData/UserProfile";
import FormField from '../forms/formField';
import FormButton from '../forms/formButton';
import { Feather } from "@expo/vector-icons";
import { setUser, setUserImage } from '../../redux/reducers/currentUser';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import uploadImage from "../firebase/authentication/UploadImage";
const CompanyDetails = () => {
  const CurrentUserID = useSelector((state) => state.currentUser.user);
  const image = useSelector((state) => state.currentUser.userImage);
  const [progress, setProgress] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    getMyObject();
  }, []);
  const getMyObject = async () => {
      const user = await AsyncStorage.getItem("@CurrentUser");
    dispatch(setUser(JSON.parse(user)));
    console.log("Done")
  };
  const addImage = () => {
    const filePath = `CompanyDetails/${CurrentUserID.uid}/Recruiter`;
    const set = setUserImage;
    uploadImage(filePath,dispatch, set, progress, setProgress);
  };
  return (
    <View style={styles.Container}>
      <StatusBar translucent backgroundColor={Colors.primary} />
      <Text style={styles.headerText}>My Recruiter Profile</Text>
      <UserProfile
        addImage={addImage}
        width={170}
        height={170}
        name="Recruiter"
        image={image}
        progress={progress}
      />
      <FormField
        name="ValidFirstName"
        Name="First Name"
        leftIcon="rename-box"
        placeholder="Enter your First Name"
        width={"95%"}
      />
      <FormField
        name="ValidLastName"
        Name="Last Name"
        leftIcon="rename-box"
        placeholder="Enter your Last Name"
        width={"95%"}
      />
      <FormField
        name="CompanyName"
        Name="My Company"
        leftIcon="rename-box"
        placeholder="e.g. Google Limited Liability Company"
        width={"95%"}
      />
      <FormField
        name="RecruitersDesignation"
        Name="My Job Position"
        leftIcon="rename-box"
        placeholder="e.g. CEO"
        width={"95%"}
      />
      <FormField
        name="ValidEmail"
        Name="My Email"
        leftIcon="rename-box"
        placeholder="e.g. affan@worketzy.org"
        width={"95%"}
      />
      <View>
        <FormButton
          title={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginRight: 10,
                  color: Colors.ghostWhite,
                }}
              >
                Next
              </Text>
              <Feather
                name="chevron-right"
                size={24}
                color={Colors.ghostWhite}
              />
            </View>
          }
        />
      </View>
    </View>
  );
}

export default CompanyDetails

const styles = StyleSheet.create({
  Container: {
    paddingTop: "5%",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    alignItems:"center"
  },
    headerText: {
    marginBottom:20,
    fontSize: 28,
    padding: 20,
    textAlign: "center",
    fontWeight: "800",
    color: Colors.secondary,
    justifyContent: "space-evenly",
  },
});