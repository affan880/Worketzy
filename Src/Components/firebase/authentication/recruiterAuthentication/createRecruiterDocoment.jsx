import { StyleSheet, Text, View } from "react-native";
import React from "react";
import firebase from "firebase/compat";
export const createRecruiterDocument = async (
  uid,
  recruiterDetails,
  companyDetails
) => {
  const userRef = firebase.firestore().collection("Recruiters").doc(uid);
  const compRef = firebase.firestore().collection("Companies").doc(uid);
  const snapshot = await userRef.get();
  const comsnapshot = await compRef.get();
  if (!snapshot.exists) {
    userRef
      .set(recruiterDetails)
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
        return false;
      });
    if (!comsnapshot.exists) {
      compRef
        .set(companyDetails)
        .then(function () {
          console.log("Value successfully written! companyDetails");
        })
        .catch(function (error) {
          console.error("Error writing Value companyDetails: ", error);
          return false;
        });
      return true;
    }
  }
};

export default createRecruiterDocument;
