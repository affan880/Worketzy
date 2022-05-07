import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import Form from '../../Components/forms/form'
import FormButton from "../../Components/forms/formButton";
import FormField from "../../Components/forms/formField";
import { validationSchemaUserDetails } from '../../Validation/InputValidation';
import { createUserDocument, auth, uploadImage } from '../../Components/firebase/firebase';
import UserProfile from '../../Components/ProfileData/UserProfile'
import Colors from '../../utils/Colors';
import * as ImagePicker from "expo-image-picker";


const JobSeekerDetails = () => {
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  async function handleUserinfo(values) {
    const { ValidFirstName, ValidLastName } = values;

    try {
      await createUserDocument(ValidFirstName, ValidLastName);
     uploadImage(image, ValidLastName ,setImageUpload )
    } catch (error) {
      console.log('error it is',error)
    }
  }
    const addImage = async () => {
      let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!_image.cancelled) {
        setImage(_image.uri);
      }
      
    };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
      }}
    >
    <Form
    initialValues={{ ValidFirstName: "", ValidLastName: "" }}
    validationSchema={validationSchemaUserDetails}
    onSubmit={async (values) => await handleUserinfo(values)}
    >
    <UserProfile addImage={addImage} image={image} />
        <FormField
          name="ValidFirstName"
          leftIcon="phone"
          placeholder="Enter your First Name"
          autoFocus={true}
        />
        <FormField
          name="ValidLastName"
          leftIcon="phone"
          placeholder="Enter your Last Name"
          autoFocus={true}
        />
        {imageUpload ?
          <FormButton title={"true"} />
        : (
          <FormButton title={"false"} />
        )}
      </Form>
    </View>
  );
};

export default JobSeekerDetails;

const styles = StyleSheet.create({})