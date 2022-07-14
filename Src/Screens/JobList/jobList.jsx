import { StyleSheet, Text, View, Dimensions, FlatList, Animated, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import SafeView from '../../Components/CustomComponents/safeView';
import Colors from '../../utils/Colors';
import { MaterialIcons, AntDesign, Foundation } from "@expo/vector-icons";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useChatContext } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';
import { UpdateAplications } from '../../Functions/updateData';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const JobList = ({ route }) => {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const [update, setUpdated] = useState(false);
  const Data = route.params;
  const JobsData = Data.item;
  const userId = Data.userId;
  const recruiterId = JobsData.recruiterId;
  console.log("userId", userId);
  console.log("recruiterId", JobsData.recruiterId);
      const NumberOfApplications = () => {
      let peopleApplied = JobsData.jobInfo.peopleApplied;
      peopleApplied.push({
        userId: userId,
      });
        const updatedList = [
          ...peopleApplied,
        ];
      const url =
        "https://worketzy.herokuapp.com/api/jobs/edit/details/" +
        JobsData.recruiterId +
        "/" +
        JobsData.jobsUniqueId;
      const data = {
        peopleApplied: updatedList,
      };
      UpdateAplications(url, data);
        setUpdated(true);
      peopleApplied = JobsData.jobInfo.peopleApplied;
    };
  const CreateChannel = async (JobsData) => {
    const channel = client.channel("messaging", {
      members: [recruiterId, userId],
    });
    await channel.watch();
    navigation.navigate("ChattingScreen", { channel });
    !update ? NumberOfApplications() : console.log("Already updated");
  }
  const Apply = (JobsData) => {
    CreateChannel(JobsData);
    }
  return (
    <ScrollView scrollEnabled={true}>
      <View style={{ marginBottom: height * 0.15 }}>
        <Image
          source={{
            uri: JobsData.jobInfo.image,
          }}
          style={{
            width: width * 0.9,
            height: 220,
            marginTop: 20,
            borderRadius: 15,
            alignItems: "center",
            alignSelf: "center",
          }}
        />
        <Text style={styles.jobTitle}>{JobsData.jobInfo.jobTitle}</Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 10,
            padding: 10,
          }}
        >
          <Text>Number of openings :{JobsData.jobInfo.numberofopenings}</Text>
          <Text>
            Number of People Applied :{JobsData.jobInfo.peopleApplied.length}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: Colors.secondary,
            paddingLeft: 10,
            fontWeight: "500",
          }}
        >
          Job Description :
        </Text>
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
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={styles.Comments}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                letterSpacing: 1.5,
                fontWeight: "bold",
              }}
            >
              <Foundation name="comments" size={30} color={Colors.white} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ApplyBtn}
            onPress={() => {
              Apply(JobsData);
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                letterSpacing: 1.5,
                fontWeight: "bold",
              }}
            >
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
        }
        
        export default JobList
        
        const styles = StyleSheet.create({
          Card: {
            borderRadius: 15,
            backgroundColor: Colors.white,
            alignItems: "center",
          },
          jobTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: Colors.secondary,
            marginTop: 20,
            alignSelf: "center",
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
            paddingLeft: 10,
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
            width: "65%",
            height: "25%",
            backgroundColor: Colors.secondary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.primary,
            borderWidth: 1,
            alignSelf: "center",
            margin:10
          },
          Comments: {
            width: "20%",
            height: "25%",
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.secondary,
            borderWidth: 1,
            alignSelf: "center",
            margin:10
          }
        });