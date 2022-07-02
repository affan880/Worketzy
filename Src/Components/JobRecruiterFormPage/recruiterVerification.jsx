import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import SafeView from '../CustomComponents/safeView'
import Colors from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import FormButton from '../forms/formButton'
import { Feather, Ionicons } from "@expo/vector-icons";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const RecruiterVerification = () => {
    const navigation = useNavigation();
  return (
    <SafeView style={styles.container}>
      <Text style={styles.header}>Recruiter Identity Verification</Text>
      <Text style={styles.subTitle}>Choosen one of the following methods</Text>
      <View style={styles.Card}>
        <Text style={styles.CardTitle}>Verify by Your Work Email</Text>
        <Text style={styles.Desc}>
          If you have work email of your company you can choose this method
        </Text>
        <TouchableOpacity
          style={styles.Buttton}
          onPress={() => {
            navigation.navigate("VerificationBymail");
          }}
        >
          <Text style={styles.buttonText}>Choose</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Card}>
        <Text style={styles.CardTitle}>Verify by Authorized Document</Text>
        <Text style={styles.Desc}></Text>
        <TouchableOpacity
          style={styles.Buttton}
          onPress={() => {
            navigation.navigate("VerificationByDocuments");
          }}
        >
          <Text style={styles.buttonText}>Choose</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop:15 }}>
        <FormButton
          width={width * 0.9}
          title={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
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
    </SafeView>
  );
}

export default RecruiterVerification

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        margin: height * 0.03,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 5,
        color: Colors.secondary
        
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 10,
        color: Colors.ghostWhite,
        textAlign: "center"
    },
    Card: {
        width: "90%",
        height: height * 0.2,
        borderWidth: 1,
        borderColor: Colors.ghostWhite,
        borderRadius: 10,
        marginTop: height * 0.08,
        alignItems: "center",
    },
    CardTitle: {
        fontSize: 18,
        fontWeight: "400",
        color: Colors.secondary,
        padding:10
    },
    Desc: {
        fontSize: 12,
        color: Colors.ghostWhite,
        padding: 5,
        textAlign: "center"
    },
    Buttton: {
        width: "80%",
        height: height * 0.05,
        borderWidth:1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: Colors.secondary
    },
    buttonText: {
        color: Colors.ghostWhite,
    }
})