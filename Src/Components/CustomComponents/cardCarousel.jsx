import { Animated, StyleSheet, Text, View, FlatList, Image,Dimensions, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeView from './safeView'
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import Spinner from './spinner';
import firebase from 'firebase/compat';
import { useSelector } from 'react-redux';
import { UpdateViewCount } from '../../Functions/updateData';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const cardCarousel = () => {
  const [data, setData] = useState(null);
  const userId = useSelector((state) => state.currentUser.JobSeekersInformation.userUniqueId);
  const navigation = useNavigation();
  useEffect(() => {
    fetch("https://worketzy.herokuapp.com/api/jobs").then((response) => response.json())
      .then((responseJson) => setData(responseJson));
    // fetch("https://worketzy.herokuapp.com/api/jobs")
    //   .then((response) => response.json())
    //   .then((responseJson) =>
    //     console.log(responseJson.filter((item) => new Date(item.createdAt).getDate() === 9 ))
    //   );
    // console.log(new Date().getDate());
  }, []);
  return (
      <SafeView style={styles.container} >
          { data !== null ? ( <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              snapToAlignment="start"
              contentContainerStyle={{
                  paddingHorizontal: 0,
              }}
              data={data}
        renderItem={({ item, index }) => {
                  return (
                    <View key={Math.random()}>
                      <Animated.View
                        style={{
                          marginHorizontal: 20,
                          paddingLeft: 20,
                          borderRadius: 18,
                          backgroundColor: "#fff",
                          height: screenHeight * 0.22,
                          width: screenWidth - 90,
                          backgroundColor: Colors.secondary,
                          flexDirection: "row",
                          borderColor: Colors.white,
                          borderWidth: 1,
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
                          console.log(url, url);
                          UpdateViewCount(data, url);
                          navigation.navigate("JobList", { item, userId });
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
                              height: "40%",
                              borderRadius: 18,
                              marginTop: 20,
                              justifyContent: "center",
                            }}
                            onPress={() => {
                              const data = {
                                numberofViews: item.jobInfo.numberofViews + 1,
                              };
                              navigation.navigate("JobList", { item, userId });
                              const url =
                                "https://worketzy.herokuapp.com/api/jobs/edit/details/" +
                                item.recruiterId +
                                "/" +
                                item.jobsUniqueId;
                              UpdateViewCount(data, url);
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
                                navigation.navigate("JobList", {
                                  item,
                                  userId,
                                });
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
          >
          </Animated.FlatList>) : <Spinner/> }
      </SafeView>
  )
}

export default cardCarousel

const styles = StyleSheet.create({
  posterImage: {
    width: "40%",
    height: "80%",
    resizeMode: "cover",
    borderTopRightRadius: 18,
    borderTopLeftRadius:18,
    margin: 0,
    alignSelf: "flex-end",
    },
    textBox: {
        width: "60%",
        height: "80%",
        alignSelf: "flex-end",
        paddingLeft: 20,
    }
});