import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../utils/Colors';
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const ActivitiesButtons = () => {
    return (
      <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.ButtonText}>Edit Profile</Text>
          <AntDesign name="right" size={15} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.ButtonText}>Jobs Saved</Text>
          <AntDesign name="right" size={15} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.ButtonText}>Jobs Applied</Text>
          <AntDesign name="right" size={15} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.ButtonText}>Jobs Chats</Text>
          <AntDesign name="right" size={15} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.ButtonText}>Contact Us</Text>
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
  },
  ButtonText: {
    color: Colors.primary,
    letterSpacing: 1,
    fontWeight: "600",
    fontSize: 13,
  },
    buttonContainer: {
        backgroundColor: Colors.secondary,
        width: screenWidth * 0.9,
        alignSelf: "center",
        borderRadius: 14,
        marginVertical: 15,
  }
});