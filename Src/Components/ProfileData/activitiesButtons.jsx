import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const ActivitiesButtons = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.buttons} onPress={() => {
          navigation.navigate("Saved")
        }} >
          <Text style={styles.ButtonText}> Saved Jobs</Text>
          <AntDesign name="right" size={15} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}
          onPress={() => {
          navigation.navigate("Chats")
        }}  >
          <Text style={styles.ButtonText}>Applied Jobs</Text>
          <AntDesign name="right" size={15} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    );
}

export default ActivitiesButtons

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.9,
    height: screenHeight * 0.07,
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
  },
  ButtonText: {
    color: Colors.primary,
    letterSpacing: 1,
    fontWeight: "600",
    fontSize: 13,
  },
    buttonContainer: {
        width: screenWidth * 0.9,
        alignSelf: "center",
  }
});