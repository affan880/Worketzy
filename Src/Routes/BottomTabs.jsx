import * as React from "react";
import { AceTabBarNavigator, DotSize } from "rn-slick-bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import Explore from '../Screens/Explore/explore';
import Profile from '../Screens/Profile/profile';
import Search from '../Screens/Search/search';
import Saved from '../Screens/Saved/Saved';
import Colors from "../utils/Colors";
const Tabs = AceTabBarNavigator();

const TabBarIcon = ({name,size,tintColor}) => {
  return (
    <Icon
      name={name}
      size={size ? size : 24}
      color={tintColor}
    />
  );
};

export default () => (
  <Tabs.Navigator
    backBehavior="history"
    screenOptions={{
      animation: "slide_from_right",
    }}
    initialRouteName="Profile"
    tabBarOptions={{
      labelStyle: { fontSize: 12, marginTop: 5, fontWeight: "bold" },
      activeTintColor: Colors.secondary,
      inactiveTintColor: "#9e9e9e",
      activeBackgroundColor: "#e5cfff",
    }}
  >
    <Tabs.Screen
      name="Explore"
      component={Explore}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} tintColor={color} name="home-sharp" />
        ),
      }}
    />

    <Tabs.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} tintColor={color} name="person" />
        ),
      }}
    />
    <Tabs.Screen
      name="Saved"
      component={Saved}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} tintColor={color} name="rocket" />
        ),
      }}
    />

    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon
            focused={focused}
            tintColor={color}
            name="ios-notifications"
          />
        ),
      }}
    />
  </Tabs.Navigator>
);
