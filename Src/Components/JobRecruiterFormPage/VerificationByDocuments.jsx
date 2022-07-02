import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FormButton from '../forms/formButton';
import SafeView from '../CustomComponents/safeView'
import uploadDocumentFromDevice from "../firebase/authentication/uploadDocumentFromDevice";
import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native';
import { setDocuments } from '../../redux/reducers/companyDetails';
import { useDispatch } from 'react-redux';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const VerificationByDocuments = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(null);
  const dispatch = useDispatch();
  const addImage = async () => {
  uploadDocumentFromDevice(dispatch, setDocuments, setProgress);
};
  return (
    <SafeView style={styles.container}>
        <View style={styles.HeaderConatiner}>
          <Text style={styles.headerText}>Verify Your Company</Text>
          <Text style={styles.subTitle}>
            upload one of the documents below to verify the authenticity of your
            company
          </Text>
        </View>
        <View style={styles.DocumentsList}>
          <FlatList
            data={[
              { key: "- Company Bank Statement" },
              { key: "- Company ID Card" },
              { key: "- Offer Letter" },
              { key: "- Business License" },
              { key: "- PayStub" },
              { key: "- Company Utility Bill" },
              { key: "- Commercial Building Document" },
            ]}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.key}</Text>
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            addImage();
          }}
        >
          {progress === null ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.upload}>Upload</Text>
              <Ionicons
                name="md-cloud-upload-sharp"
                size={16}
                color={Colors.secondary}
                style={{
                  paddingLeft: 8,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            </View>
          ) : progress === "100.00" ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.upload}>Done</Text>
              <Ionicons
                name="md-cloud-upload-sharp"
                size={16}
                color={Colors.secondary}
                style={{
                  paddingLeft: 8,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            </View>
          ) : (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.upload}>{progress}</Text>
              <Ionicons
                name="md-cloud-upload-sharp"
                size={16}
                color={Colors.secondary}
                style={{
                  paddingLeft: 8,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            </View>
          )}
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
            backgroundColor: Colors.secondary,
            height: height * 0.06,
            justifyContent: "center",
            borderRadius: 15,
            borderWidth: 1,
          }}
          
          onPress={() => { 
            navigation.navigate("Details");
          }}
          >
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
                color: Colors.ghostWhite,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
    </SafeView>
  );
    }
    
    export default VerificationByDocuments
    
const styles = StyleSheet.create({
    container: {
    backgroundColor: Colors.primary,
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    padding:15,
    fontSize:16,
    textAlign: "center",
  },
  HeaderConatiner: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05,
  },
  DocumentsList: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical:20
  },
  item: {
    fontSize: 16,
    padding:8
  },
  Button: {
    width: "80%",
    height: height * 0.2,
    backgroundColor: Colors.secondaryShade,
    borderColor: Colors.white,
    borderWidth: 3,
    borderRadius: 10,
    alignSelf: "center",
    borderStyle: 'dashed',
    paddingHorizontal: 30,
    marginVertical: height * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
  upload: {
    color:Colors.secondary,
    fontSize: 16,
    fontWeight:"300"
  }

})