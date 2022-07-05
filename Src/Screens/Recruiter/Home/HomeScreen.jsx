import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import SafeView from '../../../Components/CustomComponents/safeView';
import React from 'react'
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const HomeScreen = () => {
  const navigation = useNavigation(); 
  return (
    <SafeView
      style={{ backgroundColor: Colors.primary, width: "100%", height: "100%", }}
    >
      <View style={{justifyContent:"center", alignItems:"center", alignContent:"center", width:width, height:height}} >
      <View style={styles.Card} >
      <Text style={styles.headerText} >No Job Openings are Created</Text>
          <TouchableOpacity style={styles.Navigationbutton} onPress={() => {
            navigation.navigate('CreateJob');
      }} >
      <Text style={styles.navigationBtnText} >Create Jobs</Text>
      </TouchableOpacity>
      </View>
      </View>
    </SafeView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  Card: {
    width: width,
    height: height,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 40,

  },
  Navigationbutton: {
    width: "50%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 15,
    top: width/2 * 1.5,
  },
  navigationBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  }
})