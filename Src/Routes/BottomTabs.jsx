import * as React from "react";
import { JanmTabBarNavigator, DotSize } from "rn-slick-bottom-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import Home from '../Screens/Home/home';
import Profile from '../Screens/Profile/profile';
import Search from '../Screens/Search/search';
import Saved from '../Screens/Saved/Saved';
import Colors from "../utils/Colors";
const Tabs = JanmTabBarNavigator();

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
