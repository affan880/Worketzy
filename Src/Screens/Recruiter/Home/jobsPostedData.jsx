import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, FlatList, Animated, RefreshControl, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../utils/Colors';
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { getData } from "../../../Functions/getData";
import Spinner from '../../../Components/CustomComponents/spinner';
import Delete from '../../../Functions/deleteData';
import { useSelector } from 'react-redux';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const JobsPostedData = () => {
    const [jobsCreated, setJobsCreated] = useState(null);
    const [JobsData, setJobsData] = useState();
    const userId = useSelector((state) => state.currentUser.user.uid);
    const [refreshing, setRefreshing] = useState(true);
    useEffect(() => {
        loadUserData()
    }, [])
    const loadUserData = () => {
        const URL = `https://worketzy.herokuapp.com/api/jobs/${userId}`;
        getData(URL, setJobsCreated, setJobsData);
        setRefreshing(false)
    }
    return (
      <View style={styles.Container}>
        <StatusBar translucent backgroundColor={Colors.primary} />
        {refreshing ? <Spinner /> : null}
        <Animated.FlatList
          horizontal={true}
          data={JobsData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
          }
          renderItem={({ item }) => {
            const URL = `https://worketzy.herokuapp.com/api/jobs/delete/${item.recruiterId}/${item.jobsUniqueId}`;
            return (
              <View
                style={{ height: height, width: width, alignItems: "center" }}
              >
                <View style={styles.Card}>
                  <Image
                    source={{
                      uri: item.jobInfo.image,
                    }}
                    style={{
                      width: width * 0.8,
                      height: 220,
                      marginTop: 20,
                      borderRadius: 15,
                    }}
                  />
                  <Text style={styles.jobTitle}>{item.jobInfo.jobTitle}</Text>
                  <Text style={styles.Description} numberOfLines={10}>
                    {item.jobInfo.jobDescription.length < 35
                      ? `${item.jobInfo.jobDescription}`
                      : `${item.jobInfo.jobDescription.substring(0, 900)}`}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.moreBtn}>...Read more</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "90%",
                      height: "10%",
                      marginTop: "10%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <TouchableOpacity style={styles.peopleApplied}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 14,
                            letterSpacing: 1.5,
                            fontWeight: "bold",
                          }}
                        >
                          {item.jobInfo.peopleApplied.length}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.openingsLeft}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.openings}>
                            <Ionicons
                              name="md-person-outline"
                              size={20}
                              color={Colors.secondary}
                            />
                          </Text>
                          <Text
                            style={{
                              color: Colors.secondary,
                              fontSize: 14,
                              letterSpacing: 1.5,
                            }}
                          >
                            {" "}
                            Applications
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <TouchableOpacity style={styles.reviewBtn}>
                        <MaterialIcons
                          name="rate-review"
                          size={20}
                          color={Colors.secondary}
                        />
                        <Text
                          style={{
                            color: Colors.secondary,
                            fontSize: 14,
                            letterSpacing: 1.5,
                          }}
                        >
                          {" "}
                          Edit
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => {
                          Alert.alert("Delete", "Are you sure?", [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "Delete",
                              onPress: () => Delete(URL),
                            },
                          ]);
                        }}
                      >
                        <AntDesign
                          name="delete"
                          size={24}
                          color={Colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        ></Animated.FlatList>
      </View>
    );
}

export default JobsPostedData

const styles = StyleSheet.create({
  Container: {
    width: width,
    height: height,
    marginTop: height * 0.09,
  },
  Card: {
    borderRadius: 15,
    width: width * 0.9,
    height: height/1.23,
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
    fontSize: 12,
    color: Colors.primary,
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "300",
  },
  moreBtn: {
    fontSize: 14,
    color: Colors.secondary,
  },
  reviewBtn: {
    flexDirection: "row",
    width: "70%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    width: "20%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    backgroundColor: Colors.secondary,
  },
  openingsLeft: {
    width: "70%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    backgroundColor: Colors.white,
  },
  peopleApplied: {
    width: "20%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "70%",
    borderRadius: 10,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});