import React,{useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import JobList from "../Screens/JobList/jobList";
import Colors from "../utils/Colors";
import Chats from "../Screens/Chat/chatScreen";
import ChattingScreen from "../Components/Stream/chattingScreen";
import {StreamChat} from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { connectUserStream } from "../Functions/connectUserStream";
import Spinner from "../Components/CustomComponents/spinner";
const Stack = createNativeStackNavigator();


export default function AppStack() {
  const [loading , setLoading] = useState(true);
  const auth = getAuth();
  const client = StreamChat.getInstance("zq34cq75mqdv");

  onAuthStateChanged(auth, (authUser) => {
    authUser && loading
      ? connectUserStream(client, authUser, setLoading)
      : !authUser
      ? client.disconnectUser()
      : null;
  });

  return (
    <Chat client={client}>
      {
        loading ? <Spinner/> : (
        <Stack.Navigator
        screenOptions={{ headerTitleAlign: "center" }}
        >
        <Stack.Screen
        name="WorketzyJS"
        component={BottomTabs}
        options={{
          headerShown: false,
          navigationBarColor: Colors.secondary,
          statusBarColor: Colors.secondaryShade,
          statusBarStyle: Colors.secondaryShade,
          keyboardHidesTabBar: false,
        }}
        />
        <Stack.Screen name="Chats" component={Chats} options={{headerShown: true}} />
        <Stack.Screen name="ChattingScreen" component={ChattingScreen} options={{headerShown: false}} />
        <Stack.Screen name="JobList" component={JobList} />
          </Stack.Navigator>
        )
      }
        </Chat>
  );
}
