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
import PersonalisedJobList from "../Screens/JobList/personalisedJobList";
import Comments from "../Screens/Comments/Comments";
import CompanyProfile from "../Screens/JobList/CompanyProfile";
import PositionsAvailable from "../Screens/JobList/positionsAvailable";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const [loading , setLoading] = useState(true);
  const auth = getAuth();
  const client = StreamChat.getInstance("62n7xxd62q8p");

  onAuthStateChanged(auth, (authUser) => {
    authUser && loading
      ? connectUserStream(client, authUser, setLoading)
      : !authUser
      ? client.disconnectUser()
      : null;
  });

  return (
    <Chat client={client}>
      {loading ? (
        <Spinner />
      ) : (
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
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
          <Stack.Screen
            name="Chats"
            component={Chats}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ChattingScreen"
            component={ChattingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JobList"
            component={JobList}
            options={{
              headerTitle: "Job Details",
              headerTitleStyle: {
                fontSize: 20,
                color: Colors.primary,
                fontWeight: "600",
                letterSpacing: 2,
              },
            }}
          />
          <Stack.Screen
            name="PersonalisedJobList"
            component={PersonalisedJobList}
          />
          <Stack.Screen
            name="Comments"
            component={Comments}
          />
          <Stack.Screen
              name="CompanyProfile"
              component={CompanyProfile}
              options={{
                headerTitle: "Company",
              }}
          />
          <Stack.Screen
              name="AvailablePositions"
              component={PositionsAvailable}
              options={{
                headerTitle: "Positions",
              }}
          />
          
        </Stack.Navigator>
      )}
    </Chat>
  );
}
