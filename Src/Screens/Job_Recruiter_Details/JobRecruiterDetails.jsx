import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import Form from "../../Components/forms/form";
import { validationSchemaUserDetails } from "../../Validation/InputValidation";
import { createRecruiterDocument } from "../../Components/firebase/authentication/recruiterAuthentication/createRecruiterDocoment";
import Colors from "../../utils/Colors";
import RecruiterDetails from '../../Components/JobRecruiterFormPage/recruitersDetails'
import FormButton from "../../Components/forms/formButton";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompanyRegisteration from "../../Components/JobRecruiterFormPage/CompanyRegisteration";
import { setRecruiterDetails, setRecruiterStatus } from "../../redux/reducers/recruiterDetails";
import firebase from "firebase/compat";
import RecruiterVerification from "../../Components/JobRecruiterFormPage/recruiterVerification";

const JobRecruiterDetails = () => {
  const uid = useSelector((state) => state.recruiterDetails.recruiterStatus.id);
  const image = useSelector((state) => state.currentUser.userImage);
  const CompaniesLogo = useSelector((state) => state.currentUser.companyLogo);
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState("1");
  useEffect(() => {
    loadUser();
    loadUserDetails();
  }, []);
  const storeId = async (val) => {
    try {
      await AsyncStorage.setItem("@recruiterId", JSON.stringify(val));
    } catch (e) {
      console.log("Error saving data storeId");
    }
  };
  const storeDetails = async (recruiterDetails) => {
    try {
      await AsyncStorage.setItem(
        "@recruiterDetails",
        JSON.stringify(recruiterDetails)
      )
    } catch (e) {
      console.log("Error saving data storeDetails");
    }
  };
  const loadUser = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("@recruiterId"));
      users !== null ? dispatch(setRecruiterStatus(users)) : null;
    } catch (err) {
      console.log("load" + err);
    }
  };
  const loadUserDetails = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("@recruiterDetails"));
      users !== null ? dispatch(setRecruiterDetails(users)) : null;
    } catch (err) {
      console.log("load" + err);
    }
  };

  const recruiterAndCompanyDetails = {
    ValidFirstName: "",
    ValidLastName: "",
    ValidEmail: "",
    CompanyName: "",
    RecruitersDesignation: "",
    CompaniesLegalName: "",
    CompanyShortName: "",
    Industry: "",
    CompanyLocation: "",
    CompanyWebsite: "",
  };

  function handleUserinfo(values) {
    const {
      ValidFirstName,
      ValidLastName,
      ValidEmail,
      CompanyName,
      RecruitersDesignation,
      CompaniesLegalName,
      CompanyShortName,
      Industry,
      CompanyLocation,
      CompanyWebsite,
    } = values;
    try {
      const recruiterDetails = {
        FirstName: ValidFirstName,
        LastName: ValidLastName,
        Email: ValidEmail,
        CompanyName: CompanyName,
        Designation: RecruitersDesignation,
        userUniqueId: uid,
        userImage: image,
        Verified: false,
      };
      const companyDetails = {
        CompaniesLegalName: CompaniesLegalName,
        CompanyShortName: CompanyShortName,
        Industry: Industry,
        CompanyLocation: CompanyLocation,
        CompanyWebsite: CompanyWebsite,
        uniqueId: uid,
        Logo: CompaniesLogo,
        Verified: false,
      };
      const uploaded = createRecruiterDocument(
        uid,
        recruiterDetails,
        companyDetails
      );
          firebase.auth().currentUser.updateProfile({
            displayName: `${CompaniesLegalName}`,
            photoURL: CompaniesLogo,
            email: ValidEmail,
          });
      dispatch(setRecruiterDetails(recruiterDetails));
      storeDetails(recruiterDetails);
      uploaded
        ? dispatch(
            setRecruiterStatus({
              status: true,
              id: uid,
            })
          )
        : console.log("Data not uploaded");
          firebase.auth().currentUser.updateProfile({
            displayName: `${CompaniesLegalName}`,
            photoURL: CompaniesLogo,
          });
    } catch (error) {
      console.log("error it is", error);
    } finally {
      storeId({
        status: true,
        id: uid,
      });
    }
  }
  return (
    <ScrollView style={{ backgroundColor: Colors.primary }}>
      <StatusBar translucent backgroundColor={Colors.primary} />
      <View style={styles.FormContainer}>
        <Form
          initialValues={recruiterAndCompanyDetails}
          validationSchema={validationSchemaUserDetails}
          onSubmit={(values) => {
            isHidden === "1"
              ? setIsHidden("2")
              : isHidden === "2"
              ? setIsHidden("3")
              : isHidden === "3"
              ? handleUserinfo(values)
              : null;
          }}
        >
          {isHidden === "1" ? (
            <RecruiterDetails />
          ) : isHidden === "2" ? (
            <CompanyRegisteration />
          ) : isHidden === "3" ? (
            <RecruiterVerification />
          ) : (
            <FormButton title={"Submit"} color={Colors.secondary} />
          )}
        </Form>
      </View>
    </ScrollView>
  );
};

export default JobRecruiterDetails;

const styles = StyleSheet.create({
  FormContainer: {
    paddingTop: "0%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
});
