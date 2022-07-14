import React,{useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobRecruiterAppStack from "./JobRecruiterAppStack";
import ChattingScreen from "../Components/Stream/chattingScreen";
import Colors from "../utils/Colors";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { connectUserStream } from "../Functions/connectUserStream";
import Spinner from "../Components/CustomComponents/spinner";
const Stack = createNativeStackNavigator();

export default function AppStack2() {
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const client = StreamChat.getInstance("fx68bnb4w8v2");

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
      loading ? <Spinner/> : (<Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Worketzy"
        component={JobRecruiterAppStack}
        options={{
          headerShown: false,
          navigationBarColor: Colors.secondary,
          statusBarColor: Colors.primary,
          statusBarStyle: Colors.primary,
          keyboardHidesTabBar: true,
        }}
      />

      <Stack.Screen
        name="ChattingScreen"
        component={ChattingScreen}
        options={{ headerShown: true }}
      />
      </Stack.Navigator>)
      }
      </Chat>
  );
}
