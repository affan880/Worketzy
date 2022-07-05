import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormField from '../forms/formField'
import UserProfile from '../ProfileData/UserProfile'
import uploadImage from '../firebase/authentication/UploadImage'
import FormButton from "../forms/formButton";
import Colors from '../../utils/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { setCompanyLogo } from '../../redux/reducers/currentUser';
const CompanyRegisteration = () => {
  const CurrentUserID = useSelector((state) => state.currentUser.user);
  const image = useSelector((state) => state.currentUser.companyLogo);
    const dispatch = useDispatch();
   const addImage = () => {
     const filePath = `CompanyDetails/${CurrentUserID.uid}/CompanyLogo`;
     const set = setCompanyLogo;
     uploadImage(filePath, dispatch, set);
   };
  return (
    <View style={{ marginTop: 40 }}>
      <Text style={styles.headerText}>Register your company</Text>
      <UserProfile addImage={addImage} width={150} height={150} image = {image} />
      <FormField
        name="CompaniesLegalName"
        Name="Company Legal Name"
        leftIcon="rename-box"
        placeholder="Worketzy -------"
        width={"95%"}
      />
      <FormField
        name="CompanyShortName"
        Name="Company Short Name"
        leftIcon="rename-box"
        placeholder="Worketzy"
        width={"95%"}
      />
      <FormField
        name="Industry"
        Name="Industry"
        leftIcon="rename-box"
        placeholder="e.g. insurance"
        width={"95%"}
      />
      <FormField
        name="CompanyLocation"
        Name="Company Location"
        leftIcon="rename-box"
        placeholder="545656 hehehehe, hehehcity, Hehe"
        width={"95%"}
      />
      <FormField
        name="CompanyWebsite"
        Name="CompanyWebsite"
        leftIcon="rename-box"
        placeholder="https://worketzy.org"
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
                Register
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

export default CompanyRegisteration

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 20,
    fontSize: 28,
    paddingBottom:20,
    textAlign:'left',
    fontWeight: "800",
    color: Colors.secondary,
    justifyContent: "space-evenly",
  },
});