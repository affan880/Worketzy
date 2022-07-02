import { Animated, StyleSheet, Text, View, FlatList, Image,Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import SafeView from './safeView'
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const cardCarousel = () => {
  const navigation = useNavigation();
  const CardCarouselDetails = [{
    id:1,
    CardTitle: "Popular Jobs",
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    description:"lorem epsium tnen jpojpsd joined"
  },
    {
      id:2,
      CardTitle: "Recommended Jobs",
      image: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      description:"lorem epsium tnen dfdssddfdsf joined"
    },
    {
      id:3,
      CardTitle: "New Jobs",
      image: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
      description:"lorem epsium tnen adfsdfsfsf joined"
    }
  ]
  return (
      <SafeView style={styles.container} >
          <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              snapToAlignment="start"
              contentContainerStyle={{
                  paddingHorizontal: 0,
              }}
              data={CardCarouselDetails}
              renderItem = {({ item, index }) => {
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
                          source={{ uri: item.image }}
                          style={styles.posterImage}
                        />
                        <View style={styles.textBox}>
                          <Text
                            style={{
                              color: Colors.primary,
                              fontWeight: "700",
                              paddingBottom: 10,
                            }}
                          >
                            {item.CardTitle}
                          </Text>
                          <Text
                            style={{
                              color: Colors.primary,
                              fontSize: 10.5,
                              fontWeight: "100",
                              letterSpacing: 1.7,
                            }}
                          >
                            {item.description}
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
                              onPress={() => navigation.navigate("JobList")}
                            >
                              <Text
                                style={{
                                  alignSelf: "center",
                                  fontWeight: "700",
                                  letterSpacing: 0.8,
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
          </Animated.FlatList>
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