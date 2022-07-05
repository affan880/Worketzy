import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Recruiter/Home/HomeScreen'
import CreateJob from '../Screens/Recruiter/Create/createJob'
import ChatScreen from '../Screens/Recruiter/ChatScreen/chatScreen'
import Profile from '../Screens/Recruiter/Profile/profileScreen'
import Notifications from '../Screens/Recruiter/Notification/notifications'
import Colors from '../utils/Colors'
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
const Tabs = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity
        style={{
          top: -30,
          justifyContent: "center",
          alignItems: "center",
          ...styles.shadow,
        }}
        onPress={onPress}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45',
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
}

const JobRecruiterAppStack = () => {
    return (
      <Tabs.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: "false",
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backroundColor: Colors.secondary,
            borderRadius: 15,
            height: 90,
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
          name="ChatScreen"
          component={ChatScreen}
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
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="CreateJob"
          component={CreateJob}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add-sharp"
                size={30}
                color="black"
                style={{
                  color: !focused ? Colors.secondaryShade : Colors.secondary,
                }}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="notifications"
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
}

export default JobRecruiterAppStack

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})