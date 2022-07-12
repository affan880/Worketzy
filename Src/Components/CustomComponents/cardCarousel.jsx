import { Animated, StyleSheet, Text, View, FlatList, Image,Dimensions, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeView from './safeView'
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import Spinner from './spinner';
import firebase from 'firebase/compat';
import { useSelector } from 'react-redux';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const cardCarousel = () => {
  const [data, setData] = useState(null);
  const userId = firebase.auth().currentUser.uid;
  const navigation = useNavigation();
  useEffect(() => {
    fetch("https://worketzy.herokuapp.com/api/jobs").then((response) => response.json())
      .then((responseJson) => setData(responseJson));
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
                          >
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("JobList", { item, userId })
                              }
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