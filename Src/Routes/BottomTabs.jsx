import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Home from '../Screens/Home/home';
import Profile from '../Screens/Profile/profile';
import Chat from '../Screens/Chat/chatScreen';
import Saved from '../Screens/Saved/Saved';
import Colors from "../utils/Colors";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: "false",
        tabBarShowLabel: false,
        headerShown: "false",
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 10,
          right: 10,
          elevation: 0,
          backroundColor: Colors.secondary,
          borderRadius: 18,
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color="black"
              style={{
                color: focused ? Colors.secondary : Colors.secondaryShade,
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome
                name="bookmark"
                size={24}
                color="black"
                style={{
                  color: focused ? Colors.secondary : Colors.secondaryShade,
                }}
              />
            </View>
          ),
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "Saved",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.secondaryShade,  
            borderBottomWidth: 0,
            elevation: 0,
          }
        }}
      />
      <Tabs.Screen
        name="Chats"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="ios-chatbubbles-sharp"
                size={24}
                color="black"
                style={{
                  color: focused ? Colors.secondary : Colors.secondaryShade,
                }}
              />
            </View>
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="md-person-circle-sharp"
                size={24}
                color="black"
                style={{
                  color: focused ? Colors.secondary : Colors.secondaryShade,
                }}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
{/*
  export default () => (
  <Tabs.Navigator
    backBehavior="history"
    screenOptions={{
      animation: "slide_from_right",
      tabBarHideOnKeyboard: "true",
    }}
    DotSize="large"
    appearance={{
      horizontalPadding: 10,
      tabBarBackground: Colors.white,
      bottomPadding: 15,
    }}
    initialRouteName="Home"
    tabBarOptions={{
      labelStyle: { fontSize: 12, marginTop: 5, fontWeight: "bold" },
      activeTintColor: Colors.secondary,
      inactiveTintColor: Colors.mediumGrey,
      activeBackgroundColor: Colors.secondaryShade,
    }}
  >
    <Tabs.Screen
      name="Explore"
      component={Home}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} tintColor={color} name="home-sharp" />
        ),
      }}
    />
    <Tabs.Screen
      name="Saved"
      component={Saved}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon
            focused={focused}
            tintColor={color}
            name="bookmark-sharp"
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon
            focused={focused}
            tintColor={color}
            name="chatbubble-ellipses-sharp"
          />
        ),
      }}
    />

    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} tintColor={color} name="person" />
        ),
      }}
    />
  </Tabs.Navigator>
);
    */}