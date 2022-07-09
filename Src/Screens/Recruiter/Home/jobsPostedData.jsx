import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, FlatList, Animated, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../utils/Colors';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import getData from "../../../Functions/getData";
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
                  <Text style={styles.Description}>
                    {item.jobInfo.jobDescription}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.moreBtn}>...Read more</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      height: "10%",
                      position: "absolute",
                      bottom: 10,
                      justifyContent: "center",
                      alignItems: "center",
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
                    <TouchableOpacity style={styles.deleteBtn} onPress={()=>{
                        Alert.alert("Delete", "Are you sure?", [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "Delete",
                            onPress: () => Delete(URL)
                          },
                        ]);
                    }} >
                      <AntDesign name="delete" size={24} color={Colors.primary} />
                    </TouchableOpacity>
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
    height: height * 0.7,
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
    height: "100%",
    borderRadius: 10,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    width: "20%",
    borderWidth: 1,
    color: Colors.secondary,
    height: "100%",
    borderRadius: 10,
    borderColor: Colors.secondary,
    justifyContent: "center",
      alignItems: "center",
      marginLeft: "5%",
    backgroundColor:Colors.secondary
  },
});