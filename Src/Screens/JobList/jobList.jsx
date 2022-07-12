import { StyleSheet, Text, View, Dimensions, FlatList, Animated, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import SafeView from '../../Components/CustomComponents/safeView';
import Colors from '../../utils/Colors';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useChatContext } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const JobList = ({ route }) => {
  const navigation = useNavigation();
  const {client} = useChatContext();
  const Data = route.params;
  const JobsData = Data.item;
  const userId = Data.userId;
  const recruiterId = JobsData.recruiterId;
  console.log("userId", userId);
  console.log("recruiterId", JobsData.recruiterId);
  const CreateChannel = async () => {
    const channel = client.channel("messaging", {
      members: [recruiterId, userId],
    });
    await channel.watch();
    navigation.navigate("ChattingScreen", { channel });
  }
  const Apply = () => {
    CreateChannel();
  };
  return (
    <ScrollView>
      <View style={{ height: height, width: width, alignItems: "center" }}>
        <View style={styles.Card}>
          <Image
            source={{
              uri: JobsData.jobInfo.image,
            }}
            style={{
              width: width * 0.9,
              height: 220,
              marginTop: 20,
              borderRadius: 15,
            }}
          />
          <Text style={styles.jobTitle}>{JobsData.jobInfo.jobTitle}</Text>
          <Text style={styles.Description}>
            {JobsData.jobInfo.jobDescription}
          </Text>
          <View style={styles.requiredSkills}>
            <Text style={styles.requiredSkillsText}>Required Skills</Text>
            <Text style={styles.requiredSkillsDisc}>
              {JobsData.jobInfo.requiredSkills}
            </Text>
          </View>
          <View style={styles.requiredSkills}>
            <Text style={styles.requiredSkillsText}>Job Type</Text>
            <Text style={styles.requiredSkillsDisc}>
              {JobsData.jobInfo.jobType}
            </Text>
          </View>
          <View style={styles.requiredSkills}>
            <Text style={styles.requiredSkillsText}>Job Requirements</Text>
            <Text style={styles.requiredSkillsDisc}>
              {JobsData.jobInfo.jobRequirements}
            </Text>
          </View>
          <View style={styles.requiredSkills}>
            <Text style={styles.requiredSkillsText}>Job Location</Text>
            <Text style={styles.requiredSkillsDisc}>
              {JobsData.jobInfo.jobLocation}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ApplyBtn}
            onPress={() => {
              Apply();
            }}
          >
            <Text>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
  
  export default JobList
  
  const styles = StyleSheet.create({
    Container: {
      width: width,
      height: height,
    },
    Card: {
    borderRadius: 15,
    width: width,
    height: height,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    marginTop: 20,
  },
  Description: {
    fontSize: 16,
    color: Colors.primary,
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "300",
  },
  requiredSkills: {
    textAlign: "left",
    paddingTop: 10,
    fontSize: 14,
  },
  requiredSkillsText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  requiredSkillsDisc: {
    fontSize: 16,
    color: Colors.primary,
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "300",
  },
  ApplyBtn: {
    width: "90%",
    height: "7%",
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,

  }
});