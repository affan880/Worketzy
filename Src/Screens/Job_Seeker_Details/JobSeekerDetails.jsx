import { StyleSheet, Text, View, ScrollView } from "react-native";
import React,{useState} from 'react'
import Form from '../../Components/forms/form'
import { validationSchemaUserDetails } from '../../Validation/InputValidation';
import { createUserDocument, uploadImage } from '../../Components/firebase/firebase';
import Colors from '../../utils/Colors';
import * as ImagePicker from "expo-image-picker";
import FirstPage from "../../Components/JobSeekerFormPages/firstPage";
import SecondPage from "../../Components/JobSeekerFormPages/SecondPage";
import ThirdPage from "../../Components/JobSeekerFormPages/thirdpage"
import FourthPage from "../../Components/JobSeekerFormPages/fourthPage"
import FormButton from "../../Components/forms/formButton";
const JobSeekerDetails = () => {
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/worketzy-0.appspot.com/o/UserIcons%2Fuser.png?alt=media&token=ef8142c6-bf5a-44e1-927e-cd6903c4dac8"
  );
  const [imageUpload, setImageUpload] = useState(false);
  const [student, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(null);
  const [isHidden, setIsHidden] = useState("1");
  const [JobTypeOption, setJobTypeOption] = useState(null);
  const Details = {
    ValidFirstName: "",
    ValidLastName: "",
    ValidEmail: "",
    Bio: "",
    UniversityName: "",
  };
    
  async function handleUserinfo(values) {
    const { ValidFirstName, ValidLastName, ValidEmail, Bio, UniversityName } = values;
    try {
      await createUserDocument(
        ValidFirstName,
        ValidLastName,
        ValidEmail,
        Bio,
        student,
        UniversityName,
        checked
      );
      uploadImage(image, setImageUpload, setLoading);
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
  return (
    <ScrollView style={{ backgroundColor: Colors.primary }}>
      <View style={styles.FormContainer}>
        <Form
          initialValues={Details}
          validationSchema={validationSchemaUserDetails}
          // onSubmit={async (values)=> {isHidden==="1"? setIsHidden("2") : isHidden==="3" ? setIsHidden("4") : await handleUserinfo(values) }}
          onSubmit={async (values)=> {isHidden==="1"? setIsHidden("2") : isHidden==="2"? setIsHidden("3") : isHidden === "3" ? setIsHidden("4") : isHidden === "4"? await handleUserinfo(values) : null }}
        >
          {isHidden === "1" ? 
            <FirstPage
              addImage={addImage}
              image={image}
            /> : isHidden==="2" ?
              <SecondPage student={student} setIsStudent={setIsStudent} checked={checked} setChecked={setChecked} />
              : isHidden === "3" ?
              < ThirdPage setJobTypeOption = {setJobTypeOption} /> : isHidden === "4"? <FourthPage/> :
          <FormButton title={"Submit"} color={Colors.secondary} /> 
          }
        </Form>
      </View>
    </ScrollView>
  );
};

export default JobSeekerDetails;

const styles = StyleSheet.create({
  FormContainer:{
          paddingTop: "7%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
        }
})

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