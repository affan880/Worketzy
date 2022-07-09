import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../utils/Colors';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const PostAJobBtn = () => {
    const navigation = useNavigation(); 
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          width: width,
          height: height,
        }}
      >
        <View style={styles.Card}>
          <Text style={styles.headerText}>No Job Openings are Posted</Text>
          <TouchableOpacity
            style={styles.Navigationbutton}
            onPress={() => {
              navigation.navigate("CreateJob");
            }}
          >
            <Text style={styles.navigationBtnText}>Post a Jobs</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PostAJobBtn

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
    top: (width / 2) * 1.5,
  },
  navigationBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
});