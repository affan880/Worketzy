import { StyleSheet, Text, View, Animated, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";
import { useSelector } from "react-redux";
import { UpdateViewCount } from "../../Functions/updateData"
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PersonalisedJobList = ({ route }) => {
  const navigation = useNavigation();
  const { joblist } = route.params;
    const userId = useSelector((state) => state.currentUser.JobSeekersInformation.userUniqueId);
  return (
    <Animated.FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      snapToAlignment="start"
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      data={joblist}
      renderItem={({ item, index }) => {
        return (
          <View key={Math.random()}>
            <Animated.View
              style={{
                marginVertical: 20,
                marginHorizontal: 20,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 20,
                borderRadius: 18,
                backgroundColor: "#fff",
                height: screenHeight * 0.22,
                width: screenWidth - 30,
                backgroundColor: Colors.secondary,
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: item.jobInfo.image }}
                style={styles.posterImage}
              />
              <View style={styles.textBox}>
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: "700",
                    paddingBottom: 10,
                  }}
                >
                  {item.jobTitle}
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.primary,
                    width: "80%",
                    height: "30%",
                    borderRadius: 18,
                    marginTop: 20,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    const data = {
                      numberofViews: item.jobInfo.numberofViews + 1,
                    };
                    const url =
                      "https://worketzy.herokuapp.com/api/jobs/edit/details/" +
                      item.recruiterId +
                      "/" +
                      item.jobsUniqueId;
                    UpdateViewCount(data, url);
                    console.log(url);
                    navigation.navigate("JobList", { item, userId });
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      const data = {
                        numberofViews: item.jobInfo.numberofViews + 1,
                      };
                      const url =
                        "https://worketzy.herokuapp.com/api/jobs/edit/details/" +
                        item.recruiterId +
                        "/" +
                        item.jobsUniqueId;
                      UpdateViewCount(data, url);
                      navigation.navigate("JobList", { item, userId });
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "700",
                        letterSpacing: 0.8,
                        color: Colors.white,
                      }}
                    >
                      Discover
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        );
      }}
    ></Animated.FlatList>
  );
}

export default PersonalisedJobList

const styles = StyleSheet.create({
  posterImage: {
    width: "40%",
    height: "80%",
    resizeMode: "cover",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    margin: 0,
    alignSelf: "flex-end",
  },
  textBox: {
    width: "60%",
    height: "80%",
    alignSelf: "flex-end",
    paddingLeft: 20,
  },
});