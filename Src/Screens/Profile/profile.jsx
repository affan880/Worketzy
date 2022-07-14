import { View, Text,Button, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import SafeView from '../../Components/CustomComponents/safeView';
import UserProfile from '../../Components/ProfileData/UserProfile';
import Colors from '../../utils/Colors';
import ActivitiesButtons from '../../Components/ProfileData/activitiesButtons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Profile = () => {
//   const dispatch = useDispatch();
//   const details = useSelector((state) => state.userDetails.details);
  
// const getMyObject = async () => {
//     const jsonValue = await AsyncStorage.getItem("@userDetails");
//     dispatch(setDetails(JSON.parse(jsonValue)));
//     console.log(details)
// };
  return (
    <SafeView>
      <View style={styles.container}>
        <View styles={styles.activityContainer}>
          <View style={styles.UserProfilePic}>
            <UserProfile width={120} height={120} />
          </View>
          <View style={styles.activities}>
            <View style={styles.activitiesContainers}>
              <Text style={styles.activityTitleText}>0</Text>
              <Text style={styles.activityTitle}>Jobs Applied</Text>
            </View>
            <View style={styles.activitiesContainers}>
              <Text style={styles.activityTitleText}>0</Text>
              <Text style={styles.activityTitle}>Jobs Saved</Text>
            </View>
            <View style={styles.activitiesContainers}>
              <Text style={styles.activityTitleText}>0</Text>
              <Text style={styles.activityTitle}>Jobs Chats</Text>
            </View>
          </View>
        </View>
        <View style={styles.userBio}>
          <Text style={styles.userBioText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            dicta facere omnis repellendus! Illum sapiente ipsa explicabo magnam
            deserunt ea deleniti eos aperiam assumenda tempora!
          </Text>
        </View>
        <View style={styles.activitiesButtons}>
        <ActivitiesButtons/> 
        </View>
      </View>
    </SafeView>
  );
}


export default Profile 

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryShade,
    width: "100%",
    height: "100%",
  },
  userBio: {
    paddingHorizontal: screenWidth * 0.05,
  },
  userBioText: {
    fontSize: screenWidth * 0.037,
    fontWeight: "200",
  },
  activityContainer: {
    width: screenWidth,
    flexDirection: "row",
  },
  activities: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  activitiesContainers: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: screenWidth * 0.05,
  },
  activityTitle: {
    fontSize: screenWidth * 0.038,
    fontWeight: "300",
    letterSpacing: 1,
  },
  activityTitleText: {
    fontSize: screenWidth * 0.042,
    fontWeight: "600",
    letterSpacing: 0.67,
  },
  UserProfilePic: {
    marginTop: screenWidth * 0.1,
  },
  activitiesButtons: {
    marginTop: screenWidth * 0.1,
  }
});