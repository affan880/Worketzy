import { StyleSheet, Text, View, Dimensions , ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import ProfilePic from '../../Profile/profilePic';
import SafeView from '../../../Components/CustomComponents/safeView';
import Colors from '../../../utils/Colors';
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const JobApplicantProfile = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const userId = item.userUniqueId;
  const recruiterId = useSelector(
    (state) => state.currentUser.JobRecruitersInformation.userUniqueId
  );
    const { client } = useChatContext();
  console.log(recruiterId);
    const CreateChannel = async () => {
      const channel = client.channel("messaging", {
        members: [userId, recruiterId],
      });
      await channel.watch();
      navigation.navigate("ChattingScreen", { channel });
    };
  return (
    <SafeView
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        width: screenWidth,
        height: screenHeight,
      }}
    >
      <ScrollView scrollEnabled={true}>
        <View style={styles.Container}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: Colors.white,
              marginTop: 80,
              marginLeft: 20,
              marginBottom: 50,
              letterSpacing: 1,
            }}
          >
            Profile
          </Text>
          <View style={styles.ProfileContainer}>
            <View style={{ flexDirection: "row" }}>
              <ProfilePic user={item} />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.ValidLastName}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    letterSpacing: 0.5,
                    color: Colors.white,
                    paddingTop: 0,
                  }}
                >
                  {item.userJobExpectedRole[1]}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    paddingTop: 8,
                  }}
                >
                  <Ionicons
                    name="ios-location-outline"
                    size={20}
                    color="white"
                  />
                  {item.ValidFirstName}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: Colors.white,
              marginLeft: 20,
              letterSpacing: 1,
              marginBottom: 0,
            }}
          >
            About Me
          </Text>
          <View
            style={{
              width: "95%",
              height: "20%",
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              alignSelf: "flex-start",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontWeight: "300",
                  color: Colors.white,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                necessitatibus possimus sapiente ipsum hic, iure consequuntur
                accusantium maxime aut neque harum nihil asperiores earum
                laudantium sed at sit cupiditate voluptate itaque. Qui officia
                veniam sapiente amet alias adipisci. Tempora, adipisci autem
                praesentium placeat rerum officiis mollitia molestias explicabo
                aspernatur aut consequatur.
              </Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={CreateChannel}
        style={{
          backgroundColor: Colors.white,
          width: "90%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
          alignSelf: "center",
          borderRadius: 20,
        }}
      >
        <Text style={styles.button}>Chat</Text>
      </TouchableOpacity>
    </SafeView>
  );
};
export default JobApplicantProfile

const styles = StyleSheet.create({
  Container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: Colors.primary,
  },
  ProfileContainer: {
    width: screenWidth,
    height: screenHeight * 0.25,
    marginLeft: 20,
  },
  textContainer: {
    textAlign: "center",
    marginLeft: 20,
    marginTop: 10,
    width: screenWidth * 0.5,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.white,
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
  }
});