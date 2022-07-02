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
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const cardCarousel = () => {
  const CardCarouselDetails = [
    {
      id: 1,
      CardTitle: "Popular Jobs",
      image:
        "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      description: "lorem epsium tnen jpojpsd joined",
    },
    {
      id: 2,
      CardTitle: "Recommended Jobs",
      image:
        "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      description: "lorem epsium tnen dfdssddfdsf joined",
    },
    {
      id: 3,
      CardTitle: "New Jobs",
      image:
        "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
      description: "lorem epsium tnen adfsdfsfsf joined",
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={{ backgroundColor: Colors.primary }}>View Details</Text>
      </View>
      {CardCarouselDetails.map((item, index) => {
        return (
          <ScrollView style={styles.container} scrollEnabled={true}>
            <View key={Math.random()}>
              <View style={styles.cardContainer}>
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.posterImage}
                  />
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.cardTitle}>{item.CardTitle}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      })}
    </ScrollView>
  );
};

export default cardCarousel;

const styles = StyleSheet.create({
  container: {
    left: 20,
    backgroundColor: "#fff",
  },
  posterImage: {
    width: "100%",
    height: "100%",
  },
  textBox: {
    width: "60%",
    height: "80%",
    alignSelf: "flex-end",
    paddingLeft: 20,
  },
});
