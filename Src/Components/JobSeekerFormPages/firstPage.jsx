import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors';
import UserProfile from '../ProfileData/UserProfile';
import FormField from '../forms/formField';
import FormButton from '../forms/formButton';
import { Feather } from "@expo/vector-icons";

const FirstPage = ({ addImage, image }) => {
  return (
    <View style={styles.FormContainer}>
      <UserProfile addImage={addImage} width={150} height={150} image={image} />
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
        name="ValidEmail"
        Name="Email"
        leftIcon="rename-box"
        placeholder="Enter your Professional Email"
        width={"95%"}
      />
      <FormField
        name="Bio"
        Name="Bio"
        multiline
        numberOfLines={4}
        editable
        leftIcon="rename-box"
        placeholder="Bio (Max 255)"
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

export default FirstPage

const styles = StyleSheet.create({
  FormContainer: {
    paddingTop: "5%",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
});