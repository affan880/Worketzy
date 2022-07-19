import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import SafeView from "./safeView";
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";
import { useSelector } from "react-redux";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const cardCarousel = ({ name, joblist }) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.currentUser.JobSeekersInformation);
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text
          style={{
            fontWeight: "600",
            color: Colors.white,
            letterSpacing: 1,
          }}
        >
          {name}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PersonalisedJobList", { joblist })
          }
        >
          <Text style={{ fontWeight: "400", color: Colors.white }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        data={joblist}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("JobList", { item, user });
              }}
            >
              <View
                style={{
                  marginHorizontal: index === 0 ?10 : 10,
                  height: 300,
                  width: 280,
                }}
              >
                <View style={styles.jobCardImg}>
                  <Image
                    source={{
                      uri: item.jobInfo.image,
                    }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.detailsCard}>
                  <Text style={styles.jobTitleText}>{item.jobTitle}</Text>
                  <Text style={styles.jobSalary}>{item.jobInfo.jobType}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      ></Animated.FlatList>
    </View>
  );
};


export default cardCarousel;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight * 0.4,
  },
  headingContainer: {
    width: screenWidth,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 22,
    paddingRight:10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  jobCardImg: {
    width: "100%",
    height:160
  },
  detailsCard: {
    width: "100%",
    height: 110,
    backgroundColor: Colors.textColor2,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  jobTitleText: {
    paddingLeft: 20,
    paddingTop: 20,
    fontWeight:"500",
    letterSpacing: 1,
    lineHeight: 20,
  },
  jobSalary: {
    paddingLeft: 20,
    fontWeight: "300",
    paddingTop: 5,
    color: Colors.secondary,
  }
});
