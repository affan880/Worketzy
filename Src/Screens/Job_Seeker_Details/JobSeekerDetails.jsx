import { StyleSheet, Text, View, ScrollView } from "react-native";
import React,{useState} from 'react'
import Form from '../../Components/forms/form'
import FormButton from "../../Components/forms/formButton";
import FormField from "../../Components/forms/formField";
import { validationSchemaUserDetails } from '../../Validation/InputValidation';
import { createUserDocument, auth, uploadImage } from '../../Components/firebase/firebase';
import UserProfile from '../../Components/ProfileData/UserProfile'
import Colors from '../../utils/Colors';
import * as ImagePicker from "expo-image-picker";
import Spinner from "../../Components/CustomComponents/spinner";
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

const JobSeekerDetails = () => {
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8"
  );
  const [imageUpload, setImageUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false)
  const navigation = useNavigation();


  async function handleUserinfo(values) {
    const { ValidFirstName, ValidLastName, ValidEmail } = values;
    try {
      await createUserDocument(ValidFirstName, ValidLastName, ValidEmail);
      uploadImage(image, ValidLastName, setImageUpload, setLoading);
    } catch (error) {
      console.log('error it is',error)
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
        setImage(_image.uri);
      }
  };
  const nextPage = () => {
    setIsHidden('true')
  }
  return (
    <ScrollView style={{ backgroundColor: Colors.primary }}>
      <View
        style={{
          paddingTop: "7%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
        }}
      >
        <Form
          initialValues={{
            ValidFirstName: "",
            ValidLastName: "",
            ValidEmail: "",
          }}
          validationSchema={validationSchemaUserDetails}
          onSubmit={async (values) =>
            !isHidden ? nextPage() : handleUserinfo(values)
          }
        >
          {!isHidden ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.primary,
              }}
            >
              <UserProfile addImage={addImage} image={image} />
              <FormField
                name="ValidFirstName"
                leftIcon="rename-box"
                placeholder="Enter your First Name"
                width={"80%"}
              />
              <FormField
                name="ValidLastName"
                leftIcon="rename-box"
                placeholder="Enter your Last Name"
                width={"80%"}
              />
              <FormField
                name="ValidEmail"
                leftIcon="rename-box"
                placeholder="Enter your Professional Emailcww"
                width={"80%"}
              />
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
                        color: "black",
                        marginRight: 10,
                        color:Colors.ghostWhite
                      }}
                    >
                      Next
                    </Text>
                    <Feather name="chevron-right" size={24} color={Colors.ghostWhite} />
                  </View>
                }
                width="65%"
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.primary,
              }}
            >
              <FormField
                name="ValidEmail"
                leftIcon="phone"
                placeholder="Enter your Last Name"
                autoFocus={true}
                width={"80%"}
              />
              <FormButton title="Submit" width="85%" />
            </View>
          )}
        </Form>
      </View>
    </ScrollView>
  );
};

export default JobSeekerDetails;

const styles = StyleSheet.create({})

//spinner when files are uploading to firebase storage

  {
    /*
        {!loading ?
          <FormButton title={"SUBMIT"} />
        : (
          <Spinner/>
          )}
         */
  }